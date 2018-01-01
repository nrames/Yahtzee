json.array! @scores do |score|
  user = User.find(score.user_id)
  json.email user.email
  json.score score.value
  json.nickname user.nickname
  json.created_at score.created_at
end