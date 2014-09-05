class CardsController < ApplicationController
	respond_to :json

	def index
		@cards = Card.all
		respond_with @cards
	end

	def create
	end

	def edit
	end

	def destroy
	end

end
