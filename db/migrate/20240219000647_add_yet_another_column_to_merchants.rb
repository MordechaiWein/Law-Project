class AddYetAnotherColumnToMerchants < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :contract_payoff_date, :string
  end
end
