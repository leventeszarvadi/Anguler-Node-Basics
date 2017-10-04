'use strict';

// Get process environment or set default environment to development

const http = require('http');
const express = require('express');
const config = require('../config/config');
const app = express();

app.set('config', config);
app.set('root', __dirname);

require('./config/express').init(app);


let routes = require('./config/routes');
routes.init(app);
require('./config/sequelize').init(app);



app.get('/status', (req, res) => {
    let result = {
        message: 'API is running.'
    };

    app.settings.sequelize
        .authenticate()
        .then(() => {
            result.database = 'Connection has been established successfully.';
            res.json(result);
        })
        .catch(err => {
            result.database = 'Unable to connect to the database: ' + err;
            res.json(result);
        });
});

/**
 * Start the app if not loaded by another module
 */
if (!module.parent) {
    // server = http.createServer(app);
    var server = app.listen(config.port || 3000, config.hostname || '0.0.0.0', () => {
        let addr = server.address();
        console.info('---');
        console.info('%s is running.', config.app.name);
        console.info('Hostname: %s', addr.address);
        console.info('Port: %s', addr.port);
        console.info('Access: %s', config.baseUrl);
        console.info('---');
    });
}

module.exports = app;