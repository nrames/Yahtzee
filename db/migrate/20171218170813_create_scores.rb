class CreateScores < ActiveRecord::Migration[5.1]
  def change
    create_table :scores do |t|
      t.integer :value, null: false, default: 0
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
