class AddCreatedToMerchants < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :created, :string
  end
end
