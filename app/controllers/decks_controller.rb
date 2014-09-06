class DecksController < ApplicationController
	respond_to :json, :html

	def index
		@decks = Deck.where(user_id: current_user.id)
		respond_with @decks
	end

	def public
		@decks = Deck.all
		respond_with @decks
	end

	def show
		@deck = Deck.find_by(id: params[:id])
		respond_with @deck
	end

	def new
		@deck = Deck.new
	end

	def create
	  @deck = Deck.new(deck_params)
	  @deck.user_id = current_user.id

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

	def destroy
		Deck.find(params[:id]).destroy
		respond_to do |format|
			format.html {}
			format.json { render json: { head: :ok } }
		end
	end

	

	protected

	def deck_params
		params.require(:deck).permit(:user_id, :name)
	end

end
