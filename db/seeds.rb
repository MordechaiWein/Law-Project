puts 'Seeding Database...🌱🌱🌱'

User.destroy_all
User.create(name: "Martin Wein", password: "12345678%", password_confirmation: "12345678%", email: "mordwein77@gmail.com", boss: true, company_name: "Kick your ass legal group")

puts 'Seeding complete!'