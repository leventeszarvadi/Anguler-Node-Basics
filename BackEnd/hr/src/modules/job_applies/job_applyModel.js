const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');


const JobAppliesModel =sequelize.define('JOB_APPLIES',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    jobs_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    users_id:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    accepted:{
        type:Sequelize.BOOLEAN,
    }
});

module.exports = JobAppliesModel;