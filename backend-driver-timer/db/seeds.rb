# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

Store.destroy_all
Driver.destroy_all
Message.destroy_all

store = Store.create!(:store_number => 177, :password => "password")
p "store #{store.store_number} created"
store.drivers.create!(:name => "Dawson", :phone_number => "19715702525")
store.drivers.create!(:name => "Mark", :phone_number => "14349892005")
