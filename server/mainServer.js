// DEPENDENCIES
const express = require('express');
const parser = require('body-parser');
const app = express();
//const db = require('../db/mongoDB.js');

// MIDDLEWARE 
app.use(express.static(__dirname + '/../public/'));
app.use('/', express.static(__dirname + '/../public/'));
app.use(parser.json());

// SET PORT
app.set('port', process.env.PORT || 1600);

// LISTEN FOR REQUESTS
module.exports = app.listen(app.get('port'), () => { 
    console.log(`Listening on port ${app.get('port')}`);
});

// START MATCHMAKING
const matchmaking = require('./matchmaking/matchmaking.js');