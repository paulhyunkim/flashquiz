module ApplicationHelper

	def current_user
		if session[:remember_token] 
			@current_user ||= User.find(session[:remember_token])
		else
			@current_user = nil
		end
	end

	def authenticate_user
		if !self.current_user
			redirect_to new_session_path
		end
	end
	
end
