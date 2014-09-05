class UsersController < ApplicationController
	respond_to :json, :html

	def index
		respond_with current_user
	end

	def quiz
	end

	def new
		@user = User.new
	end

	def create
	  @user = User.new(user_params)
		if @user.save
			redirect_to root_path
		else
			render 'new'
		end
	end
	
	protected

	def user_params
		params.require(:user).permit(:username, :password)
	end
end
