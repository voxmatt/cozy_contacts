Sequel.migration do

  up do
    drop_column :users, :title
    add_column :users, :job_title, String
  end

  down do
    drop_column :users, :job_title
    add_column :users, :title, String
  end

end
