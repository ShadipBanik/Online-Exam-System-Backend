
# ONLINE EXAM SYSTEM NODE BACKEND REST API

This project Is generated with Node.js,Expres.js,Mysql,sequelize.

## Development server

1.Run `npm install` . </br>
2.go to this file `bin/www` comment out   `//  models.sequelize.sync().then(function() {"` . </br>
3.go to `src/config/config.json` file and configure your database and create a database . </br>
4.Rename `process.env` to `.env` and configure your `SECRET_KEY` . </br>
5.Run `nodemon start` for a dev server. Navigate to `http://localhost:3000/` .  </br>
6.After migrate db  comment this line  `//  models.sequelize.sync().then(function() {"` . </br>

