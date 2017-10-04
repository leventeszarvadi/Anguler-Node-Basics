var express=require('express');
var personalInfoRouter=express.Router();
var personalInfoController=require('./personalInfoController');

var router=function (routerOptions){

    personalInfoRouter.route('/')
        .get(function (req,res) {
            personalInfoController.getAll()
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
        .post((req, res) => {
            personalInfoController.create(req.body)
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

    personalInfoRouter.route('/getAllName')
        .get(function (req,res) {
            console.log("!!!!Itt is jarok");
            personalInfoController.getAllName()
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

    personalInfoRouter.route('/user/:id')
        .get( function (req ,res) {
            console.log("!!!!!!!!!!!!!!!!!!!Jarok itt");
            personalInfoController.getUserProfileId(req.params.id)
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

    personalInfoRouter.route('/:id')
        .get( function (req ,res) {
            personalInfoController.getById(req.params.id)
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
            personalInfoController.deleteById(req.params.id)
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
            personalInfoController.update(req.body,req.params.id)
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




    return personalInfoRouter;
};

module.exports=router;