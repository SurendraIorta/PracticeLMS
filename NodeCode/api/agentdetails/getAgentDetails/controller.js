let mongoose                =   require('mongoose');
let agentDetailsCollection  =   require('./../createagent/model');
let allMessages             =   require('./../../constantfiles/messages');
// let ObjectID                =   mongoose.Types.ObjectId;

let getAgentDetailsByAgentId       =   (req,res) =>{

    let allParams           =   req.params;

    return new Promise((resolve,reject) => {
        if(!allParams.AgentID){
            reject(allMessages.MandatoryMessages.MandatoryAgentID);
        }else{
            resolve(null)
        }
    }).then(()=>{
        return agentDetailsCollection.findOne({"AgentID":allParams.AgentID});
    }).then((agentDetails)=>{
        if(agentDetails){
            res.status(200).json({status : true, message : allMessages.SuccessMessages.AgentDetailsFound, data : agentDetails});
        }else{
            throw allMessages.IncorrectMessages.IncorrectAgentID;
        }
    }).catch((err) =>{
        res.status(400).json({status : false,message : err,data : null});
    })
};

let getAgentListByManagerID        =  (req,res)   =>  {
    let allParams           =   req.params;
    
    return new Promise((resolve,reject) => {
        if(!allParams.ManagerID){
            reject(allMessages.MandatoryMessages.MandatoryManagerID);
        }else resolve(null)
    }).then(()=>{
        return agentDetailsCollection.findOne({"AgentID" : allParams.ManagerID});
    }).then((agentDetails)=>{
        if(!agentDetails){
            throw allMessages.InvalidMessages.InvalidManagerId;
        }else{
            return agentDetailsCollection.find({"ManagerID":allParams.ManagerID});
        }
        
    }).then((reportingAgentList)=>{
        res.status(200).json({status : true,message : "Agent List",data : reportingAgentList});
    }).catch((err)=>{
        res.status(400).json({status : false, message : err, data : null});
    });
};

module.exports  =  {
    getAgentDetailsByAgentId : getAgentDetailsByAgentId,
    getAgentListByManagerID  : getAgentListByManagerID

}; 