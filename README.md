# COMP308-Assignment 3

A Course Management System on MEAN.

## Getting Started

### Mongo DB

Express app connects to `comp308-assignment3` database [by default](./express/src/config/env/development.ts).

Optionally, use Docker to run Mongo:

```bash
docker run -d -p 27017:27017 --name mongo-comp308 mongo
```

### Express Web Server

Express app listens on port `3000`.

```bash
cd express
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

Express app is written in TypeScript and transpiled files are placed in `express/dist/`. The entry point of the app is [`www`](./express/bin/www) module. It runs the transpiled JS files in `express/dist/`.

```bash
cd express

# Watch TS files in "src/" and transpile them
npm run build:watch

# Watch JS files in "dist/"
npm run nodemon
```

#### Debug Express in VS Code

If you use Visual Studio Code, there are [configurations](./express/.vscode/) to help you with debugging the app.

1. Open directory [`express/`](./express/) in VS Code
1. Press `Ctrl + Shift + B` (Run Default Build Task) to watch TS files in "src/" and transpile them in background
1. Press F5 to debug TS files

### Angular

#### Debug Angular in VS Code

If you use Visual Studio Code, there are [configurations](./ng/.vscode/) to help you with debugging the app.

1. Open directory [`ng/`](./ng/) in VS Code
1. Install [Debugger for Chrome extention](https://github.com/Microsoft/vscode-chrome-debug)
1. Press `Ctrl + Shift + B` (Run Default Build Task) to run `ng serve` in background
1. Press F5 to debug

## Deploy

The package in [`scripts/`](./scripts) is used to build the app for production. Script builds Angular app and places the files in `express/dist/public/`. Express serves them as static files.

```bash
cd scripts
npm install

# build app. output files to express/dist/public/
npm start

cd ..
# run production build
node express/bin/www
```