class MerchantsController < ApplicationController
    skip_before_action :authorize, only: [:index]

    def index
        if request.headers['X-Secret-Header'] == 'flatdragonswoopxzw337'
            merchants = Merchant.all
            render json: merchants
        else
            redirect_to 'http://localhost:4000/'
        end
    end

    def update
        user = User.find(session[:user_id])
        if user.boss
            merchant = Merchant.find(params[:id])
            merchant.update!(merchant_params)
            render json: merchant
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def create
        # Params:
        contract = params[:contract]
        payment_history = params[:payment_history]
        funding_confirmation = params[:funding_confirmation]
        
        # Methods:
        parse_contract = Merchant.parse_contract_pdf(contract.tempfile.path)
        parse_payment_history = Merchant.parse_payment_history_pdf(payment_history.tempfile.path)
        parse_funding_confirmation = Merchant.parse_funding_confirmation_png(funding_confirmation.tempfile.path)

       
        if parse_contract == "Wrong Doc" || parse_payment_history == "Wrong Doc" || parse_funding_confirmation == "Wrong Doc"
            render json: {
                error: 'Document parsing failed. The App currently supports limited file formats. Contact admin for assistance.'
            }, status: :unprocessable_entity
        else
            # Merge all pulled values into a single hash to be stored in the database.
            compiled_hash = {}
            integrated_hash = compiled_hash.merge(parse_contract, parse_payment_history, parse_funding_confirmation)

            # Find the user. Create a new row in the database. Render a json response with a "created" status code.
            user = User.find(session[:user_id])
            merchant = user.merchants.create!(integrated_hash)

            contract.original_filename= "Contract - #{integrated_hash[:merchants_legal_name_title_case]}.pdf"
            funding_confirmation.original_filename  = "Funding Confirmation - #{integrated_hash[:merchants_legal_name_title_case]}.png"
            payment_history.original_filename = "Payment History - #{integrated_hash[:merchants_legal_name_title_case]}.pdf"
          
            merchant.documents.attach(params[:contract])
            merchant.documents.attach(params[:funding_confirmation])
            merchant.documents.attach(params[:payment_history])

            contract_attachment = merchant.documents.find { |attachment| attachment.filename == params[:contract].original_filename }
            funding_attachment = merchant.documents.find { |attachment| attachment.filename == params[:funding_confirmation].original_filename }

            contract_service_url = contract_attachment.service_url
            funding_service_url = funding_attachment.service_url

            redact_contract = Merchant.redact_document(contract_service_url)
            redact_funding = Merchant.redact_image(funding_service_url, funding_confirmation.tempfile.path)

            redacted_image_tempfile = Tempfile.new(['redacted_funding', '.png'])
            redact_funding.write(redacted_image_tempfile.path)
            redacted_image_tempfile.rewind

            contract_tempfile = URI.open(redact_contract)

            merchant.documents.attach(io: contract_tempfile, filename: "Contract - #{integrated_hash[:merchants_legal_name_title_case]} (redacted).pdf ")
            merchant.documents.attach(io: redacted_image_tempfile, filename: "Funding Confirmation - #{integrated_hash[:merchants_legal_name_title_case]} (redacted).png")

            document_info = merchant.documents.map { |document| { url: document.service_url, filename: document.filename } }
      
            render json: {
                merchant: merchant.as_json.merge(document_info: document_info),
                message: 'Documents parsed successfully. See deal list to view your added information.'
            }, 
            status: :created
        end
    end

    def destroy
        merchant = Merchant.find(params[:id])
        merchant.destroy
        render json: merchant
    end

    def download_merchant_document
        s3_response = HTTParty.get(params[:url])
        send_data s3_response.body
    end

    private

    def merchant_params
        params.permit(
            :agreement_date,
            :aos,
            :balance,
            :balance_pb_amount,
            :business_phone,
            :city,
            :city_title_case,
            :contact_name,
            :contract_payoff_date,
            :created,
            :d_b_a,
            :d_b_a_title_case,
            :damages,
            :date_served,
            :default_date,
            :default_judgment,
            :email_address,
            :federal_tax_id,
            :first_guarantor,
            :first_guarantor_title_case,
            :id,
            :image_date,
            :law_firm, 
            :lawyer,
            :lawyer_email,
            :lawyer_phone,
            :legal,
            :lender_legal_name,
            :lender_legal_name_title_case,
            :litigation_date,
            :mail_title_case, 
            :mailing_address,
            :merchants_legal_name,
            :merchants_legal_name_title_case,
            :mobile,
            :notes,
            :payment_frequency,
            :physical_address,
            :physical_city,
            :physical_state,
            :physical_zip, 
            :purchase_price,
            :purchased_amount,
            :purchased_percentage,
            :remittance,
            :response_date, 
            :rtr_legal,
            :rtr_legal_pb_amount,
            :second_guarantor,
            :second_guarantor_email,
            :second_guarantor_phone,
            :second_guarantor_title_case,
            :service,
            :six_month_payoff_date,
            :state,
            :state_of_incorporation,
            :suit_status,
            :total,
            :total_pb_amount,
            :type_of_entity,
            :type_of_entity_no_llc,
            :ucc_status,
            :zip
        )
    end

end                                                           