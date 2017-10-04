var express=require('express');
var usersRouter=express.Router();
var usersController=require('./userController');

var router = function (routerOptions){

    usersRouter.route('/')
        .get(function (req,res) {
            usersController.getAll()
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
            console.log("Body here",req.body);
            usersController.create(req.body)
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
    usersRouter.route('/:id')
        .get( function (req ,res) {
            usersController.getById(req.params.id)
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
            usersController.deleteById(req.params.id)
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
            console.log("Keres itt!!!!!!!<<<<<<<<<<<<<",req.body);
            usersController.update(req.body,req.params.id)
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
    });
    usersRouter.route('/login')
        .post(function (req, res) {
            console.log("Loginba",req.body);
            usersController.verify(req.body)
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
    return usersRouter;
};
module.exports=router;