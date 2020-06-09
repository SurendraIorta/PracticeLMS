let leadCollection          =   require('./../leaddetails/createlead/model');
let agentDetailsCollection  =   require('./../agentdetails/createagent/model');
let commonFuncAndObj        =   require('./../constantfiles/common').commonObj;
let allMessages             =   require('./../constantfiles/messages');


let getRefLeadDetails   = (req,res)=>{

    let allParams       =   req.body;
    console.log(allParams);

    return new Promise((resolve,reject)=>{
        if(!allParams.mobile){
            reject(allMessages.MandatoryMessages.ReferMobile);
        }else{
            resolve(null);
        }
    })
    .then(()=>{
        return leadCollection.findOne({"PersonalInfo.ContactNumber":allParams.mobile},{"PersonalInfo":true,"LeadID" :true});
    })
    .then((refLeadDetails)=>{
        if(refLeadDetails && refLeadDetails.length > 0){
            res.status(200).json({ status : false, message : "Reference lead found.", data : refLeadDetails});
        }else{
            res.status(200).json({ status : false, message : "No lead with given mobile.", data : []});
        }
    })
    .catch((err)=>{
        res.status(400).json({status : false, message : err, data : null});
    })

}


module.exports      =   getRefLeadDetails;