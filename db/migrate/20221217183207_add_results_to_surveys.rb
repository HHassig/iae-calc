class AddResultsToSurveys < ActiveRecord::Migration[7.0]
  def change
    add_column :surveys, :eauiaic, :string
    add_column :surveys, :iaeseverity, :string
    add_column :surveys, :suffixt, :string
    add_column :surveys, :modifiedsatava, :string
    add_column :surveys, :classintra, :string
    add_column :surveys, :eaes, :string
  end
end
