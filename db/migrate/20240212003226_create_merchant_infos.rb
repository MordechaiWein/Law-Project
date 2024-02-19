class CreateMerchantInfos < ActiveRecord::Migration[6.1]
  def change
    create_table :merchant_infos do |t|
      t.integer :user_id
      t.string :agreement_date
      t.string :and_1
      t.string :and_2
      t.string :business_phone
      t.string :city
      t.string :city_title_case
      t.string :contact_name
      t.string :contact_name_title_case
      t.string :d_b_a
      t.string :d_b_a_p
      t.string :d_b_a_title_case
      t.string :damages
      t.string :default_date
      t.string :email_address
      t.string :federal_tax_id
      t.string :first_guarantor
      t.string :image_date
      t.string :legal
      t.string :lender_legal_name
      t.string :lender_legal_name_title_case
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
      t.string :second_guarantor
      t.string :state
      t.string :state_of_incorporation
      t.string :type_of_entity
      t.string :type_of_entity_no_llc
      t.string :zip

      t.timestamps
    end
  end
end
