Rails.application.routes.draw do
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/signin', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/one-time-signup-link', to: 'users#signup_link'
  post '/signup-link-confirmation', to: 'users#signup_link_confirmation'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end