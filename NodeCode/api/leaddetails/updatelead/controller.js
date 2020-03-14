let leadCollection          =   require('./../createlead/model');
let agentDetailsCollection  =   require('./../../agentdetails/createagent/model');
let commonFuncAndObj        =   require('./../../constantfiles/common').commonObj;
let allMessages             =   require('./../../constantfiles/messages');


let updateLeadPersonalDetails       =   (req,res)=>{

    let allParams       =   req.body;
    console.log(allParams);
    return new Promise((resolve,reject)=>{
        if(!allParams.LeadID){
            reject(allMessages.MandatoryMessages.LeadID);
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
        }else if(allParams.OtherContactNumber && !commonFuncAndObj.isValidMobile(allParams.OtherContactNumber)){
            reject(allMessages.InvalidMessages.OtherContactNumber);
        }else if(!allParams.Address1){
            reject(allMessages.MandatoryMessages.Address1);
        }else if(!allParams.City){
            reject(allMessages.MandatoryMessages.City);
        }else if(!allParams.State){
            reject(allMessages.MandatoryMessages.State);
        }else if(!allParams.Country){
            reject(allMessages.MandatoryMessages.Country);
        }else if(!allParams.MaritalStatus){
            reject(allMessages.MandatoryMessages.MaritalStatus);
        }else if(allParams.MaritalStatus && !commonFuncAndObj.isValidOption(allParams.MaritalStatus,commonFuncAndObj.MaritalStatus,"Description")){
            reject(allMessages.InvalidMessages.MaritalStatus);
        }else if(!allParams.Gender){
            reject(allMessages.MandatoryMessages.Gender);
        }else if(allParams.Gender && !commonFuncAndObj.isValidOption(allParams.Gender,commonFuncAndObj.Gender)){
            reject(allMessages.InvalidMessages.Gender);
        }else if(!allParams.DateOfBirth){
            reject(allMessages.MandatoryMessages.DateOfBirth);
        }else if(!allParams.Occupation){
            reject(allMessages.MandatoryMessages.Occupation);
        }else if(allParams.Occupation && !commonFuncAndObj.isValidOption(allParams.Occupation,commonFuncAndObj.Occupation,"Description")){
            reject(allMessages.InvalidMessages.Occupation);
        }else if(!allParams.Income){
            reject(allMessages.MandatoryMessages.Income);
        }else if(allParams.Income && !commonFuncAndObj.isValidOption(allParams.Income,commonFuncAndObj.Income,"Description")){
            reject(allMessages.InvalidMessages.Income);
        }else if(!allParams.Education){
            reject(allMessages.MandatoryMessages.Education);
        }else if(allParams.Education && !commonFuncAndObj.isValidOption(allParams.Education,commonFuncAndObj.Education,"Description")){
            reject(allMessages.InvalidMessages.Education);
        }else if(!allParams.UpdatedBy){
            reject(allMessages.MandatoryMessages.UpdatedBy);
        }else if(allParams.DateOfBirth ){
            let age =   commonFuncAndObj.getAgeOnDOB(allParams.DateOfBirth);
            if(age < 18 || age > 60 || isNaN(age)){
                reject(allMessages.InvalidMessages.Age);
            }else{
                allParams.Age   =   age;
                console.log("Valid params with Age - ","\n",allParams);
                resolve(null);
            }
        }else resolve(null)

    }).then(()=>{
        return agentDetailsCollection.find({"AgentID":allParams.UpdatedBy});
    }).then((UpdatedByAgent)=>{
        if(!UpdatedByAgent.length){
            throw allMessages.InvalidMessages.UpdatedBy;
        }else{
            return leadCollection.find({"PersonalInfo.ContactNumber":allParams.ContactNumber});
        }
    }).then((contactNumberDetails)=>{
        console.log("contactNumberDetails",contactNumberDetails);
        if(!contactNumberDetails.length){
            throw allMessages.OtherMessages.NoContactChange;
        }else if(allParams.OtherContactNumber){
            console.log("checking other.");
            return leadCollection.find({"PersonalInfo.ContactNumber":allParams.OtherContactNumber});
        }else{
            console.log("return true.")
            return ["true"];
        }
    }).then((otherContactNumberDetails)=>{
        console.log("received.",otherContactNumberDetails);
        if(!otherContactNumberDetails.length){
            throw allMessages.OtherMessages.OCExists;
        }else{
            return leadCollection.find({"LeadID":allParams.LeadID,"PersonalInfo.ContactNumber":allParams.ContactNumber});
        }
    }).then((leadDetails)=>{
        if(leadDetails.length === 0){
            throw allMessages.InvalidMessages.LeadID;
        }else{
            leadDetails                                 =    leadDetails[0];
            leadDetails.PersonalInfo.FirstName          =    allParams.FirstName;
            leadDetails.PersonalInfo.LastName           =    allParams.LastName;
            leadDetails.PersonalInfo.MiddleName         =    allParams.MiddleName;   
            leadDetails.PersonalInfo.ContactNumber      =    allParams.ContactNumber;    
            leadDetails.PersonalInfo.OtherContactNumber =    allParams.OtherContactNumber;
            leadDetails.PersonalInfo.Address1           =    allParams.Address1;
            leadDetails.PersonalInfo.Address2           =    allParams.Address2;
            leadDetails.PersonalInfo.Address3           =    allParams.Address3;
            leadDetails.PersonalInfo.City               =    allParams.City;
            leadDetails.PersonalInfo.State              =    allParams.State;
            leadDetails.PersonalInfo.Country            =    allParams.Country;
            leadDetails.PersonalInfo.MaritalStatus      =    allParams.MaritalStatus;
            leadDetails.PersonalInfo.Gender             =    allParams.Gender;
            leadDetails.PersonalInfo.DateOfBirth        =    allParams.DateOfBirth;
            leadDetails.PersonalInfo.Age                =    allParams.Age;
            leadDetails.PersonalInfo.Occupation         =    allParams.Occupation;
            leadDetails.PersonalInfo.Income             =    allParams.Income;
            leadDetails.PersonalInfo.Education          =    allParams.Education; 
            leadDetails.UpdatedBy                       =    allParams.UpdatedBy;
            console.log("before update",leadDetails);
            return leadCollection.findOneAndUpdate({"LeadID":allParams.LeadID},leadDetails);
        }
        
    }).then((updatedLead)=>{
        console.log("updatedLead ",updatedLead);
        if(!updatedLead){
            res.status(200).json({status : false, message : "Something went wrong", data : updatedLead})
        }
        else res.status(200).json({status : true, message : "Success", data : updatedLead});
    }).catch((err)=>{
        res.status(400).json({status : false, message : err,data : null});
    })

}


