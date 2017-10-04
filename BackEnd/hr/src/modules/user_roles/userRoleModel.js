const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');

const Users_Roles =sequelize.define('USER_ROLES',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    description: {
        type: Sequelize.TEXT,
    }
});

module.exports=Users_Roles;