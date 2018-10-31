#!/bin/sh

# TODO check ports prior to making and exit if ports used
# lsof -i :8080
# lsof -i :4000
# Suggest killing process using port for user to change .env ports 

echo "You may need root permission if the API fails to create"
echo "Setting up GraphQL API"
cd api
make &

echo "Setting up VueJS Frontend"
cd ../frontend
npm run serve
