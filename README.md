# URL shortener service (client)

## Description

This is a URL shortener service, which allows you to shorten long URLs,
and then redirect to the original URL.
This application is written in [Next.js](https://nextjs.org/) and [Typescript](https://www.typescriptlang.org/) for the frontend, and [Node.js](https://nodejs.org/) for the backend using [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/)
for the database.

## Features

This application has the following features:

- Beautiful UI with [Tailwind CSS](https://tailwindcss.com/)
- Great user experience
- Authentication
- Authentication is done using [JWT](https://jwt.io/)
- User profile
- User management (register, login, logout, etc.)
- User settings(change password, update profile,delete account, etc.)
- Shorten URLs (create, read, update, delete)
- Redirect to the original URL
- Statistics

## Installation

To run this application locally , you need to have node.js and mongodb installed.

## Usage

First clone the repository then run the following commands:

on the client directory:

```bash
yarn install
yarn dev
```

on the server directory:

```bash
npm install
nodemon
```

on the root directory:

```bash
mongod
```

Then open the browser and go to http://localhost:3000/

## License

You can use this application for non-commercial purposes, but you cannot modify or redistribute it.
