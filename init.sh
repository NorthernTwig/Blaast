#!/bin/sh

echo 'Initializing Server'

echo 'Installing dependencies'

npm install

echo 'Dependencies installed'

echo 'Creating .env file'

echo 'DB_HOST=mongodb://localhost/blog-mongo
PUBLIC_SECRET=youshouldchangethis1'>>.env

echo 'Done.'