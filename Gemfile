source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.3.5"
gem "rails", "~> 8.0.2"
gem "sprockets-rails"
gem "pg", "~> 1.1"
gem "puma"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "tailwindcss-rails"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
gem "bootsnap", require: false
gem "bootstrap", "~> 5.2"
gem "devise"
gem "autoprefixer-rails"
gem "font-awesome-sass", "~> 6.1"
gem "simple_form", github: "heartcombo/simple_form"
gem "simple_form-tailwind"
gem "sassc-rails"
gem "thruster"

group :development, :test do
  gem "dotenv-rails"
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end

gem "dockerfile-rails", ">= 1.6", :group => :development
gem "redis", "~> 5.1"
