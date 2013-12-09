require File.expand_path('../boot', __FILE__)

require 'config/database'
DB = Sequel.connect( DB_CONFIG[ENV['RACK_ENV'].to_sym] )
Sequel::Model.plugin :timestamps
Sequel::Model.plugin :validation_helpers

require 'app/api'
require 'app/models.rb'

module App

  def self.application
    Rack::Builder.new do

      use Rack::Static, root: 'app', index: 'index.html'

      map '/assets' do
        assets = Sprockets::Environment.new
        assets.append_path 'app/assets/'
        run assets
      end

      map '/api' do
        run ::Api::Base
      end

    end

  end

end
