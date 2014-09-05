class AddUsernameToScore < ActiveRecord::Migration
  def change
  	add_column :scores, :username, :string
  end
end
