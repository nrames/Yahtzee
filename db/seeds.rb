100.times do
  user = User.create(email: Faker::Internet.unique.email, password: 'password')
  100.times do
    Score.create( user_id: user.id, value: Faker::Number.between(25, 350) )    
  end
end