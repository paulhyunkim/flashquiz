class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :points, :created_at, :user_id

  belongs_to :user
end
