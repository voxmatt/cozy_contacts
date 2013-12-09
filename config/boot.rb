$:.unshift(File.join(File.dirname(__FILE__), '..'))

ENV['RACK_ENV'] ||= 'development'

require "bundler/setup"

Bundler.require :default, ENV['RACK_ENV']
