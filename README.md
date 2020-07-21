# mean-course

This project is a billing cycle management web application for study purpose, it uses [Angular](https://angular.io) framwork for frontend application, the frontend application it was generated using [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1. 
The backend application it is built with [NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com) and [MongoDB](https://www.mongodb.com). It is necessary have NodeJS and MongoDB in your machine to run this project.

## Installing frontend (Angular) and backend dependencies

Run `npm install` on frontend root folder to install frontend dependencies, to install backend dependencies run the same command but in backend root folder.

## Running backend application

To run backend application, go to backend root folder and run `npm run dev` to development mode or `pm2 start loader.js --name backend` to deploy in production mode. The backend application runs on port 3003 by default.

## Running frontend application

To run frontend application go to frontend root folder and run `npm start` or `ng serve` and access `http://localhost:4200` on your browser, the frontend application runs on port 4200 by default.
