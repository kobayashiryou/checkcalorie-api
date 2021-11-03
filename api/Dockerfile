# backend
FROM ruby:2.7.2 AS api
# Ubuntu環境下にnodejsをインストール（railsのコンパイルとかでnodejsが必要）
RUN apt-get update -qq && apt-get install -y build-essential nodejs
RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
COPY . /app
