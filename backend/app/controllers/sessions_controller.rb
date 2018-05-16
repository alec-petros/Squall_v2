class SessionsController < ApplicationController

  skip_before_action :authenticate!, only: [:create]

  def create
    @user = User.find_by(username: params[:username])

    if @user && @user.authenticate(params["password"])
      render json: user_hash(@user)
    else
      render json: { errors: ["Not a valid user"]}, :status => :unprocessable_entity
    end
  end

end
