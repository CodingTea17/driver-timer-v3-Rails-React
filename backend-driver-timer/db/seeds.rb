# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

Store.destroy_all
Driver.destroy_all
Message.destroy_all

require 'Nokogiri'
require 'HTTParty'

class Scrapper
  attr_accessor :parse_page

  def initialize
    doc = HTTParty.get("http://order.pizzaguys.com/zgrid/themes/13091/portal/index.jsp")
    @parse_page ||= Nokogiri::HTML(doc)
  end

  def parse_out_br
    parse_page.css('br').each{ |br| br.replace(" ") }
  end

  def get_store_numbers
    parse_page.css('.portal-store-order').map { |store_number| store_number['href'].to_str.match(/[0-9]{3}/)[0].to_i }
  end

  def get_addresses
    self.parse_out_br
    parse_page.css('.portal-store-address').map { |address| address.text }
  end
end

scrapper = Scrapper.new
addresses = scrapper.get_addresses
store_numbers = scrapper.get_store_numbers

store_numbers.each_with_index do |store_number, index|
  Store.create!(:store_number => store_number, :address => addresses[index], :password => "password")
end

p "#{Store.all.length} stores created"

home_store = Store.where(:store_number => 177).first
home_store.drivers.create!(:name => "Dawson", :phone_number => "19715702525")
home_store.drivers.create!(:name => "Mark", :phone_number => "14349892005")

p "#{Driver.all.length} drivers created"
