class AddAlotmoreColumnsToMerchantsAgain < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :second_guarantor_email, :string
    add_column :merchants, :second_guarantor_phone, :string
    add_column :merchants, :lawyer, :string
    add_column :merchants, :lawyer_email, :string
    add_column :merchants, :lawyer_phone, :string
    add_column :merchants, :litigation_date, :string
    add_column :merchants, :response_date, :string
    add_column :merchants, :six_month_payoff_date, :string
    add_column :merchants, :service, :string
    add_column :merchants, :contact_numbers, :string
    add_column :merchants, :remittance_formatted, :string
  end
end