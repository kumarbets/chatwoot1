# == Schema Information
#
# Table name: folders
#
#  id          :bigint           not null, primary key
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  account_id  :integer          not null
#  category_id :integer          not null
#
class Folder < ApplicationRecord
  belongs_to :account

  validates :account_id, presence: true
  validates :name, presence: true
end
