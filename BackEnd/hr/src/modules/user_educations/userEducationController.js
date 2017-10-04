const UsersEducationModel=require('./userEducationModel')
const CursesModel=require('../curses/curseModel');


function getById(id) {
    return UsersEducationModel.findById(id,{
            attributes:{
                // exclude:['personal_info_id']
            },
            include:[{
                model:CursesModel
            }
            ]
        }
        );
}

function create(userEducation){
    return UsersEducationModel.create(userEducation);
}

function update(userEducation,id){
    return UsersEducationModel.update(userEducation,{where:{id:id}});
}

function deleteByObject(userEducation){
    return UsersEducationModel.build(userEducation).destroy();
}

function deleteById(id){
    return UsersEducationModel.destroy({where:{id:id}});
}


module.exports.getById=getById;
module.exports.create=create;
module.exports.update=update;
module.exports.deleteByObject=deleteByObject;
module.exports.deleteById=deleteById;