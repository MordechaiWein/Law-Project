class ChangeColumnBossInUsersDefaultToFalse < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :boss, :boolean, default: false
  end
end
