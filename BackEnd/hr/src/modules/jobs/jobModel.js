const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');


const Jobs =sequelize.define('JOBS',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type: Sequelize.TEXT,
        allowNull:true
    },
    benefits:{
        type: Sequelize.STRING,
        allowNull:true
    },
    short_description:{
        type: Sequelize.STRING,
        allowNull:true,
        as:'shortDescription'
    }
});

module.exports = Jobs;