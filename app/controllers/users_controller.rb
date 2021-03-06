class UsersController < ApplicationController
	respond_to :json, :html
	before_action :authenticate_user, :except => [:new, :create, :welcome]

	def index
		respond_with current_user
	end

	def welcome
	end

	def quiz
	end

	def practice
	end

	def new
		@user = User.new
	end

	def create
	  @user = User.new(user_params)
		if @user.save
			session[:remember_token] = @user.id.to_s
			redirect_to root_path
		else
			render 'new'
		end
	end

  def create_card(question, answer)
  	Card.create(user_id: current_user.id, question: question, answer: answer)
  	redirect_to action: :index
  end

  def post_score
  	Score.create(user_id: current_user.id, points: params[:points], username: current_user.username)
  	redirect_to action: :index
  end
	
	protected

	def user_params
		params.require(:user).permit(:username, :password)
	end
end
