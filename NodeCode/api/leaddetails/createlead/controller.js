let leadCollection      =   require('./model');
let commonFuncAndObj    =   require('./../../constantfiles/common').commonObj;
let allMessages         =   require('./../../constantfiles/messages');


let createNewLead       =   (req,res)=>{

    let allParams       =   req.body;
    console.log(allParams);
    return new Promise((resolve,reject)=>{
        if(!allParams.LeadType){
            reject(allMessages.MandatoryMessages.LeadType);
        }else if(!allParams.Campaign){
            reject(allMessages.MandatoryMessages.Campaign);
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
        }else if(!allParams.Gender){
            reject(allMessages.MandatoryMessages.Gender);
        }else if(!allParams.DateOfBirth){
            reject(allMessages.MandatoryMessages.DateOfBirth);
        }else resolve(null)

    }).then(()=>{
        return leadCollection.find({"PersonalInfo.ContactNumber":allParams.ContactNumber});
    }).then((leadDetails)=>{
        if(leadDetails.length !==0){
            throw "Contact number is already present, cannot create the lead."
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
                }
            }
            return leadCollection.create(leadDetails);
        }
        
    }).then((createdLead)=>{
        res.status(200).json({status : true, message : "Success", data : createdLead});
    }).catch((err)=>{
        res.status(400).json({status : false, message : err,data : null});
    })

}

module.exports          =   createNewLead;