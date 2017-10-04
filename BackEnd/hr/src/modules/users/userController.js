const UsersModel=require('./userModel');
const UsersRolesModel=require('../user_roles/userRoleModel');
const PersonalInfoModel=require('../personal_infos/personalInfoModel');


function getAll(){
    return UsersModel.findAll({
        attributes:{
            exclude:['ID','USER_ROLES_ID']
        },
        include:[{
            model: UsersRolesModel,
        }]
    });
}

function getById(id) {
    return UsersModel.findById(id,{
        attributes:{
            exclude:['ID','USER_ROLES_ID']
        },
        include:[{
            model:UsersRolesModel
        }]
    });
}

function create(body){

    let personalInfo=body.personalInfoDetail;
    let user=body.userDetail;



    return new Promise((resolve, reject) => {
        UsersModel.create(user).then((createdUser) => {
            personalInfo.users_id=createdUser.id;
            PersonalInfoModel.create(personalInfo);
            resolve(createdUser);
            });

    }).catch((err) => reject(err));


    /* UsersModel.afterCreate(user=>{
         personalInfo.users_id=user.id;
         PersonalInfoModel.create(personalInfo);
     });

     return UsersModel.create(user);*/
}

function update(user,id){
    return UsersModel.update(user,{where:{id:id}});
}

function deleteByObject(user){
    return UsersModel.build(user).destroy();
}

function deleteById(id){
    return UsersModel.destroy({where:{id:id}});

}

function verify(body){
    return UsersModel.findAll({
        where: {
            username: body.username,
            password: body.password
        }
    });
}

module.exports.getAll=getAll;
module.exports.getById=getById;
module.exports.create=create;
module.exports.update=update;
module.exports.deleteByObject=deleteByObject;
module.exports.deleteById=deleteById;
module.exports.verify=verify;
