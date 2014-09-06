class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.float :points, null: false, default: 0
      t.integer :user_id
      t.integer :deck_id
      t.string :username

      t.timestamps
    end
  end
end
