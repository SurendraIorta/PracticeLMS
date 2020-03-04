let express = require('express');
let router = express.Router();


// let UserRouter = require('../api/v1.0/users/route');
// router.use('/zenworkers', require('../api/v1.0/zenworkers/route'));

// var welcomePage =   require('./welcomepage');
// router.use('/',welcomePage);
router.use('/agentdetails',require('./api/agentdetails/router'));

module.exports = router;