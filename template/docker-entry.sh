#!/usr/bin/env sh

cd ./server && node ./bin/migrate.js && node index.js