let updateMeetingInfo   =   (req,res) =>{
    var allParams       =   req.body;

    return new Promise((resolve,reject)=>{
        if(!allParams.LeadID){
            reject(allMessages.MandatoryMessages.LeadID);
        }else if(!allParams.MeetingStatus){
            reject(allMessages.MandatoryMessages.MeetingStatus);
        }else if(allParams.MeetingStatus && !commonFuncAndObj.isValidOption(allParams.MeetingStatus,commonFuncAndObj.MeetingStatus,"Description")){
            reject(allMessages.InvalidMessages.MeetingStatus);
        }else if(allParams.MeetingStatus == "Met" && !allParams.MeetingDate){
            reject(allMessages.MandatoryMessages.MeetingDate);
        }else if(allParams.MeetingStatus == "Met" && !allParams.MeetingTime){
            reject(allMessages.MandatoryMessages.MeetingTime);
        }else if(allParams.MeetingStatus == "Met" && !allParams.PolicySourced){
            reject(allMessages.MandatoryMessages.PolicySourced);
        }else if(allParams.MeetingStatus == "Met" && !commonFuncAndObj.isValidOption(allParams.PolicySourced,commonFuncAndObj.YesNoOption,"option")){
            reject(allMessages.InvalidMessages.PolicySourced);
        }else if(allParams.MeetingStatus == "Met" && allParams.PolicySourced == "Yes" && !allParams.SelectedProduct){
            reject(allMessages.MandatoryMessages.SelectedProduct);
        }else if(allParams.MeetingStatus == "Met" && allParams.PolicySourced == "No" && !allParams.PolicyNotSourcedReason){
            reject(allMessages.MandatoryMessages.PolicyNotSourcedReason);
        }else if(allParams.MeetingStatus == "Met" && allParams.PolicySourced == "No" && !commonFuncAndObj.isValidOption(allParams.PolicyNotSourcedReason,commonFuncAndObj.reasonForNoPolicyOptions,"type")){
            reject(allMessages.InvalidMessages.PolicyNotSourcedReason);
        }else if(!allParams.UpdatedBy){
            reject(allMessages.MandatoryMessages.UpdatedBy);
        }else if(allParams.MeetingStatus == "Not Met" && !allParams.NotMetReason){
            reject(allMessages.MandatoryMessages.NotMetReason);
        }else if(allParams.MeetingStatus == "Not Met" && !commonFuncAndObj.isValidOption(allParams.NotMetReason,commonFuncAndObj.lead_dis_notMet)){
            reject(allMessages.InvalidMessages.NotMetReason);
        }else resolve(null);

    }).then(()=>{
        
    }).catch((err)=>{
        res.status(400).json({status : false, message : err, data : null});
    })
}

module.exports          =   updateLeadPersonalDetails;