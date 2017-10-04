var express=require('express');
var jobRouter=express.Router();
var jobController=require('./jobController');

var router=function (routerOptions){

    jobRouter.route('/')
        .get(function (req,res) {
            jobController.getAll()
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
        .post(function (req, res) {
            jobController.create(req.body)
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
    jobRouter.route('/:id')
        .get( function (req ,res) {
            jobController.getById(req.params.id)
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
            jobController.deleteById(req.params.id)
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
            jobController.update(req.body,req.params.id)
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
                });
        });
    return jobRouter;
};

module.exports=router;