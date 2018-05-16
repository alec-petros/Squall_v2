Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :audio_files
      resources :tracks
      resources :users
    end
  end
  post '/sessions/', to: 'sessions#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end