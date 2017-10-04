'use strict';
const usersRouter = require('../modules/users/index')();
const personalInfoRouter = require('../modules/personal_infos/index')();
const usersRollesRouter = require('../modules/user_roles/index')();
const educationRouter=require('../modules/user_educations/index')();
const jobsRouter=require('../modules/jobs/index')();
const skillRouter=require('../modules/skills/index')();
const jobAppliesRouter=require('../modules/job_applies/index')();

module.exports.init = initRoutes;


function initRoutes(app) {
    app.use('/users', usersRouter);
    app.use('/personal-info',personalInfoRouter);
    app.use('/users-roles',usersRollesRouter);
    app.use('/education',educationRouter);
    app.use('/jobs',jobsRouter);
    app.use('/skills',skillRouter);
    app.use('/job-applies',jobAppliesRouter);
}

