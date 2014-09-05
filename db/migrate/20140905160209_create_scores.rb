class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.float :points, null: false, default: 0

      t.timestamps
    end
  end
end
