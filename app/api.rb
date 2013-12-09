module Api
  class Users < Grape::API

    format :json

    resource :users do

      desc "Returns a collection of users"

      get do
        present User.all, with: Api::Entities::User
      end

      # GET /users/123
      desc "Returns a User."

      params do
        requires :id, type: Integer, desc: "User id."
      end

      get ':id' do
        present User.find(id: params[:id]), with: Api::Entities::User
      end

      # POST /users/123
      desc "Creates a User."

      params do
        group :user do
          requires :first_name, type: String
          requires :last_name, type: String
          requires :email, type: String
          optional :job_title, type: String
          optional :pic_url, type: String
          optional :twitter_name, type: String
        end
      end

      post do
        user = User.create(params[:user])

        present user, with: Api::Entities::User
      end

      # PUT /users/123
      desc "Updates a User."

      params do
        requires :id, type: Integer, desc: "User id."

        group :user do
          optional :first_name, type: String
          optional :last_name, type: String
          optional :email, type: String
          optional :job_title, type: String
          optional :pic_url, type: String
          optional :twitter_name, type: String
        end
      end

      put ':id' do
        user = User.find(id: params[:id])
        user.update(params[:user]) if user

        present user, with: Api::Entities::User
      end

      # DELETE /users/123
      desc "Deletes a User."

      params do
        requires :id, type: Integer, desc: "User id."
      end

      delete ':id' do
        user = User.find(id: params[:id])
        user.destroy if user

        present user, with: Api::Entities::User
      end

    end

  end
end

#  ENTITIES

module Api
  module Entities
    class User < Grape::Entity

      expose :id
      expose :first_name
      expose :last_name
      expose :email
      expose :job_title
      expose :pic_url
      expose :twitter_name

    end
  end
end

# MOUNT API

module Api
  class Base < Grape::API

    mount Api::Users

  end
end
