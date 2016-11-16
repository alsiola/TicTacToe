const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const stormpath = require('express-stormpath');

module.exports = function(app) {
    
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
}