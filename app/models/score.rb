class Score < ApplicationRecord
  # Associations
  belongs_to :user

  # Validations
  validates_presence_of :value
  validates_numericality_of :value

  def self.all_scores
    select('value, user_id, u.email, scores.id')
    .joins('INNER JOIN users u ON u.id = scores.user_id')
    .order(value: :desc)
  end  
  # Class Methods - Model Scope

  # Instance Methods

  # Callbacks: before_create, after_create, before_save, after_save


end