class RenameUccStatus < ActiveRecord::Migration[6.1]
  def change
    rename_column :merchants, :ucc_satuts, :ucc_status
  end
end
