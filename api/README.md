# API

## First Time Using the API
The current configuration sets up a local PostgresQL database. It is meant to be used in a development environment.
In the `api` directory:
1. run `npm install`
2. run `make` to set up the local database and run the GraphQL API

You can view the databse schema and tables by using any databse tool (recommended: DBeaver).
- host: localhost
- port: 5432
- database: doom-db
- user: doom
- password: doomsday

The API will be running on `localhost:4000/graphql`.

## Additional Notes
If you run `make clean` it will delete the previously mentioned databse. However, if you are connected to the databse it will throw an error (can't delete if it's being used). If you wish to delete everything, disconnect then run `make clean`