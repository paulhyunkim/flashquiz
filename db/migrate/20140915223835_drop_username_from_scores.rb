class DropUsernameFromScores < ActiveRecord::Migration
  def change
  	remove_column :scores, :username
  end
end
