class ScoresController < ApplicationController
	respond_to :json

	# retrieve list of scores
	def index
		@scores = Score.all
		respond_with @scores
	end

	# save user's scores
	def create
	end

end
