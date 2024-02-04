class CreateMerchants < ActiveRecord::Migration[6.1]
  def change
    create_table :merchants do |t|
      t.integer :user_id
      t.string :agreement_date
      t.string :and_1
      t.string :and_2
      t.string :business_phone
      t.string :damages
      t.string :balance
      t.string :legal
      t.string :total
      t.string :city
      t.string :city_title_case
      t.string :contact_name
      t.string :contact_name_title_case
      t.string :d_b_a
      t.string :d_b_a_title_case
      t.string :email_address
      t.string :default_date
      t.string :federal_tax_id
      t.string :last_name
      t.string :plaintiff
      t.string :plaintiff_Address
      t.string :plaintiff_legal_name
      t.string :plaintiff_legal_name_title_case
      t.string :plaintiff_state
      t.string :plaintiff_short_name
      t.string :plaintiff_initials
      t.string :mail_title_case
      t.string :mailing_address
      t.string :merchants_legal_name
      t.string :merchants_legal_name_title_case
      t.string :mobile
      t.string :payment_frequency
      t.string :physical_address
      t.string :physical_city
      t.string :physical_state
      t.string :physical_zip
      t.string :purchase_price
      t.string :purchased_amount
      t.string :purchased_percentage
      t.string :remittance
      t.string :second_contact
      t.string :funding_date
      t.string :state
      t.string :state_of_incorporation
      t.string :type_of_entity
      t.string :type_of_entity_no_llc
      t.string :zip
      t.string :d_b_a_p
      t.string :ssn
      t.string :ucc_date

      t.timestamps
    end
  end
end
