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

Express app is written in TypeScript and transpiled files are placed in `express/dist/`.

```bash
cd express

# Watch TS files in "src/" and transpile them
npm run build:watch

# Watch JS files in "dist/"
npm run nodemon
```

#### Debug in VS Code

If you use Visual Studio Code, a [launch configuration](./express/.vscode/launch.json) is there to help you with debugging the app.

```bash
# Watch TS files in "src/" and transpile them
npm run build:watch

# Press F5 in VS Code to debug TS files
```
