class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :points, :created_at, :user_id, :username
end
