const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');
const UsersModel=require('../users/userModel');
const SkillsModel=require('../skills/skillModel');
const UsersEducationsModel=require('../user_educations/userEducationModel');
const UsersWorkExperienceModel=require('../user_work_experiences/userWorkExperienceModel');
const CursesModel=require('../curses/curseModel');


const PersonalInfoModel =sequelize.define('PERSONAL_INFOS',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:true
    },
    city:{
        type:Sequelize.STRING,
        allowNull:true
    },
    country:{
        type:Sequelize.STRING,
        allowNull:true
    },
    address:{
        type:Sequelize.STRING,
        allowNull:true
    },
    github_ID:{
        type:Sequelize.STRING,
        allowNull:true
    },
    website:{
        type:Sequelize.STRING,
        allowNull:true
    },
    users_id: {
        type: Sequelize.INTEGER,
        field: "users_id",
        allowNull: false,
        references: {
            model: UsersModel,
            key: 'id'
        }
    }
});



//personal_infos <-> users
UsersModel.hasMany(PersonalInfoModel,{
    foreignKey:'USERS_ID',
    onDelete:'cascade'
});

PersonalInfoModel.belongsTo(UsersModel,{
    foreignKey:'USERS_ID',
    onDelete:'cascade'
});


//personal_infos <-> users_educations
UsersEducationsModel.belongsTo(PersonalInfoModel,{
    foreignKey:'PERSONAL_INFOS_ID',
    onDelete:'cascade',

})

PersonalInfoModel.hasMany(UsersEducationsModel,{
    foreignKey:'PERSONAL_INFOS_ID',
    onDelete:'cascade'
});



//personal_infos <-> users_work_experiences
UsersWorkExperienceModel.belongsTo(PersonalInfoModel,{
    foreignKey:'PERSONAL_INFOS_ID',
    onDelete:'cascade'
});

PersonalInfoModel.hasMany(UsersWorkExperienceModel,{
    foreignKey:'PERSONAL_INFOS_ID',
    onDelete:'cascade'
});


//personal_infos <-> skills

SkillsModel.belongsToMany(PersonalInfoModel,{
    through:'user_skills',
    foreignKey:'SKILLS_ID',
    onDelete:'cascade'
});

PersonalInfoModel.belongsToMany(SkillsModel,{
    through:'user_skills',
    foreignKey:'PERSONAL_INFOS_ID',
    onDelete:'cascade'
});

module.exports = PersonalInfoModel;