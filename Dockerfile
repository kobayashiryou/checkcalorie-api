# backend
FROM ruby:2.7.2 AS backend
# Ubuntu環境下にnodejsをインストール（railsのコンパイルとかでnodejsが必要）
RUN apt-get update -qq && apt-get install -y build-essential nodejs
RUN mkdir /app
RUN mkdir /app/backend
WORKDIR /app/backend
COPY Gemfile /app/backend/Gemfile
COPY Gemfile.lock /app/backend/Gemfile.lock
RUN bundle install
COPY . /app/backend

# frontend