class RemoveContactNameTitleCaseFromMerchants < ActiveRecord::Migration[6.1]
  def change
    remove_column :merchants, :contact_name_title_case
  end
end
