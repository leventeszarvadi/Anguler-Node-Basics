const UserRollesModel=require('./userRoleModel');

function getAll(){
    return UserRollesModel.findAll();
}

module.exports.getAll=getAll;