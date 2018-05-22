Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :audio_files
      resources :tracks
      resources :users

      get '/tracks/:id/play', to: 'tracks#play'

      get '/users/:id/favorites', to: 'users#favorites'
      get '/users/:id/stream', to: 'users#stream'

      post '/follows', to: 'follows#create'
      delete '/follows/:id', to: 'follows#delete'

      delete '/favorites/:id', to: 'favorites#delete'
      post '/favorites', to: 'favorites#create'

      post '/comments', to: 'comments#create'
    end
  end
  post '/sessions/', to: 'sessions#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
