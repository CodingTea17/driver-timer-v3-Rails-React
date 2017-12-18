class CreateDrivers < ActiveRecord::Migration[5.1]
  def change
    create_table :drivers do |t|
      t.string :name
      t.integer :store_id
      t.string :phone_number

      t.timestamps
    end
  end
end
