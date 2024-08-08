module PriorityActivityMessageHandler
  extend ActiveSupport::Concern

  private



  def priority_change?(old_priority, new_priority)
    old_priority.present? || new_priority.present?
  end

  def build_priority_change_content(user_name, old_priority = nil, new_priority = nil)
    change_type = get_priority_change_type(old_priority, new_priority)

    I18n.t("conversations.activity.priority.#{change_type}", user_name: user_name, new_priority: new_priority, old_priority: old_priority)
  end

  def get_priority_change_type(old_priority, new_priority)
    case [old_priority.present?, new_priority.present?]
    when [true, true] then 'updated'
    when [false, true] then 'added'
    when [true, false] then 'removed'
    end
  end
end
