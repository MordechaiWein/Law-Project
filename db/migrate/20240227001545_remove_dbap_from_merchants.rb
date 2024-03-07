class RemoveDbapFromMerchants < ActiveRecord::Migration[6.1]
  def change
    remove_column :merchants, :d_b_a_p
    remove_column :merchants, :and_1
    remove_column :merchants, :and_2
  end
end
