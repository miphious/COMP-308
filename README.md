# COMP 308 Project

[Demo on Heorku](https://comp-308-mean.herokuapp.com)

## Getting Started

### Mongo DB

Run Mongo DB. Express app connects to `comp308-project` database [by default](./src/config/env/development.ts).


### Express Web Server

Express app listens on port `3000`.

```bash
npm install
npm start
```

### Angular App

Angular app is served on port `4200` and its calls to `localhost:4200/api` are proxied to `localhost:3000/api`.

```bash
cd ng
npm install
npm start
```

Head to [http://localhost:4200](http://localhost:4200) to see the app.

## Development

### Express

Express app is written in TypeScript and transpiled files are placed in `dist/`. The entry point of the app is [`www.js`](./bin/www.js) module. It runs the transpiled JS files in `dist/`.

```bash
# Watch TS files in "src/", transpile and copy them to "dist/"
npm run build:watch

# Watch JS files in "dist/"
npm run nodemon
```

#### Debug Express in VS Code

If you use Visual Studio Code, there are [configurations](./.vscode/) to help you with debugging the app.

1. Make sure nodemon is installed globally: `npm install --global nodemon`
1. Open app in VS Code
1. Press `Ctrl + Shift + B` (Run Default Build Task) to watch TS files in "src/" and transpile them in background
1. Press F5 to debug TS files

### Angular

## Configurations

Mongo Db connection string could be set in [config files](./src/config/env) or as `APP_MONGO` environment variable.

> If an app configuration is available both in a file and as environment variable, environment variable wins.


### Heorku

App is ready to be deployed on [Heroku](https://www.heroku.com). Add the following environment variables in application settings:

- `NPM_CONFIG_PRODUCTION` : `false`
- `APP_MONGO` : `mongodb://<dbuser>:<dbpassword>@abc.mlab.com:51799/foo-db`
- `APP_SESSION_SECRET` : `secret`
