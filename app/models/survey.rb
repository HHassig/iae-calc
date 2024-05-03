require "csv"

class Survey < ApplicationRecord
  def yes_or_no(answer)
    answer ? "Yes" : "No"
  end
end
