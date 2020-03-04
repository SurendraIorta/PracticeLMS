let   express = require('express');
let   router = express.Router();   
const createAgentController =   require('./createagent/controller');
const agentLoginController  =   require('./AgentLogin/controller');

router.post('/createagent',createAgentController);
router.post('/agentlogin',agentLoginController);

module.exports = router;