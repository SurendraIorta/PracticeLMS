let leadCollection          =   require('./../createlead/model');
let agentDetailsCollection  =   require('./../../agentdetails/createagent/model');
let commonFuncAndObj        =   require('./../../constantfiles/common').commonObj;
let allMessages             =   require('./../../constantfiles/messages');


let getLeadList =   (req,res)=>{

    let allParams       =   req.body;
    console.log(allParams);

    return new Promise((resolve,reject)=>{
        if(!allParams.agentCode){
            reject("Agent code is mandatory.")
        }else{
            resolve(null);
        }
    }).then(()=>{
        let allocatedTo     =   allParams.agentCode;
        return agentDetailsCollection.find({AgentID:allocatedTo})
    }).then((allocatedAgent)=>{
        if(allocatedAgent.length > 0){
            return allocatedAgent[0];
        }else{
            throw "Agent code does not exist, please enter a valid agent code."
        }
    }).then(()=>{
        let allocatedTo     =   allParams.agentCode;
        return leadCollection.find({"LeadInfo.AllocatedTo" : allocatedTo});
    })
    .then((leadList)=>{
        if(leadList.length > 0){
            res.status(200).json({status : true, message : "Lead list for agent.", data : leadList})
        }else{
            res.status(200).json({status : false, message : "No lead allocated to you, please contact your manager.", data : leadList})
        }
    }).catch((err)=>{
        res.status(400).json({status : false, message : err, data : null});
    })

}

module.exports      =   getLeadList;