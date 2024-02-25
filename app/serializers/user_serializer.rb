class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :boss, :company_name
end
