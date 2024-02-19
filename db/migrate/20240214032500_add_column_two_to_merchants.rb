class AddColumnTwoToMerchants < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :rtr_legal, :string
  end
end
