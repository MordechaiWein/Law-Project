class Merchant < ApplicationRecord
    belongs_to :user
    has_many_attached :documents
    
    
    # Methods: 
    def Merchant.parse_contract_pdf(file_path)

        hash = {}
        begin
            reader = PDF::Reader.new(file_path)
            text_content = reader.pages.first.text

            if text_content.include?("MERCHANT INFORMATION")

                # Split string into an array of lines.
                lines = text_content.split("\n")
                # Split string into an array of words.
                text_array = text_content.split(" ")

                # Clean the array of lines of all white spaces, then flatten back into a single array of strings.
                cleaned_lines = lines.map { |line| line.split("  ").filter { |element| element != "" } }.flatten

                cleaned_lines.map do |str|
                    # Go through each line, if it includes a colon split the line on the colon.
                    if str.include?(":")
                        array = str.split(":")
                        if array.length == 2
                            # If the resulting array is a length of two then we do as follows.
                            # Get the first element, strip it of leading and trailing whitespaces, -
                            # make it all lowercase and replace mid-whitespace with underscores.
                            raw_key = array[0].strip.downcase.gsub(/[\/\s]/, "_")
                            # Remove all ’ and turn the key from a string into a symbol.
                            key = raw_key.gsub("’", "").to_sym
                            value = array[1].strip
                            if hash[key]
                                # If the 'key' exists add the word 'physical' by converting key from sym to string -
                                # then convert the entire thing back into symbol.
                                hash[("physical_" + key.to_s).to_sym] = value
                            else
                                hash[key] = value
                            end
                        end
                    end
                end

                # Remove the :docusign_envelope_id "key" from the hash.
                hash.delete(:docusign_envelope_id)

                # # Find the lender.
                lender_line = lines.find { |line| line.include?("Agreement dated") }
                lender_array = lender_line.split(" ")
                lender = lender_line[/between\s+(.*?)\s+\(/, 1]

                # Find the guarantors.
                first_merchant_line = lines.find {|line| line.include?("FOR THE MERCHANT (#1)By:")}
                second_merchant_line = lines.find {|line| line.include?("FOR THE MERCHANT (#2)By:")}

                first_merchant_array = first_merchant_line.split("  ")
                second_merchant_array = second_merchant_line.split("  ")

                first_merchant_filter = first_merchant_array.filter { |string| string != "" && !string.include?('\\') }
                second_merchant_filter = second_merchant_array.filter { |string| string != "" && !string.include?('\\') }
               
                first_length = first_merchant_filter.length
                second_length = second_merchant_filter.length

                first_merchant = first_length > 1 ? first_name = first_merchant_filter[1].strip : second_name = ""
                second_merchant = second_length > 1 ? second_name = second_merchant_filter[1].strip : second_name = ""

                # Add the results to the hash...
                hash[:first_guarantor] = first_merchant
                hash[:second_guarantor] = second_merchant

                # Find the agreement date.
                date_regex = /\A\d{1,2}\/\d{2}\/\d{4}\z/
                agreement_date = text_array.find {|word| word.match(date_regex)}
                agreement_date_first_format = Date.strptime(agreement_date, '%m/%d/%Y')
                agreement_date_final_format = agreement_date_first_format.strftime('%B %d, %Y')

                # Add the result to the hash...
                hash[:agreement_date] = agreement_date_final_format

                # Split selected keys for formatting.
                first_guarantor_array = hash[:first_guarantor].split(" ")
                second_guarantor_array = hash[:second_guarantor].split(" ")
                mail_array = hash[:mailing_address].split(" ") 
                dba_array = hash[:d_b_a].split(" ") 
                entity_array = hash[:type_of_entity].split(" ") 
                merchant_array = hash[:merchants_legal_name].split(" ") 

                # Title case some keys, lowercase others, manipulate others (see code)...
                first_guarantor_titlecase = first_guarantor_array.map {|word| word.capitalize}.join(" ") 
                second_guarantor_titlecase = second_guarantor_array.map {|word| word.capitalize}.join(" ") 
                mail_titlecase = mail_array.map {|word| word.capitalize}.join(" ")
                dba_titlecase = dba_array.map {|word| word.include?("&") ? word : word.capitalize}.join(" ")
                city_titlecase = hash[:city].capitalize
                remove_LLC = entity_array[-1] == "(LLC)" ? entity_array[0...-1] : entity_array
                joinLLC  = remove_LLC.join(" ").downcase
                merchants_name_titlecase = merchant_array.map { |word| word != "LLC" ? word.capitalize : word }.join(" ")
                
                # If the merchants name is the same as the dba, leave the dba empty.
                if merchants_name_titlecase.include?(dba_titlecase)
                    dba_titlecase = ""
                end

                # Add the result to the hash...
                hash[:first_guarantor_title_case] = first_guarantor_titlecase
                hash[:second_guarantor_title_case] = second_guarantor_titlecase 
                hash[:mail_title_case] = mail_titlecase
                hash[:d_b_a_title_case] = dba_titlecase
                hash[:city_title_case] = city_titlecase
                hash[:type_of_entity_no_llc] = joinLLC
                hash[:merchants_legal_name_title_case] = merchants_name_titlecase 

                # # Determine legal name based on the lender.
                if lender == "VelocityCapitalGroup LLC"
                    lender_legal_name = 'VELOCITY CAPITAL GROUP LLC'
                    lender_legal_name_title_case = 'Velocity Capital Group LLC'
                else
                    lender_legal_name = lender.upcase
                    lender_legal_name_title_case = lender
                end

                # Add the result to the hash...
                hash[:lender_legal_name] = lender_legal_name
                hash[:lender_legal_name_title_case] = lender_legal_name_title_case

                # If the merchants name is the same as the D/B/A, leave the d_b_a key empty.
                hash[:d_b_a] = "" if hash[:merchants_legal_name].include?(hash[:d_b_a])
            
                # Add spreadsheet keys.
                hash[:suit_status] = "Not yet filed"
                hash[:aos] = "Not yet filed"
                hash[:date_served] = "Not yet served"
                hash[:default_judgment] = "N/A"
                hash[:ucc_status] = "Not yet started"
                hash[:law_firm] = "N/A"
                hash[:notes] = ""

                # Add dashboard keys.
                hash[:second_guarantor_email] = ''
                hash[:second_guarantor_phone] = ''
                hash[:lawyer] = ''
                hash[:lawyer_email] = ''
                hash[:lawyer_phone] = ''
                hash[:litigation_date] = ''
                hash[:response_date] = ''
                hash[:six_month_payoff_date] = ''
                hash[:service] = ''
                                                                                                 
                # Determine the Contract Payoff Date:
                # Convert purchased amount and remittance to Float.
                purchased_amount_number = hash[:purchased_amount].delete('$,').to_f
                remittance_number = hash[:remittance].delete('$,').to_f
                # Divide these floats by each other.
                purchased_amount_divided_by_remittance = purchased_amount_number / remittance_number
                # Use the Ruby 'round' method to round to nearest whole number.
                whole_number = purchased_amount_divided_by_remittance.round
                # If payment frequency is weekly add 'whole_number' WEEKS to the agreement date.
                if hash[:payment_frequency] == "Weekly"
                    raw_contract_payoff_date = agreement_date_first_format + (whole_number * 7)
                    contract_payoff_date = raw_contract_payoff_date.strftime('%m/%d/%y')
                # If payment frequency is daily add 'whole_number' DAYS to the agreement date.
                elsif hash[:payment_frequency] == "Daily"
                    raw_contract_payoff_date = agreement_date_first_format + whole_number
                    contract_payoff_date = raw_contract_payoff_date.strftime('%m/%d/%y')
                # Otherwise set contract_payoff_date to an empty string.
                else
                    contract_payoff_date = ''
                end

                # Add the result to the hash...
                hash[:contract_payoff_date] = contract_payoff_date
            
                # The current date this item was created in the database.
                hash[:created] = Time.now.strftime("%m/%d/%y")

                # Finally return the hash.
                hash
            else
                "Wrong Doc"
            end
        rescue PDF::Reader::MalformedPDFError
            "Wrong Doc"
        end
    end

    def Merchant.parse_payment_history_pdf(file_path)

        hash = {}
        begin
            reader = PDF::Reader.new(file_path)
            all_pages_text = ''

            payment_content = reader.pages.each do |page|
                all_pages_text << page.text
            end

            text_content = reader.pages.first.text

            if (text_content.include?("Payment History"))

                # Split string into an array of words.
                payment_array = all_pages_text.split(" ")
                # Split string into an array of lines.
                payment_array_lines = all_pages_text.split("\n")

                # Calculate damage fee:
                # Create an array of only the strings that are monetary values.
                monetary_strings = payment_array.filter { |item| item.match?(/\A\d{1,3}(,\d{3})*(\.\d{2})?\z/) }
                # Remove any single digit strings.
                monetary_strings_greater_then_one = monetary_strings.filter {| item | item.length > 1}
                # Get the last item in the array.
                final_monetary_string = monetary_strings_greater_then_one[-1]
                # Add 165.
                final_monetary_string_1 = final_monetary_string.delete(',').to_f + 165
                # Turn back into string.
                final_monetary_string_2 = final_monetary_string_1.to_s
                # Format with comma in the correct place after second digit.
                final_monetary_string_3 = sprintf("%0.2f", final_monetary_string_2).gsub(/(\d)(?=(\d{3})+(\.\d*)?$)/, '\1,')
                # Add $ symbol.
                damages =  "$" + final_monetary_string_3

                # Add the result to the hash...
                hash[:damages] = damages
                
                # Calculate legal fee:
                # Multiply the damages by 0.25.
                damages_times_25 = final_monetary_string_1 * 0.25
                # Cut nums after decimal to 2 nums.
                damages_times_25_rounded = damages_times_25.round(2)
                # Convert to string.
                times_25_string = damages_times_25_rounded.to_s
                # Format.
                times_25_string_formatted = sprintf("%0.2f", times_25_string).gsub(/(\d)(?=(\d{3})+(\.\d*)?$)/, '\1,')
                # Add $ symbol.
                legal = "$" + times_25_string_formatted

                # Add the result to the hash...
                hash[:legal] = legal  

                # Calculate the balance:
                # Find the balance line and extract the default fee string.
                deafult_fee_line = payment_array_lines.find {|line| line.downcase.include?('default fee')}
                deafult_fee_array = deafult_fee_line.split("  ")
                deafult_fee_filter = deafult_fee_array.filter {|s| s.match?(/\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\b(?!\/)/)}
                default_fee_string = deafult_fee_filter[0]
                # Convert the default fee and final number string into floating point numbers.
                default_fee_number = default_fee_string.delete(',').to_f 
                final_money_number = final_monetary_string.delete(',').to_f 
                # Find all lines that include "Bounce Fee". Extract any monetary strings from those lines and return the first one of each line.
                bounced_fee_lines = payment_array_lines.filter{|line| line.downcase.include?('bounce fee')}
                bounced_fees = bounced_fee_lines.map do |string|
                    string_array = string.split("  ")
                    string_filter = string_array.filter {|s| s.match?(/\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\b(?!\/)/)}
                    bounced_Fee = string_filter[0].delete(',').to_i
                end
                
                # Add up all bounce fees.
                total_bounce_fee = bounced_fees.sum
                # Get the balance with the below calculation:
                raw_balance = final_money_number - default_fee_number - total_bounce_fee
                # Format the balance.
                balance_string = sprintf("%0.2f", raw_balance).gsub(/(\d)(?=(\d{3})+(\.\d*)?$)/, '\1,')
                balance = "$" + balance_string
                # Add the result to the hash...
                hash[:balance] = balance

                # Calculate the rtr_legal:
                # Multiply the balance by 1.25.
                raw_rtr_legal = raw_balance * 1.25
                # Format the rtr_legal.
                rtr_legal_string = sprintf("%0.2f", raw_rtr_legal).gsub(/(\d)(?=(\d{3})+(\.\d*)?$)/, '\1,')
                rtr_legal = "$" + rtr_legal_string
                # Add the result to the hash...
                hash[:rtr_legal] = rtr_legal

                # Calculate the total:
                raw_total = final_monetary_string_1 + damages_times_25 
                raw_total_rounded = raw_total.round(2)
                # Format the total.
                raw_total_string = sprintf("%0.2f", raw_total_rounded).gsub(/(\d)(?=(\d{3})+(\.\d*)?$)/, '\1,')
                total = "$" + raw_total_string
                # Add the result to the hash...
                hash[:total] = total

                # Calculate the balance_pb_amount:
                raw_balance_payback = raw_balance / 26
                # Format the balance_payback.
                balance_payback_string = sprintf("%0.3f", raw_balance_payback).gsub(/(\d)(?=(\d{3})+(\.\d*)?$)/, '\1,')
                balance_pb_amount = "$" + balance_payback_string
                # Add the result to the hash...
                hash[:balance_pb_amount] =  balance_pb_amount

                # Calculate the rtr_legal_pb_amount:
                raw_rtr_legal_payback = raw_rtr_legal / 26
                # Format the rtr_legal_payback.
                rtr_legal_payback_string = sprintf("%0.3f", raw_rtr_legal_payback).gsub(/(\d)(?=(\d{3})+(\.\d*)?$)/, '\1,')
                rtr_legal_pb_amount = "$" + rtr_legal_payback_string
                # Add the result to the hash...
                hash[:rtr_legal_pb_amount] =  rtr_legal_pb_amount

                # Calculate the total_pb_amount:
                raw_total_payback = raw_total / 26
                # Format the total_payback.
                total_payback_string = sprintf("%0.3f", raw_total_payback).gsub(/(\d)(?=(\d{3})+(\.\d*)?$)/, '\1,')
                total_pb_amount = "$" + total_payback_string
                # Add the result to the hash...
                hash[:total_pb_amount] =  total_pb_amount

                # Calculate default date:
                date_regex = /\A\d{2}\/\d{2}\/\d{4}\z/
                default_date_line = payment_array_lines.find {|str| str.downcase.include?('default fee')}
                default_date_line_array = default_date_line.split(" ")
                default_date = default_date_line_array.find {|str| str.match(date_regex)}
                input_date = Date.strptime(default_date, '%m/%d/%Y')
                formatted_date = input_date.strftime('%B %d, %Y')

                # Add the result to the hash...
                hash[:default_date] = formatted_date
            
                # Finally return the hash.
                hash
            else
                "Wrong Doc"
            end
        rescue PDF::Reader::MalformedPDFError
            "Wrong Doc"
        end
    end
    

    def Merchant.parse_funding_confirmation_png(file_path)
        # Variables.
        hash = {}
        date_regex = /\A\d{2}\/\d{2}\/\d{4}\z/
        begin
            if File.extname(file_path) == ".png"
                # AWS Textract.
                client = Aws::Textract::Client.new(
                    region: 'us-east-1',
                    credentials:  Aws::Credentials.new(
                        Figaro.env.aws_access_key_id,
                        Figaro.env.aws_secret_access_key
                    ),   
                )

                file_content = File.binread(file_path)
                
                response = client.detect_document_text({
                    document: {
                        bytes: file_content
                    }
                })
                # Format the response into a text string...
                blocks = response[:blocks]
                filtered_blocks = blocks.filter { |block| block[:block_type] == "LINE" }
                text = filtered_blocks.map { |block| block[:text] }.join(' ')

                # Split the string into an array filter all date strings.
                split = text.split(" ")
                filter = split.filter { |line| line.match(date_regex) }

                # Format each date string and get the final one.
                dates = filter.map { |date_str| Date.strptime(date_str, '%m/%d/%Y') }
                latest_date = dates.max

                # Format the final date into "xx/xx/xx" format.
                confirmation_date = latest_date.strftime('%B %d, %Y')

                # Add the result to the hash..
                hash[:image_date] = confirmation_date

                # Finally return the hash.
                hash
            else
                "Wrong Doc"
            end
        rescue StandardError
            "Wrong Doc"
        end
    end

    def Merchant.redact_document(url, file_path)
        
        reader = PDF::Reader.new(file_path)

        first_page = reader.pages.first.text
        all_pages = ''

        content = reader.pages.each { |page| all_pages << page.text }

        search_strings = []

        phone_regex = /(?:\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
        email_regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/
        security_nums_regex = /(?:\b\d{3}-\d{2}-\d{4}\b)|(?:(?:\d{9})|(?:\d{3}-\d{2}-\d{4})|(?:\d{2}-\d{7}))|(?:\b\d{8}\b)|(?:\b\d{3}\s\d{3}\s\d{3}\b)/
        dda_regex = /\b\d{7,12}\b/
        
        phone_nums = first_page.scan(phone_regex)
        emails = first_page.scan(email_regex)
        security_nums = all_pages.scan(security_nums_regex)
        ddas = all_pages.scan(dda_regex)

        search_strings = (phone_nums + emails + security_nums + ddas).flatten.uniq

        api_key = "mordwein77@gmail.com_jxrIPi82nSV5IfPp2S472QH55M6hNUI0pqDsR2ecRAv3dj2lQU3pv28kLU749Jz3"
        headers = { 'Content-Type' => 'application/json', 'x-api-key' => api_key }
        split_endpoint = 'https://api.pdf.co/v1/pdf/split/'
        delete_endpoint = 'https://api.pdf.co/v1/pdf/edit/delete-text'
        
        payload = {
            url: url,
            pages: "1-8, 9-",
            name: 'PDF-split-by-string',
            async: false
        }
        
        payload_json = payload.to_json
        response = HTTParty.post(split_endpoint, headers: headers, body: payload_json)
        parsed_response = JSON.parse(response.body)
        new_url = parsed_response['urls'][0]
        
        second_payload = {
            url: new_url,
            name: 'pdfWithTextDeleted',
            caseSensitive: false,
            searchStrings: search_strings,
            replacementLimit: 0,
            async: false,
            profiles: "{'UsePatch': true, 'PatchColor': '#000000', 'RemoveTextUnderPatch': true}"
        }

        second_payload_json = second_payload.to_json
        second_response = HTTParty.post(delete_endpoint, headers: headers, body: second_payload_json)
     
        second_parsed_response = JSON.parse(second_response.body)
        second_parsed_response['url']
    end


    def Merchant.redact_image(url, file_path)
        credentials = {
            region: 'us-east-1',
            credentials: Aws::Credentials.new(Figaro.env.aws_access_key_id, Figaro.env.aws_secret_access_key)
        }
        client = Aws::Textract::Client.new(credentials)

        file_content = File.binread(file_path)
        
        response = client.detect_document_text({
            document: {
                bytes: file_content
            }
        })
        name_regex = /^[A-Z][a-z]*\s+[A-Z][a-z]*$/
        num_regex = /\b\d{6,}\b/
        accountents = ["gail gross", "deanna whittaker", "michal gomes","hector suero"]
        ignored_words = [
            "tracking id:",
            "recipient wire",
            "created by:",
            "beneficiary fiid:",
            "beneficiary fi",
            "authorized by:",
            "will process on:",
            "from account:",
            "address 1:",
            "to account:",
            "beneficiary fi city:",
            "to account type:",
            "originator wire",
            "Beneficiary fi zip:",
        ]
        
        blocks = response[:blocks]
        block_to_hash = blocks.map { |block| block.to_h }
        lines = block_to_hash.filter { |block| block[:block_type] == "LINE" }
        filtered_lines = lines.filter do |b|
            !ignored_words.include?(b[:text].downcase) && 
            (
                b[:text].match(name_regex) ||
                accountents.include?(b[:text].downcase) ||
                b[:text].match(num_regex)
            )
        end
        bounding_boxes = filtered_lines.map {|block| block[:geometry][:bounding_box]}
        
        image = Magick::ImageList.new(url) do |options|
            options.density = '300x300'
        end
        
        draw = Magick::Draw.new
        draw.fill('black')
        bounding_boxes.map do |box|
            x1 = box[:left] * image.columns
            y1 = (box[:top] - 0.02) * image.rows
            x2 = x1 + (box[:width] * image.columns)
            y2 = y1 + (box[:height] * image.rows * 1.5)
            draw.rectangle(x1, y1, x2, y2)
        end
        draw.draw(image)
        image
    end

    def Merchant.find_exhibit_page_number(url)
        response = HTTParty.get(url)

        tempfile = Tempfile.new(['pdf', '.pdf'], encoding: 'ascii-8bit')
        tempfile.binmode
        tempfile.write(response.body)
        tempfile.close

        reader = PDF::Reader.new(tempfile.path)
        
        page_number = ''
        all_pages = ''

        reader.pages.each_with_index do |page, index|
            page_text = page.text
            all_pages << page_text
            if page_text.include?("EXHIBIT “A”")
                page_number = index 
                break
            else
                page_number = nil
            end
        end
        
        page_number ? page_number : "The text 'EXHIBIT A' was not found in the PDF."
    end

end