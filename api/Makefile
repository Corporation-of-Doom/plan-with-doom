dev: db api

api:
	nodemon src

db:
	docker-compose -f docker-compose.yml up -V &

destroy:
	docker-compose down
	docker system prune -a

install:
	npm install
