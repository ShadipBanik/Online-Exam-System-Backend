
# ONLINE EXAM SYSTEM NODE BACKEND REST API

This project Is generated with Node.js,Expres.js,Mysql.

## Development server
1.Run `npm install` 
2.go to this file `bin/www` comment out   `//  models.sequelize.sync().then(function() {"`
3.configure `.env` file and create a database.
4.Run `nodemon start` for a dev server. Navigate to `http://localhost:3000/`. 
5.after migrate db  comment this line  `//  models.sequelize.sync().then(function() {"`
