class DecksController < ApplicationController

	def index
	end

	def new
		@deck = Deck.new
	end

	def create
	  @deck = Deck.new(deck_params)
		if @deck.save
			respond_to do |format|
				format.html { }
	      format.json { render json: @deck, status: :created }
	    end
	  else
	    respond_to do |format|
	      format.html { }
	      format.json { render json: @deck.errors, status: :unprocessable_entity }
	    end
	  end
	end

	

	protected

	def deck_params
		params.require(:deck).permit(:user_id, :name)
	end

end
