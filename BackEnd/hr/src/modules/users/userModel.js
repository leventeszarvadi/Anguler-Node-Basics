const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');
const UsersRolesModel=require('../user_roles/userRoleModel');
const JobsModel=require('../jobs/jobModel');
const JobAppliesModel=require('../job_applies/job_applyModel');
const UsersModel =sequelize.define('USERS',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    user_login_date:{
        type: Sequelize.DATE,
        allowNull:false,
    },
    user_roles_id:{
        type: Sequelize.INTEGER,
        field: "USER_ROLES_ID",
        allowNull: false,
        references: {
            model: UsersRolesModel,
            key: 'ID'
        }
    }
});

UsersRolesModel.hasMany(UsersModel,{
    foreignKey:'USER_ROLES_ID'
})
UsersModel.belongsTo(UsersRolesModel,{
    foreignKey:'USER_ROLES_ID'

});



UsersModel.belongsToMany(JobsModel, {
    through: JobAppliesModel,
    foreignKey:'USERS_ID',
    onDelete:'cascade'
});
JobsModel.belongsToMany(UsersModel, {
    through: JobAppliesModel,
    foreignKey:'JOBS_ID',
    onDelete:'cascade'
});

/*

UsersModel.belongsToMany(JobsModel,{
    through:'job_applies',
    foreignKey:'USERS_ID',
    onDelete:'cascade'
});

JobsModel.belongsToMany(UsersModel,{
    through:'job_applies',
    foreignKey:'JOBS_ID',
    onDelete:'cascade'
});

*/

module.exports = UsersModel;