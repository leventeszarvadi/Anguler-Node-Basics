const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');
const CursesModel=require('../curses/curseModel');
const PersonalInfoModel=require('../personal_infos/personalInfoModel');
const UserEducationModel =sequelize.define('USER_EDUCATIONS',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    institution:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    graduated_year:{
        type: Sequelize.DATE,
        allowNull:false,
    },
    description:{
        type: Sequelize.TEXT,
        allowNull:true
    },
    city:{
        type: Sequelize.STRING,
        allowNull:true
    },
    country:{
        type: Sequelize.STRING,
        allowNull:true
    },
    specialization:{
        type: Sequelize.STRING,
        allowNull:true
    },
    personal_infos_id:{
        type: Sequelize.INTEGER,
        field: "PERSONAL_INFOS_ID",
        allowNull: false,
        references: {
            model: PersonalInfoModel,
            key: 'ID'
        }
    }


});


/*
UserEducationModel.hasMany(CursesModel,{
    foreignKey:'USER_EDUCATIONS_ID'
});
CursesModel.belongsTo(UserEducationModel,{
    foreignKey:'USER_EDUCATIONS_ID'
});*/

module.exports = UserEducationModel;