Sequel.migration do

  up do
    add_column :users, :twitter_name, String
    drop_column :users, :twitter_url
  end

  down do
    drop_column :users, :twitter_name
    add_column :users, :twitter_url, String
  end

end
