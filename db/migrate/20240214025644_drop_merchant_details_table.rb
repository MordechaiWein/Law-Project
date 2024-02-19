class DropMerchantDetailsTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :merchant_details
  end
end
