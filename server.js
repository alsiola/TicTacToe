const express = require('express');
const mongo = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const stormpath = require('express-stormpath');

const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;

app.use(bodyParser.json());

app.use(stormpath.init(app, {
    web: {
        produces: ['application/json']
    }
}));

app.get('/api/games', stormpath.loginRequired, function(req, res) {
    db.collection('game').find({username: req.user.username}).toArray(function(err,items) {
        res.json(items);
    });
});

app.get('/api/games/:id', stormpath.loginRequired, function(req, res) {
    db.collection('game').find({_id: ObjectId(req.params.id)}).toArray(function (err, items) {
        res.json(items);
    });
});

app.post('/api/games', stormpath.loginRequired, function(req, res) {
    db.collection('game').save(Object.assign({}, req.body, {username: req.user.username}), function(err, result) {
        res.json({success: true});
    })
});

app.use(express.static('build'));

MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(process.env.PORT, "0.0.0.0", function() {
        console.log("listening on port" + process.env.PORT);
    });
});
