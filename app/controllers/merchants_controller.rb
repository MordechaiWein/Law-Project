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
            render json: {error: 'Document parsing failed. The App currently supports limited file formats. Contact admin for assistance.'}, status: :unprocessable_entity
        else
            # Merge all pulled values into a single hash to be stored in the database.
            compiled_hash = {}
            integrated_hash = compiled_hash.merge(parse_contract, parse_payment_history, parse_funding_confirmation)

            # Find the user. Create a new row in the database. Render a json response with a "created" status code.
            user = User.find(session[:user_id])
            merchant = user.merchants.create!(integrated_hash)
            render json: {merchant: merchant, message: 'Documents parsed successfully. See deal list to view your added information.'}, status: :created
        end
    end

    def destroy
        merchant = Merchant.find(params[:id])
        merchant.destroy
        render json: merchant
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