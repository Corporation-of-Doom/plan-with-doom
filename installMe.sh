#!/bin/sh

echo "Installing required packages for GraphQL API"
cd api
make install
echo "=============================================================="
echo "Installing required packages for VueJS Frontend"
cd ../frontend
npm install