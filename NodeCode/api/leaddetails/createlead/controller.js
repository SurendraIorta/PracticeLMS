let leadCollection          =   require('./model');
let agentDetailsCollection  =   require('./../../agentdetails/createagent/model');
let commonFuncAndObj        =   require('./../../constantfiles/common').commonObj;
let allMessages             =   require('./../../constantfiles/messages');


let createNewLead       =   (req,res)=>{

    let allParams       =   req.body;
    console.log(allParams);
    return new Promise((resolve,reject)=>{
        if(!allParams.LeadType){
            reject(allMessages.MandatoryMessages.LeadType);
        }else if(allParams.LeadType && !commonFuncAndObj.isValidOption(allParams.LeadType,commonFuncAndObj.leadTypeOptions)){
            reject(allMessages.InvalidMessages.LeadType);
        }else if(!allParams.Campaign){
            reject(allMessages.MandatoryMessages.Campaign);
        }else if(allParams.Campaign && !commonFuncAndObj.isValidOption(allParams.Campaign,commonFuncAndObj.Campaign)){
            reject(allMessages.InvalidMessages.Campaign);
        }else if(!allParams.AllocatedTo){
            reject(allMessages.MandatoryMessages.AllocatedTo);
        }else if(!allParams.AllocatedBy){
            reject(allMessages.MandatoryMessages.AllocatedBy);
        }else if(!allParams.IsReferenceLead && allParams.IsReferenceLead !== false){
            reject(allMessages.MandatoryMessages.IsReferenceLead);
        }else if(allParams.IsReferenceLead && !allParams.RefferedBy){
            reject(allMessages.MandatoryMessages.RefferedBy);
        }else if(!allParams.FirstName){
            reject(allMessages.MandatoryMessages.FirstName);
        }else if(!allParams.LastName){
            reject(allMessages.MandatoryMessages.LastName);
        }else if(!allParams.MiddleName){
            reject(allMessages.MandatoryMessages.MiddleName);
        }else if(!allParams.ContactNumber){
            reject(allMessages.MandatoryMessages.ContactNumber);
        }else if(allParams.ContactNumber && !commonFuncAndObj.isValidMobile(allParams.ContactNumber)){
            reject(allMessages.InvalidMessages.InvalidContactNumber);
        }else if(!allParams.Gender){
            reject(allMessages.MandatoryMessages.Gender);
        }else if(allParams.Gender && !commonFuncAndObj.isValidOption(allParams.Gender,commonFuncAndObj.Gender)){
            reject(allMessages.InvalidMessages.Gender);
        }else if(!allParams.DateOfBirth){
            reject(allMessages.MandatoryMessages.DateOfBirth);
        }else resolve(null)

    }).then(()=>{
        return agentDetailsCollection.find({"AgentID":allParams.AllocatedBy});
    }).then((allocatedByAgent)=>{
        if(!allocatedByAgent.length){
            throw allMessages.InvalidMessages.AllocatedBy;
        }else{
            return agentDetailsCollection.find({"AgentID":allParams.AllocatedTo});
        }
    }).then((allocatedToAgent)=>{
        if(!allocatedToAgent.length){
            throw allMessages.InvalidMessages.AllocatedTo;
        }else if(allParams.IsReferenceLead){
            return leadCollection.find({"LeadID":allParams.RefferedBy});
        }else return null; 
    }).then((referenceLeadDetails)=>{
        if(allParams.IsReferenceLead && !referenceLeadDetails.length){
            throw allMessages.InvalidMessages.RefferedBy;
        }else return leadCollection.find({"PersonalInfo.ContactNumber":allParams.ContactNumber});
    }).then((leadDetails)=>{
        if(leadDetails.length !==0){
            throw allMessages.AlreadyExistMessages.LeadContactNumber;
        }else{
            let leadDetails =   {
                "LeadInfo"  :   {
                    "LeadType"        :   allParams.LeadType,
                    "Campaign"        :   allParams.Campaign,
                    "AllocatedTo"     :   allParams.AllocatedTo,
                    "AllocatedBy"     :   allParams.AllocatedBy,
                    "IsReferenceLead" :   allParams.IsReferenceLead,
                    "RefferedBy"      :   allParams.RefferedBy
                },
                "PersonalInfo"        : {
                    "FirstName"       :   allParams.FirstName,
                    "LastName"        :   allParams.LastName,
                    "MiddleName"      :   allParams.MiddleName,
                    "ContactNumber"   :   allParams.ContactNumber,
                    "Gender"          :   allParams.Gender,
                    "DateOfBirth"     :   allParams.DateOfBirth
                },
                CreatedBy   :   allParams.AllocatedBy,
                UpdatedBy   :   allParams.AllocatedBy
            }
            return leadCollection.create(leadDetails);
        }
        
    }).then((createdLead)=>{
        res.status(200).json({status : true, message : "Success", data : createdLead});
    }).catch((err)=>{
		console.log(err);
        res.status(400).json({status : false, message : err,data : null});
    })

}

module.exports          =   createNewLead;