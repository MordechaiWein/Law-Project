class UserMailer < ApplicationMailer

    def sign_up_link_email
        # Use the commented out url for development:
        # @url  = "http://localhost:4000/#{params[:token]}"  
        @url  = "https://www.lawexample.com/#{params[:token]}"
        mail(to: params[:email], subject: 'Welcome to Law Automation - Complete Your Registration')
    end
    
end