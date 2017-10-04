var express=require('express');
var jobApplyRouter=express.Router();
var jobApplyController=require('./job_applyController');

var router=function (routerOptions){

    jobApplyRouter.route('/')
        .post(function (req, res) {
            console.log("!!!!!!!!!!!!!!!QQQQQQQQQQQQQQQQQQQQQLassuk")
            jobApplyController.create(req.body)
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
    jobApplyRouter.route("/:id")
        .get((req,res)=>{
            jobApplyController.getAllJobApplies(req.params.id)
                .then(function(result){
                    res.json({
                        succes:true,
                        data:result
                    });
                })
                .catch(function(error){
                    res.status(400);
                    res.json({
                        success:false,
                        data:error
                    });
                });

        })
        .put((req,res)=>{
        jobApplyController.acceptOrDecline(req.params.id,req.body)
            .then(function(result){
                res.json({
                    succes:true,
                    data:result
                });
            })
            .catch(function(error){
                res.status(400);
                res.json({
                    success:false,
                    data:error
                });
            });

    });
    return jobApplyRouter;
};

module.exports=router;