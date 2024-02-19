class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from JWT::DecodeError, with: :render_invalid_token
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  wrap_parameters format: []
  
  private

  def render_invalid(instance)
    render json: { errors: instance.record.errors.messages }, status: :unprocessable_entity
  end

  def render_not_found
    render json: { error: ["Not authorized"] }, status: :unauthorized
  end
  
  def render_invalid_token
    render json: { error: 'Token invalid.' }, status: :unauthorized
  end

end