class UsersController < ApplicationController

    # Auto Log In.
    def show
        user = User.find(session[:user_id])
        render json: user, status: :created
    end

    # Sign Up.
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    # Sends a one-time sign up link...
    def signup_link
        name = params[:name]
        email = params[:email]
        identifier = SecureRandom.hex(10) 
        payload = {identifier: identifier, exp: Time.now.to_i + 1800}
        secret_key = Figaro.env.JWT_SECRET_KEY
        token = JWT.encode(payload, secret_key)
        begin
            UserMailer.with(name: name, email: email, token: token).sign_up_link_email.deliver_now
            render json: { success: 'Invite link sent successfully 🎉' }
        rescue StandardError
            render json: {error: 'Email delivery failed. Please verify email address.'}, status: :internal_server_error
        end
    end

    # Checks if the one-time sign up link is valid...
    def signup_link_confirmation
        token = params[:pathname]
        secret_key = Figaro.env.JWT_SECRET_KEY
        decoded_token = JWT.decode(token, secret_key, true, algorithm: 'HS256')
    end

    private

    def user_params
        params.permit(:name, :email, :company_name, :password, :password_confirmation)
    end

end