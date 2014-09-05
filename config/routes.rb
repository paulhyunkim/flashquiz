Rails.application.routes.draw do

  root 'users#index'
  get 'welcome', to: 'users#welcome', as: 'welcome'
  get 'currentuser', to: 'users#index'
  get 'quiz', to: 'users#quiz'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get 'signup', to: 'users#new', as: 'users'
  post 'signup', to: 'users#create'
  post 'user/postscore', to: 'users#post_score'
  post 'user/createcard', to: 'users#create_card'


  get 'cards', to: 'cards#index'
  post 'cards', to: 'cards#create'
  patch 'cards/:id', to: 'cards#edit'
  delete 'cards/:id', to: 'cards#destroy'

  get 'scores', to: 'scores#index'
  post 'scores', to: 'scores#create'

end
