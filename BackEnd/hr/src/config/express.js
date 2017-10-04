const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');

module.exports.init = initExpress;

function initExpress(app) {

    app.use(expressValidator());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.disable('x-powered-by');

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    app.use(function(req, res, next) {
        // a simple object that holds resources for each request
        req.resources = req.resources || {};
        next();
    });
}