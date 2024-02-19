class DropMerchantsTableAgain < ActiveRecord::Migration[6.1]
  def change
    drop_table :merchants
  end
end
