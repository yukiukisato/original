class CreateCalculations < ActiveRecord::Migration[6.0]
  def change
    create_table :calculations do |t|
      t.integer :weight,         null: false
      t.integer :calorie,      null: false
      t.integer :met,          null: false

      t.timestamps
    end
  end
end
