class Deck < ActiveRecord::Base
	has_many :cards
	has_many :scores
	belongs_to :user
end
