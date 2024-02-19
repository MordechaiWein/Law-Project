class AddColumnToMerchants < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :balance, :string
  end
end
