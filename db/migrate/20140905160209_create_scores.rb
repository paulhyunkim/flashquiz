class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :points, null: false, default: 0

      t.timestamps
    end
  end
end
