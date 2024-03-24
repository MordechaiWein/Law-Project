puts '🌱🌱🌱 Seeding database...'

User.destroy_all
User.create(name: 'Martin Wein', password: 'fuckdragin1!', password_confirmation: 'fuckdragin1!', email: 'mordwein77@gmail.com', boss: true, company_name: 'fuck dragin')
puts "🔴"
puts "🟡"
puts "🟢"
puts "🟣"

puts '✅ Seeding complete!'