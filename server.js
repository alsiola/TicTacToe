const express = require('express');
const mongo = require('mongodb');
const routes = require('./rest/routes');

require('dotenv').config();

const app = express();
const MongoClient = mongo.MongoClient;

routes(app);

app.use(express.static('build'));

MongoClient.connect('mongodb://localhost:27017/tictactoe', function(err, database) {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(process.env.port, function() {
        console.log("listening on port" + process.env.port);
    });
});