const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');
const JobsModel=require('../jobs/jobModel');



const SkillsModel =sequelize.define('SKILLS',{
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
    }
});

//skill <-> jobs
SkillsModel.belongsToMany(JobsModel,{

    onDelete:'cascade',
    through:'job_requirements',
    foreignKey:'SKILLS_ID'
});

JobsModel.belongsToMany(SkillsModel,{
    through:'job_requirements',
    foreignKey:'JOBS_ID',
    onDelete:'cascade',
})

module.exports = SkillsModel;
