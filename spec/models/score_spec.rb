require 'rails_helper'

describe Score do
	describe '#username' do
		it "is the associated user's name" do
			paul = User.create(username: 'Paul')
			paul_score = Score.create(user: paul)
			expect(paul_score.username).to eq('Paul')
		end
	end
end