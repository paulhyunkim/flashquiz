class CardsController < ApplicationController
	respond_to :json

	def index
		@cards = Card.all
		respond_with @cards
	end

	def create
		@card = Card.new(card_params)

		if @card.save
			respond_to do |format|
			format.html { }
      format.json { render json: @card, status: :created }
	    end
	  else
	    respond_to do |format|
	      format.html { }
	      format.json { render json: @card.errors, status: :unprocessable_entity }
	    end
	  end
  end

	def edit
	end

	def destroy
		Card.find(params[:id]).destroy
		respond_to do |format|
			format.html {}
			format.json { render json: { head: :ok } }
		end
	end

	protected

	def card_params
		params.require(:card).permit(:question, :answer)
	end

end
