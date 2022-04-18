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

setup-aws-cli:
	pip3 uninstall awscli && \
	curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg" && \
	sudo installer -pkg AWSCLIV2.pkg -target /
	rm AWSCLIV2.pkg

bundle install:
	docker-comopose run api bundle install

aws-login:
	aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 298618414706.dkr.ecr.ap-northeast-1.amazonaws.com

ecr-retauch-tag:
	docker tag checkcalorie-api_api:latest 298618414706.dkr.ecr.ap-northeast-1.amazonaws.com/checkcalorie-api:latest

ecr-push:
	docker push 298618414706.dkr.ecr.ap-northeast-1.amazonaws.com/checkcalorie-api:latest