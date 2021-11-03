up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

# rails
rubocop:
	docker-compose run api bundle exec rubocop

rubocop_a:
	docker-compose run api bundle exec rubocop -a

rubocop_A:
	docker-compose run api bundle exec rubocop -A

rspec:
	docker-compose run api bundle exec rspec
