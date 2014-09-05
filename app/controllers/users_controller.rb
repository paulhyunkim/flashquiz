class UsersController < ApplicationController

	def index
	end

	def quiz
	end

	def create
	  @user = User.new(user_params)
		if @user.save
			redirect_to :root
		else
			render 'new'
		end
	end
	
	protected

	def user_params
		params.require(:user).permit(:username, :password)
	end
end
