class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id

  has_many :cards
  has_one :user
end
