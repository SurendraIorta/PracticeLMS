let express =   require('express');
let router  =   express.Router();

let createLeadController    =   require('./createlead/controller');
let getLeadListController   =   require('./getleadlist/controller');
let updatePersonalDetails   =   require('./updatelead/controller').updateLeadPersonalDetails;
let updateMeetingDetails     =   require('./updatelead/controller').updateMeetingInfo;
let updateFamilyDetails     =   require('./updatelead/controller').updateFamilyInfo;

router.post('/createlead',createLeadController);
router.post('/getleadlist',getLeadListController);
router.post('/updatepersonaldetails',updatePersonalDetails);
router.post('/updatemeetingdetails',updateMeetingDetails);
router.post('/updatefamilydetails',updateFamilyDetails);

module.exports = router;