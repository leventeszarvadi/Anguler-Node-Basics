var express=require('express');
var usersRollesRouter=express.Router();
var usersRollesController=require('./userRoleController');

var router = function (routerOptions){

    usersRollesRouter.route('/')
        .get(function (req,res) {
            usersRollesController.getAll()
                .then(function (result) {
                    res.json({
                        succes: true,
                        data: result
                    });
                })
                .catch(function (error) {
                    res.status(400);
                    res.json({
                        success: false,
                        data: error
                    });
                });
        })

    return usersRollesRouter;
};
module.exports=router;