var express=require('express');
var educationRouter=express.Router();
var userEducationController=require('./userEducationController')

var router = function (routerOptions){

    educationRouter.route('/')
        .post(function (req, res) {
            console.log("Body here",req.body);
            userEducationController.create(req.body)
                .then(function (result){
                    res.json({
                        succes:true,
                        data:result
                    });
                })
                .catch(function (error){
                    res.status(400);
                    res.json({
                        success:false,
                        data:error
                    });
                });
        });
    educationRouter.route('/:id')
        .get( function (req ,res) {
            console.log("keres megerkezett");
            userEducationController.getById(req.params.id)
                .then(function (result){
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
        .delete(function (req,res){
            userEducationController.deleteById(req.params.id)
                .then(function(result){
                    res.json({
                        succes:true,
                        data:result
                    });

                })
                .catch(function (result) {
                    res.json({
                        succes:false,
                        data:error
                    });

                })

        })
        .put(function (req,res){
            console.log(req.body);
            userEducationController.update(req.body,req.params.id)
                .then(function(result){
                    res.json({
                        succes:true,
                        data:result
                    });

                })
                .catch(function (result) {
                    res.json({
                        succes:false,
                        data:error
                    });

                })
        })
    return educationRouter;
};
module.exports=router;