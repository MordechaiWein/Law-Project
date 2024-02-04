class UserMailer < ApplicationMailer

    def sign_up_link_email
        @url  = "http://localhost:4000/#{params[:token]}"  
        mail(to: params[:email], subject: 'Welcome to Law Automation - Complete Your Registration')
    end
    
end