# blogspot-api
Create your own blog using blogspot api.

# Prerequisites
* Latest version of node and NPM `sudo npm install -g npm@latest`
* Installed Postgres

# Install locally
* Create a database
```
terminal> sudo su - postgres
terminal> psql
psql> CREATE DATABASE blogspot;
```
* `npm install babel-cli -g`
* `npm install`
* `cp .env.example .env`
* `npm run build`
* Set up the database user:
`createuser -s --pwprompt postgres`
Set the password to `1234567890`
* `npm run sync-db` Sync that database
* `npm run seed-db` Seed that database

# Database model changes
After any change to models run
`node ./dist/tools/sync-database.js --force` (Shortcut: `npm run syncdb`) to sync the scheme

## Dropping of database
* `npm run drop-db` Warning this will drop the whole database

## Syncing and Seeding of database
This should be run on every database change
* `npm run sync-db`

This should be run once to get initial data
* `npm run seed-db`

## Auth
During development instead of providing real token, we can pretend to be 
any user with `Authorization` header like this `User ${userEmail}`.

This options is disabled by default. To enable it `.env` file should have the following line:
```
AUTH__ALLOW_BY_EMAIL = false
```

# Postman
We're using `Postman` to test the endpoints.
You can load all the endpoints from `assets\postman.json`

We document our endpoint using `postman.json` under Assets
when adding a new endpoint - please Update that dump file
