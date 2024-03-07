class RemoveYetAgainFromMerchants < ActiveRecord::Migration[6.1]
  def change
    remove_column :merchants, :remittance_formatted
  end
end
