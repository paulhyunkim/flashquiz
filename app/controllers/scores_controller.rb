class ScoresController < ApplicationController
	respond_to :json

	# retrieve list of scores
	def index
		@scores = Score.all
		respond_with @scores
	end

	# save user's scores
	def create
		@score = Score.new(score_params)

		if @score.save
			respond_to do |format|
			format.html { }
      format.json { render json: @score, status: :created }
	    end
	  else
	    respond_to do |format|
	      format.html { }
	      format.json { render json: @score.errors, status: :unprocessable_entity }
	    end
	  end
	end

	protected

	def score_params
		params.require(:score).permit(:points, :user_id, :username)
	end


end
