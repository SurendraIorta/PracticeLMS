let express =   require('express');
let router  =   express.Router();

let createLeadController    =   require('./createlead/controller');
let updatePersonalDetails   =   require('./updatelead/controller');

router.post('/createlead',createLeadController);
router.post('/updatepersonaldetails',updatePersonalDetails);

module.exports = router;