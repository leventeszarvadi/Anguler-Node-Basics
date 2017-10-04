const JobApplyModel=require('./job_applyModel');
const UsersModel=require('../users/userModel');
const PersonalInfoModel=require('../personal_infos/personalInfoModel');
function create(jobApplied){
    console.log(">>>>>>>>>>>>>>>>>erkezett keres",jobApplied);
    return JobApplyModel.create(jobApplied);
}


function getAllJobApllies(id){
    return JobApplyModel.findAll({
        where:{
            JOBS_ID:id
        },


    });
}

function acceptOrDecline(id,body){
    return JobApplyModel.update(body,{where:{id:id}});
}
module.exports.getAllJobApplies=getAllJobApllies;
module.exports.create=create;
module.exports.acceptOrDecline=acceptOrDecline;
