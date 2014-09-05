Rails.application.routes.draw do

  root 'users#index'
  get 'quiz', to: 'users#quiz'

  get 'cards', to: 'cards#index'
  post 'cards', to: 'cards#create'
  patch 'cards/:id', to: 'cards#edit'
  delete 'cards/:id', to: 'cards#destroy'

  get 'scores', to: 'scores#index'
  post 'scores', to: 'scores#create'

end
