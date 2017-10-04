const JobsModel=require('./jobModel');
const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');
const SkillsModel=require('../skills/skillModel');
const UsersModel=require('../users/userModel');
const PersonalInfoModel=require('../personal_infos/personalInfoModel');
function getAll(){
    console.log("here a job allpies");


    return JobsModel.findAll({
        attributes:{
            //exclude:['name','SKILLs.description', 'SKILLs.job_requirements']
        },
        include:[{
            model: SkillsModel,
        },{
            model:UsersModel,
            include:[
                {
                    model:PersonalInfoModel
                }
            ]
        }]
    });
}

function getById(id) {
    return JobsModel.findById(id,{
        attributes:{
            //exclude:['name','SKILLs.description', 'SKILLs.job_requirements']
        },
        include:[{
            model: SkillsModel,
        },{
            model:UsersModel,
            include:[
                {
                    model:PersonalInfoModel
                }
            ]
        }
        ]
    });
}

function create(job){

    return new Promise(function (resolve, reject) {
        let requirements = job.requirements;
        JobsModel.create(job).then((createdJob) => {

            let job_requirements=sequelize.define('job_requirements',{
                SKILLS_ID:Sequelize.INTEGER,
                JOBS_ID:Sequelize.INTEGER
            });

            requirements.forEach((skill) => {
                job_requirements.create({
                    JOBS_ID:createdJob.id,
                    SKILLS_ID:skill.skillSelect
                });
            });
            resolve(createdJob);
        }).catch((err) => reject(err));
    })
}

function update(job,id){

    return new Promise(function (resolve, reject) {

        JobsModel.update(job,{where:{id:id}});
        let job_requirements=sequelize.define('job_requirements',{
            SKILLS_ID:Sequelize.INTEGER,
            JOBS_ID:Sequelize.INTEGER
        });
        let requirements=job.requirements;

        job_requirements.findAll({
            where:{
                JOBS_ID:id
            }
        }).then((result)=>{
            result.forEach((skill)=>{
                let exist=false;
                requirements.forEach((reqSkill)=>{
                    if (skill.SKILLS_ID==reqSkill.skillSelect){
                        exist=true;
                        // break;
                    }
                });
                if(!exist)
                    job_requirements.destroy({where:{id:skill.id}});
            });
        });



        job_requirements.findAll({
            where:{
                JOBS_ID:id
            }
        }).then((result)=>{

            requirements.forEach((skill)=>{
                let exist=false;

                result.forEach((tableSkill)=>{
                    if(tableSkill.dataValues.SKILLS_ID==skill.skillSelect){
                        exist=true;

                        //break;
                    }
                });
                if (!exist){
                    job_requirements.create({
                        JOBS_ID:id,
                        SKILLS_ID:skill.skillSelect
                    });
                }
            })
        })
    });
}

function deleteByObject(user){
    return JobsModel.build(user).destroy();
}

function deleteById(id){
    return JobsModel.destroy({where:{id:id}});
}

module.exports.getAll=getAll;
module.exports.getById=getById;
module.exports.create=create;
module.exports.update=update;
module.exports.deleteByObject=deleteByObject;
module.exports.deleteById=deleteById;
