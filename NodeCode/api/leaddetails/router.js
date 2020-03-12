let express =   require('express');
let router  =   express.Router();

let createLeadController    =   require('./createlead/controller');

router.post('/createlead',createLeadController);

module.exports = router;