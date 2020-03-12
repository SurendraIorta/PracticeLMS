let   express                   =   require('express');
let   router                    =   express.Router();   
const createAgentController     =   require('./createagent/controller');
const agentLoginController      =   require('./AgentLogin/controller');
const getAgentDetailController  =   require('./getAgentDetails/controller');
const updateAgentController     =   require('./updateAgentDetails/controller');

router.post('/createagent',createAgentController);
router.post('/agentlogin',agentLoginController);
router.get('/getagentdetails/:AgentID',getAgentDetailController.getAgentDetailsByAgentId);
router.get('/getreportingagentlist/:ManagerID',getAgentDetailController.getAgentListByManagerID);
router.post('/updateagentdetails',updateAgentController);

module.exports = router;