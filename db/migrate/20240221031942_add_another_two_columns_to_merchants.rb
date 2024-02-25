class AddAnotherTwoColumnsToMerchants < ActiveRecord::Migration[6.1]
  def change
    add_column :merchants, :first_guarantor_title_case, :string
    add_column :merchants, :second_guarantor_title_case, :string
  end
end