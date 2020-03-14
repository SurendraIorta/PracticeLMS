var express =   require('express');
var router  =   express.Router();

let saveBase64Controller    =   require('./testsavebase64');

router.post('/savebase64file',saveBase64Controller);

module.exports  =   router;
