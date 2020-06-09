let express =   require('express');
let router  =   express.Router();

let getRefDetails       =   require('./controller');

router.post('/getreferencedetails',getRefDetails);

module.exports      =   router;