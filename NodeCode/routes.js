let express = require('express');
let router = express.Router();


// var welcomePage =   require('./welcomepage');
// router.use('/',welcomePage);
router.use('/agentdetails',require('./api/agentdetails/router'));
router.use('/leaddetails',require('./api/leaddetails/router'));


module.exports = router;