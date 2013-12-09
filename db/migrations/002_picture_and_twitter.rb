Sequel.migration do

  up do
    add_column :users, :pic_url, String
    add_column :users, :twitter_url, String
  end

  down do
    drop_column :users, :pic_url
    drop_column :users, :twitter_url
  end

end
