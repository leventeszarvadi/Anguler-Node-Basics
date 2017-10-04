var express=require('express');
var skillRouter=express.Router();
var skillController=require('./skillController')

var router = function (routerOptions){

    skillRouter.route('/')
        .post(function (req, res) {
            skillController.create(req.body)
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
        })
        .get(function (req ,res) {
                skillController.getAll()
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
            });

    skillRouter.route('/:id')
        .get( function (req ,res) {

            skillController.getById(req.params.id)
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
            skillController.deleteById(req.params.id)
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
            skillController.update(req.body,req.params.id)
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
    return skillRouter;
};
module.exports=router;