const SkillModel=require('./skillModel');

function getById(id) {
    return SkillModel.findById(id,{
            attributes:{
                // exclude:['personal_info_id']
            },
            include:[{
               // model:CursesModel
            }
            ]
        }
    );
}

function getAll(){
    return SkillModel.findAll({
        attributes:{
            //exclude:['ID','PERSONAL_INFOS_ID']
        },
        include:[
        ]
    });
}

function create(skill){
    return SkillModel.create(skill);
}

function update(skill,id){
    return SkillModel.update(skill,{where:{id:id}});
}

function deleteByObject(skill){
    return SkillModel.build(skill).destroy();
}

function deleteById(id){
    return SkillModel.destroy({where:{id:id}});
}


module.exports.getById=getById;
module.exports.create=create;
module.exports.update=update;
module.exports.deleteByObject=deleteByObject;
module.exports.deleteById=deleteById;
module.exports.getAll=getAll;