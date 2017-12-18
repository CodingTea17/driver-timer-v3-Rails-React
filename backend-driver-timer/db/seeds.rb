# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Store.destroy_all
Driver.destroy_all
Message.destroy_all
DriverMessage.destroy_all

store = Store.new(:store_number => 177, :password => "password")
store.save

Driver.create!(:name => "Dawson", :phone_number => "19715702525", :store_id => store.id)
