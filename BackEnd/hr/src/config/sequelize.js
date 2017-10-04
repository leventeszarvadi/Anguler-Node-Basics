'use strict';

const Sequelize = require('sequelize');
const config = require('../../config/config');


let sequelize=null;

module.exports.init = initSequelize;

function initSequelize(app) {
    if (app === null){
        sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
            host: config.mysql.host,
            dialect: config.mysql.name,
            port:config.mysql.port,
            define:{
                timestamps:false,
                underscored:true
            },
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },

            // SQLite only
            storage: 'path/to/database.sqlite'
        });
    }
    if (app) {
        app.set('sequelize', sequelize);
    }
    return sequelize;
}

