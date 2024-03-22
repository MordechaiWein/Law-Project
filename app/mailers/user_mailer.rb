class UserMailer < ApplicationMailer

    def sign_up_link_email
        # @url  = "http://localhost:4000/#{CGI.escape(params[:token])}"  
        @url  = "https://law-project-d1k1.onrender.com/#{CGI.escape(params[:token])}"
        mail(to: params[:email], subject: 'Welcome to Law Automation - Complete Your Registration')
    end
    
end