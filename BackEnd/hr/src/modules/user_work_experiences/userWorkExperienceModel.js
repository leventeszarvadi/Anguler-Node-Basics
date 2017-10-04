const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');
const PersonalInfoModel=require('../personal_infos/personalInfoModel');
const UsersWorkExperience =sequelize.define('USER_WORK_EXPERIENCES',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    company_name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    position:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    start_date:{
        type: Sequelize.DATE,
        allowNull:false
    },
    end_date:{
        type: Sequelize.DATE,
        allowNull:false
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


module.exports = UsersWorkExperience;