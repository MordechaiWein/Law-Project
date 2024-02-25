class RemoveContactNumbersFromMerchants < ActiveRecord::Migration[6.1]
  def change
    remove_column :merchants, :contact_numbers
  end
end
