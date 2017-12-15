class CreateSms < ActiveRecord::Migration[5.1]
  def change
    create_table :sms do |t|
      t.string :from
      t.string :text
      t.string :message_id
      t.datetime :message_timestamp

      t.timestamps
    end
  end
end
