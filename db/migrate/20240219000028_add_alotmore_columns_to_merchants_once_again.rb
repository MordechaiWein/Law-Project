class AddAlotmoreColumnsToMerchantsOnceAgain < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :balance_pb_amount, :string
    add_column :merchants, :rtr_legal_pb_amount, :string
    add_column :merchants, :total_pb_amount, :string
  end
end



