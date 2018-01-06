class Driver < ApplicationRecord
  belongs_to :store
  # has_many :driver_messages
  has_many :messages#, :through => :driver_messages
end
