Rails.application.routes.draw do

  root 'users#index'
  get 'welcome', to: 'users#welcome', as: 'welcome'
  get 'quiz/:id', to: 'users#quiz'
  get 'practice/:id', to: 'users#practice'

  # SESSION
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  # NEW USERS
  get 'signup', to: 'users#new', as: 'users'
  post 'signup', to: 'users#create'

  # USER ACTIONS
  get 'currentuser', to: 'users#index'
  post 'user/postscore', to: 'users#post_score'
  post 'user/createcard', to: 'users#create_card'

  # DECKS
  get 'decks', to: 'decks#index'
  post 'decks', to: 'decks#create'
  delete 'decks/:id', to: 'decks#destroy'
  get 'decks/:id', to: 'decks#show'
  get 'publicdecks', to: 'decks#public'
  # get 'userdecks', to: 'decks#index'

  # CARDS
  get 'decks/:deck_id/cards', to: 'cards#index'
  post 'decks/:deck_id/cards', to: 'cards#create'
  delete 'decks/:deck_id/cards/:id', to: 'cards#destroy'

  # SCORES
  get 'scores', to: 'scores#index'
  post 'scores', to: 'scores#create'
  


  # get 'cards', to: 'cards#index'
  # post 'cards', to: 'cards#create'
  # patch 'cards/:id', to: 'cards#edit'
  # delete 'cards/:id', to: 'cards#destroy'

  

end
