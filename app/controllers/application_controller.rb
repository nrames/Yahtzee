class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def resource_params
    params.permit(devise_parameter_sanitizer.for(:sign_in))
  end

  protected
    def json_error(model)
      render json: { errors: model.errors.full_messages.join(',') }, status: 422
    end  
end
