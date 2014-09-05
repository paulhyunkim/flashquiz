class CardSerializer < ActiveModel::Serializer
  attributes :id, :question, :answer, :created_at, :user_id
end
