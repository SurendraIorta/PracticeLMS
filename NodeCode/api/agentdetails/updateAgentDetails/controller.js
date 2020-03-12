let agentDetailsCollecton   =   require('./../createagent/model');
let allMessages     =   require('./../../constantfiles/messages');
let commonDataAndFunc   =   require('./../../constantfiles/common').commonObj;


let updateAgentDetails  =   (req,res) =>{

    let allParams       =   req.body;
    
    console.log(allMessages.InvalidMessages.InvalidContactNumber);
    return new Promise((resolve,reject)=>{
        console.log("allParams",allParams);
        if(!allParams.AgentID){
            console.log("AgentID").
            reject(allMessages.MandatoryMessages.MandatoryAgentID);
        }else if(!allParams.UpdatedBy){
            console.log("UpdatedBy").
            reject(allMessages.MandatoryMessages.UpdatedBy);
        }else if(allParams.ContactNumber && (allParams.ContactNumber.length !== 10 || !commonDataAndFunc.isValidMobile(allParams.ContactNumber))){
            console.log(allMessages.InvalidMessages.InvalidContactNumber + " line 20");
            reject(allMessages.InvalidMessages.InvalidContactNumber);
        }else if(allParams.OtherContactNumber && (allParams.OtherContactNumber.length !== 10 || !commonDataAndFunc.isValidMobile(allParams.OtherContactNumber))){
            console.log(allMessages.InvalidMessages.InvalidContactNumber + " line 23");
            reject(allMessages.InvalidMessages.InvalidContactNumber);
        }else if(allParams.Email && !commonDataAndFunc.isValidEmail(allParams.Email)){
            console.log(allMessages.InvalidMessages.Email + " line 26");
            reject(allMessages.InvalidMessages.Email);
        }else {
            console.log( " line 29")
            resolve(null)
        }

    }).then(()=>{
        console.log("allParams",allParams.AgentID);
        return agentDetailsCollecton.findOne({"AgentID" : allParams.AgentID});
    }).then((agentDetails)=>{
        console.log("agent - ",agentDetails);
        if(!agentDetails){
            throw allMessages.IncorrectMessages.IncorrectAgentID;
        }else {
            return agentDetailsCollecton.findOne({"AgentID":allParams.UpdatedBy});
        }
    }).then((updateAgent)=>{
        console.log(updateAgent);
        if(!updateAgent){
            throw allMessages.InvalidMessages.UpdatedBy;
        }
        else {
            return agentDetailsCollecton.findOneAndUpdate({"AgentID": allParams.AgentID},allParams);
        } 
    }).then((updateDetails)=>{
        res.status(200).json({status : true, message : "Success", data : updateDetails});
    }).catch((err)=>{
        res.status(400).json({status : false,message : err ,data : null});
    });
} 


module.exports  =   updateAgentDetails;