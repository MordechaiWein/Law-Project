class AddColumnThreeToMerchants < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :total, :string
  end
end
