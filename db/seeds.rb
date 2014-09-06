# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


john = User.create(username: "John", password: "password")
alex = User.create(username: "Alex", password: "password")
math = Deck.create(user_id: john.id, name: "Math")
geography = Deck.create(user_id: alex.id, name: "Geography")
Card.create(deck_id: math.id, question: "1+1", answer: "2")
Card.create(deck_id: math.id, question: "1-1", answer: "0")
Card.create(deck_id: math.id, question: "1*1", answer: "1")
Card.create(deck_id: math.id, question: "1/1", answer: "1")
Card.create(deck_id: geography.id, question: "Capital of Japan", answer: "Tokyo")
Card.create(deck_id: geography.id, question: "Capital of Russia", answer: "Moscow")
Card.create(deck_id: geography.id, question: "Capital of Canada", answer: "Ottawa")
Card.create(deck_id: geography.id, question: "Capital of Spain", answer: "Madrid")
