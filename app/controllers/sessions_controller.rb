class SessionsController < ApplicationController

	def new
	end

	def create 
		@user = User.find_by(username: params[:session][:username])
		if @user == nil || !@user.authenticate(params[:session][:password])
			render 'new'
		else
			session[:remember_token] = @user.id.to_s
			@current_user = @user
			redirect_to root_path
		end
	end

	def destroy
		session.delete(:remember_token)
		redirect_to root_path
	end

end
