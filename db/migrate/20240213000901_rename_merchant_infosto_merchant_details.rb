class RenameMerchantInfostoMerchantDetails < ActiveRecord::Migration[6.1]
  def change
    rename_table :merchant_infos, :merchant_details
  end
end
