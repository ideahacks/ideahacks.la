# IDEA Hacks Website

[![Build Status](https://travis-ci.org/ideahacks/ideahacks.la.svg?branch=development)](https://travis-ci.com/ideahacks/ideahacks.la)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Setting up the development environment

- Make sure you have an up-to-date version of Node installed. `node --version`
  must be at least **16.17.0**, which is the LTS version.
- Clone this repo with `git clone https://github.com/ideahacks/ideahacks.la.git`
- Change into the repo directory with `cd ideahacks.la`
- Run `npm ci` to install the project's dependencies.
- Create a development.json file within the folder ideahacks/config (see below)
- Run `npm run dev` to start the server. Changes you make will automatically
  restart the server.
- Visit `localhost:3000` to view the site.
- Run `npm run test` to check formatting and run ESLint, which will catch common
  errors.

## development.json

Make sure you have a development.json file within the folder ideahacks/config
— it contains private configuration variables that can't be pushed onto GitHub,
so you'll have to create it in order to run the project locally. It looks like:

```
{
  "dbURI": "INSERT_URI_HERE",
  "sessionSecret": "INSERT_SECRET_HERE",
  "host": "localhost:3000",
  "SENDGRID_API_KEY": "INSERT_API_KEY_HERE",
  "GOOGLE_CLIENT_ID": "INSERT_ID_HERE",
  "GOOGLE_CLIENT_SECRET": "INSERT_SECRET_HERE"
}
```

## Remote database connection

This project connects to a remote database. Connection to this remote database
requires WIFI internet connection (as opposed to WEB).

```
UCLA_WIFI will work
UCLA_WEB will not work
```

If you see error messages in your console about failure to connect to the
database, this is likely the issue. It might also be because you don't have
necessary permissions.

## Deployment

Currently this website is hosted on Heroku, a cloud hosting service. Heroku is
configured to **automatically** deploy this repo on its development and
production branches.

```
production: ideahacks.la
development: ideahacks-test.herokuapp.com
```
