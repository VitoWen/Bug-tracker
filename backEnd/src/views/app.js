process.chdir(__dirname);
var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    user = require('../controllers/user.js'),
    bug = require('../controllers/bug.js'),
    app = express(),
    router = express.Router(),
    db = mongoose.connect('mongodb://localhost:27017/bugTracker').connection;
    serverPort = '7367';

mongoose.Promise = global.Promise;
db.on('connected', function () {
    console.log('Connect to DB successfully.');
});

// User item
router.post('/tracker/user/create', user.create);
router.post('/tracker/user/login', user.login);

//Bug item
router.post('/tracker/bug/create', bug.create);
router.post('/tracker/bug/update', bug.update);
router.get('/tracker/bug/delete/:id', bug.delete);
router.get('/tracker/bug/list/:user_id', bug.list);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
    return res.end();
    } else {
        return next();
    }
});
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
})); // to support JSON-encoded bodies
app.use('/', router);

app.listen(parseInt(serverPort, 10), function () {
    console.log("Static server running...");
})



