class AddSevenColumnsToMerchants < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :suit_status, :string
    add_column :merchants, :aos, :string
    add_column :merchants, :date_served, :string
    add_column :merchants, :default_judgment, :string
    add_column :merchants, :ucc_satuts, :string
    add_column :merchants, :law_firm, :string
    add_column :merchants, :notes, :string
  end
end