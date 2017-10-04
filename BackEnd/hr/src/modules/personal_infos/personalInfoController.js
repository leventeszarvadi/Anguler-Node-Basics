const PersonalInfoModel=require('./personalInfoModel');
const UsersEducationsModel=require('../user_educations/userEducationModel');
const SkillsModel=require('../skills/skillModel');
const UserWorkExperinceModel=require('../user_work_experiences/userWorkExperienceModel');
const CursesModel=require('../curses/curseModel');
const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');

function getAll(){
    return PersonalInfoModel.findAll({
        attributes:{
            exclude:['ID','PERSONAL_INFOS_ID']
        },
        include:[{
            model:UsersEducationsModel
        },{
            model:SkillsModel
        },{
            model:UserWorkExperinceModel
        }
        ]
    });
}

function getAllName(){
    return PersonalInfoModel.findAll({
        attributes: ['id', 'firstname', 'lastname']
    });
}

function getById(id) {
    return PersonalInfoModel.findById(id,{
        attributes:{
            exclude:['ID','PERSONAL_INFOS_ID']
        },
        include:[{
            model:UsersEducationsModel
        },{
            model:SkillsModel
        },{
            model:UserWorkExperinceModel
        }


        ]
    });
}

function create(profil){
    return PersonalInfoModel.create(profil,{
        include:[{
            model:UsersEducationsModel
        },{
            model:UserWorkExperinceModel
        }
        ]
    });
}

function update(profile,id ){

    console.log("A kapott profil from controller", profile);
    return new Promise(function (resolve, reject) {

        PersonalInfoModel.update(profile,{where:{id:id}});
        UsersEducationsModel.destroy({where:{
            personal_infos_id:id
        }});

        profile.educations.forEach((education)=>{
            education.personal_infos_id = id;
            UsersEducationsModel.create(education);
        });

        UserWorkExperinceModel.destroy({where:{
            personal_infos_id:id
        }});


        profile.workExperience.forEach((work)=>{
            work.personal_infos_id=id;
            UserWorkExperinceModel.create(work);
        });

        let user_skills=sequelize.define('user_skills',{
            PERSONAL_INFOS_ID:Sequelize.INTEGER,
            SKILLS_ID:Sequelize.INTEGER
        });

        user_skills.destroy({where:{
            personal_infos_id:id
        }});


        profile.skills.forEach((skill)=>{

            let actualSkill={
                SKILLS_ID:skill.skillSelect,
                PERSONAL_INFOS_ID:id
            }
            console.log("actualskill",actualSkill);
            user_skills.create(actualSkill);
        });
        resolve(profile);
    });
}

function deleteByObject(user){
    return PersonalInfoModel.build(user).destroy();
}

function deleteById(id){
    return PersonalInfoModel.destroy({where:{id:id}});
}

function getUserProfileId(userId){
    console.log("PARAMTERRRRRRRRR",userId);
    return PersonalInfoModel.findOne({
        where:{
            users_id:userId
        },
        attributes:['id'],
    })
}
module.exports.getUserProfileId=getUserProfileId;
module.exports.getAll=getAll;
module.exports.getAllName=getAllName;
module.exports.getById=getById;
module.exports.create=create;
module.exports.update=update;
module.exports.deleteByObject=deleteByObject;
module.exports.deleteById=deleteById;