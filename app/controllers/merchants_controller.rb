class MerchantsController < ApplicationController

    def index
        merchants = Merchant.all
        render json: merchants
    end

    def update
        merchant = Merchant.find(params[:id])
        merchant.update!(merchant_params)
        render json: merchant  
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
        
        # Merge all pulled values into a single hash to be stored in the database.
        compiled_hash = {}
        integrated_hash = compiled_hash.merge(parse_contract, parse_payment_history, parse_funding_confirmation)

        # render json: {text: parse_payment_history}

        # Find the user.
        user = User.find(session[:user_id])

        # Create a row in both tables associated with the "user"...
        merchant = user.merchants.create!(integrated_hash)
      
        # Render a JSON response with a 'created' status: :code...
        render json: merchant, status: :created
    end

    private

    def merchant_params
        params.permit(
            :id, 
            :date_served, 
            :default_judgment, 
            :created, 
            :balance, 
            :rtr_legal, 
            :total, 
            :suit_status, 
            :aos, 
            :ucc_status, 
            :law_firm, 
            :notes,
            :contact_name_title_case,
            :email_address,
            :contact_numbers,
            :second_guarantor,
            :second_guarantor_email, 
            :second_guarantor_phone,
            :lawyer,                 
            :lawyer_email,          
            :lawyer_phone,
            :litigation_date,        
            :response_date, 
            :balance_pb_amount,      
            :rtr_legal_pb_amount,   
            :total_pb_amount,
            :remittance_formatted,
            :six_month_payoff_date,  
            :service, 
            :contract_payoff_date
        )
    end

end                                                           