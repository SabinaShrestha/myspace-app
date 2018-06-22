

10.times do
 name = Faker::Name.unique.name
   user = User.create(
     name: name,
     image: Faker::Avatar.image(name, '50x50', 'png', 'set3'),
     email: Faker::Internet.unique.email,
     password: 'password'
   )
     2.times do
       user.posts.create(
        title: Faker::Hipster.words(2).join(' '),
        body: Faker::Lorem.paragraph(3)
       )
     end
end

puts 'magic happened'
