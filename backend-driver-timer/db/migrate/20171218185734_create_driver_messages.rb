class CreateDriverMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :driver_messages do |t|
      t.integer :message_id
      t.integer :driver_id

      t.timestamps
    end
  end
end
