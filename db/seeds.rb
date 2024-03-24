puts '🌱🌱🌱 Seeding database...'

User.destroy_all
User.create(name: 'Martin Wein', password: 'fuckdragin!', password_confirmation: 'fuckdragin!', email: 'mordwein77@gmail.com', boss: true, company_name: 'fuck dragin')
puts "🔴"
puts "🟡"
puts "🟢"
puts "🟣"

puts '✅ Seeding complete!'