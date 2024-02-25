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
        
        # Merge all pulled values into a single hash to be stored in the database.
        compiled_hash = {}
        integrated_hash = compiled_hash.merge(parse_contract, parse_payment_history, parse_funding_confirmation)

        # Find the user. Create a new row in the database. Render a json response with a "created" status code.
        user = User.find(session[:user_id])
        merchant = user.merchants.create!(integrated_hash)
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
            :first_guarantor,
            :first_guarantor_title_case, 
            :second_guarantor,
            :second_guarantor_title_case,
            :email_address,
            :mobile,
            :business_phone,
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