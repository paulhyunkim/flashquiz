class Score < ActiveRecord::Base
	belongs_to :user
	belongs_to :deck

	delegate :username, to: :user
end
