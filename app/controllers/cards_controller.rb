class CardsController < ApplicationController
	respond_to :json

	def index
		@deck = Deck.find(params[:deck_id])
		@cards = Card.where(deck_id: @deck.id)
		puts 'XXXXXXXX'
		puts @deck
		puts @cards
		respond_with @cards
	end

	def create
		@deck = Deck.find(params[:deck_id])
		@card = Card.new(card_params)
		@card.deck_id = @deck.id

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
		params.require(:card).permit(:deck_id, :question, :answer)
	end

end
