class User < ApplicationRecord
    has_secure_password(options={validations:false})
    has_many :merchants

    validates :name, :email, :company_name, uniqueness: { message:  "%{attribute} is taken. Try another." }
    validates :name, :email, :password, :company_name, presence: { message: ->(error, attributes) { "Enter your #{attributes[:attribute].downcase}." } }
    validates :password, length: { minimum: 8, message: "Minimum 8 characters required."} 
    validates :name, length: { minimum: 3, message: "Enter a valid name." } 
    validates :company_name, length: { minimum: 5, message: "Enter a valid company name." } 
    validates :password_confirmation, presence: { message: "Enter your password again." }
    validates :password, confirmation: { if: -> { password.present? }, message: "Passwords didn't match. Try again."}
    validates :email, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i,  message: "Enter a valid email address."}
    validates :password, format: { with: /\A(?=.*[\/?!#@$%^&*()<:" ,>|\\?])(?=.*\d).+\z/, message: "Password must include a number and symbol."}
   
end
