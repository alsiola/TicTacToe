const express = require('express');
const mongo = require('mongodb');
const routes = require('./rest/routes');

if (!process.env.DEVELOPMENT) {
require('dotenv').config();
}
var config = JSON.parse(process.env.APP_CONFIG);

const app = express();
const MongoClient = mongo.MongoClient;

routes(app);

app.use(express.static('build'));

MongoClient.connect("mongodb://" + config.mongo.user + ":tictacMongo@" + config.mongo.hostString, function(err, database) {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(process.env.PORT, "0.0.0.0", function() {
        console.log("listening on port" + process.env.PORT);
    });
});