class Api::ScoresController < ApplicationController
  before_action :authenticate_user!
  
  def index
    scores = Score.all_scores.page(params[:page])
    render json: { scores: scores, total_pages: scores.total_pages }
  end

  # without JBuilder
  # def create
  #   score = current_user.scores.new(score_params)
  #   if score.save
  #     render json: { 
  #       email: current_user.email, 
  #       score: score.value, 
  #       nickname: current_user.nickname,
  #       created_at: score.created_at
  #     }
  #   else
  #     json_error(score)
  #   end  
  # end

  # with JBuilder
  def create
    @score = current_user.scores.new(score_params)
    
    if @score.save
      render json: @score
    else
      json_error(@score)
    end
  end

  private
    def score_params
      params.require(:score).permit(:value)
    end  
end
