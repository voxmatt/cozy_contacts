Sequel.migration do

  up do
    add_column :users, :title, String
  end

  down do
    drop_column :users, :title
  end

end
