dev: db api

api:
	nodemon src

db:
	psql postgres -c \
		"CREATE ROLE doom WITH LOGIN PASSWORD 'doomsday';" -c\
		"ALTER ROLE doom SUPERUSER;"
	node src/setup_db.js
	psql -U doom -f src/migrations/*.sql doom-db

clean:
	node src/delete_db.js
	psql postgres -c "DROP ROLE doom;"



