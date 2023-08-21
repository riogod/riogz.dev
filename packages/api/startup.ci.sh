#!/usr/bin/env bash
set -e

yarn run migration:run:prod
yarn run seed:run
yarn run start:prod
