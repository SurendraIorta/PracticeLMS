let callDispoCollection     =   require('./model');
let leadCollection          =   require('./../leaddetails/createlead/model');
let agentCollection         =   require('./../agentdetails/createagent/model');
let commonFuncAndObj        =   require('./../constantfiles/common').commonObj;
let allMessages             =   require('./../constantfiles/messages');

let callDispoUpdate         =   (req,res)=>{

    let allParams      =    req.body;
    return new Promise((resolve,reject)=>{
        
        if(allParams.LeadID){
            reject(allMessages.MandatoryMessages.LeadID);
        }else if(allParams.CallDisposition){
            reject(allMessages.MandatoryMessages.CallDisposition);
        }else if(allParams.CallSubDisposition){
            reject(allMessages.MandatoryMessages.CallSubDisposition);
        }else if(allParams.CallDate){
            reject(allMessages.MandatoryMessages.CallDate);
        }else if(allParams.CallTime){
            reject(allMessages.MandatoryMessages.CallTime);
        }else if(allParams.CreatedBy){
            reject(allMessages.MandatoryMessages.CreatedBy);
        }else{
            resolve(null);
        }

    }).then(()=>{
        return agentCollection.find({"AgentID" : allParams.CreatedBy});
    }).then((agentDetails)=>{
        if(!agentDetails.length){
            throw allMessages.InvalidMessages.InvalidCreatedBy;
        }else{
            return leadCollection.find({"LeadID" : allParams.LeadID});
        }
    }).catch((err)=>{
        res.status(400).json({status : false, message : err, data : null});
    })

}
