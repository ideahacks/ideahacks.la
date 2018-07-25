# IDEA Hacks Website

[![Build Status](https://travis-ci.org/ideahacks/ideahacks.la.svg?branch=development)](https://travis-ci.org/ideahacks/ideahacks.la)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Shipping faster with ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://zenhub.com)

## Setting up the development environment

Clone this repo with `git clone https://github.com/ideahacks/ideahacks.la.git`  
Change into the this directory with `cd ideahacks.la`  
Run `npm install` to install the project's dependencies.  
Create a `development.json` file within `/ideahacks/config` (see below)  
Run `npm start` to start the server.  
Visit `localhost:3000` to view the site.

## development.json

The development.json file contains private configuration variables that can't
be pushed onto GitHub, so you'll have to create it in order to run the project
locally. It looks like:

```
{
  "dbURI": "INSERT_URI_HERE",
  "sessionSecret": "INSERT_SECRET_HERE",
  "host": "localhost:3000",
  "SENDGRID_API_KEY": "INSERT_API_KEY_HERE"
}
```

## Remote database connection

This project connects to a remote database. Connection to this remote database
requires WIFI internet connection (as opposed to WEB).

```
UCLA_WIFI will work
UCLA_WEB will not work
```

If you see error messages in your console about failure to connect to the database, this is likely the issue. It might also be because you don't have
necessary permissions.

## Testing

**This project currently doesn't use any real tests.** However, it uses ESLint and
prettier to encourage best practices and a uniformly formatted code base. If tests
are failing, it's likely that the website will still work, there's just something
ugly in the code.

## Deployment

Currently this website is hosted on Heroku, a cloud hosting service. Heroku
is configured to **automatically** deploy this repo on its development and production
branches.

```
production: ideahacks.la
development: ideahacks-test.herokuapp.com
```

THIS IS A SIMPLE CHANGE TO THE README FILE
