let leadCollection  =   require('./../createlead/model');
let allMessages     =   require('./../../constantfiles/messages');
let commonFuncAndObj    =   require('./../../constantfiles/common').commonObj;

let updateLead      =   (req,res) => {
    let allParams   =   req.body;

    console.log("allParams ",allParams);

    return new Promise((resolve,reject) => {

    }).catch((err)=>{
        res.status(400).json({status : false, message : err, data : null});
    })
}

module.exports      =   updateLead;