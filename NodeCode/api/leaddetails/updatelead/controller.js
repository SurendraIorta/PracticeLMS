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
        }else if(allParams.MeetingStatus == "Met" && !allParams.LeadCategory){
            reject(allMessages.MandatoryMessages.leadCategory);
        }else if(allParams.MeetingStatus == "Met" && !commonFuncAndObj.isValidOption(allParams.LeadCategory,commonFuncAndObj.leadCategoryOptions,"type")){
            reject(allMessages.InvalidMessages.LeadCategory);
        }else if(allParams.MeetingStatus == "Not Met" && !allParams.NotMetReason){
            reject(allMessages.MandatoryMessages.NotMetReason);
        }else if(allParams.MeetingStatus == "Not Met" && !commonFuncAndObj.isValidOption(allParams.NotMetReason,commonFuncAndObj.lead_dis_notMet)){
            reject(allMessages.InvalidMessages.NotMetReason);
        }else resolve(null);

    }).then(()=>{
        return agentDetailsCollection.find({"AgentID":allParams.UpdatedBy});
    }).then((agentdetails)=>{
        if(!agentdetails.length){
            throw allMessages.InvalidMessages.UpdatedBy;
        }else return leadCollection.find({"LeadID":allParams.LeadID});
    }).then((leadDetails)=>{
        if(!leadDetails.length){
            throw allMessages.InvalidMessages.LeadID;
        }else if(leadDetails[0].MeetingInfo.MeetingDate > new Date()){
            throw allMessages.InvalidMessages.MeetingDate;
        }else{
            leadDetails                         =   leadDetails[0];
            leadDetails.MeetingInfo.MeetingStatus           =   allParams.MeetingStatus;
            leadDetails.MeetingInfo.NotMetReason            =   allParams.NotMetReason;
            leadDetails.MeetingInfo.PolicySourced           =   allParams.PolicySourced;
            leadDetails.MeetingInfo.SelectedProduct         =   allParams.SelectedProduct;
            leadDetails.MeetingInfo.PolicyNotSourcedReason  =   allParams.PolicyNotSourcedReason;
            leadDetails.MeetingInfo.LeadCategory            =   allParams.LeadCategory;
            return leadCollection.findOneAndUpdate({"LeadID":allParams.LeadID},leadDetails);
        }
    }).then((meetingUpdated)=>{
        if(!meetingUpdated){
            res.status(200).json({status : false,message : "Something went wrong",data : meetingUpdated});
        }else{
            res.status(200).json({status : true,message : "Success", data : meetingUpdated});
        }
    }).catch((err)=>{
        res.status(400).json({status : false, message : err, data : null});
    })
}

let updateFamilyInfo    =   (req,res) =>{
    let allParams       =   req.body;

    return new Promise((resolve,reject) =>{
        if(!allParams.LeadID){
            reject(allMessages.MandatoryMessages.LeadID);
        }else if(!allParams.UpdatedBy){
         reject(allMessages.MandatoryMessages.UpdatedBy);
        }else if(!allParams.SpouseName){
            reject(allMessages.MandatoryMessages.SpouseName);
        }else if(!allParams.SpouseOcccupation){
            reject(allMessages.MandatoryMessages.SpouseOcccupation);
        }else if(commonFuncAndObj.isValidOption(allParams.SpouseOcccupation,commonFuncAndObj.Occupation,"Description")){
            reject(allMessages.InvalidMessages.SpouseOcccupation);
        }else if(!allParams.SpouseDOB){
            reject(allMessages.MandatoryMessages.SpouseDOB);
        }else if(commonFuncAndObj.getAgeOnDOB(allParams.SpouseDOB) < 18){
            reject(allMessages.OtherMessages.SpouseAge);
        }else if(!allParams.MarriageDate){
            reject(allMessages.MandatoryMessages.MarriageDate);
        }else if(!allParams.NumberOfChildrens && allParams.NumberOfChildrens != 0){
            reject(allMessages.MandatoryMessages.NumberOfChildrens);
        }else if(allParams.NumberOfChildrens > 3){
            reject(allMessages.InvalidMessages.NumberOfChildrens);
        }else if(allParams.NumberOfChildrens > 0 && !allParams.ChildOne.Name){
            reject("ChildOne - " + allMessages.MandatoryMessages.ChildName);
        }else if(allParams.NumberOfChildrens > 0 && !allParams.ChildOne.DOB){
            reject("ChildOne - " + allMessages.MandatoryMessages.ChildDOB);
        }else if(new Date(allParams.ChildOne.ChildDOB) > new Date()){
            reject("ChildOne - " + allMessages.InvalidMessages.ChildDOB);
        }else if(allParams.NumberOfChildrens > 0 && !allParams.ChildOne.Gender){
            reject("ChildOne - " + allMessages.MandatoryMessages.ChildGender);
        }else if(allParams.NumberOfChildrens > 0 && !commonFuncAndObj.isValidOption(allParams.ChildOne.Gender,commonFuncAndObj.Gender)){
            reject("ChildOne - " + allMessages.InvalidMessages.ChildGender);
        }else if(allParams.NumberOfChildrens > 1 && !allParams.ChildTwo.Name){
                reject("ChildTwo - " + allMessages.MandatoryMessages.ChildName);
        }else if(allParams.NumberOfChildrens > 1 && !allParams.ChildTwo.DOB){
            reject("ChildTwo - " + allMessages.MandatoryMessages.ChildDOB);
        }else if(new Date(allParams.ChildTwo.ChildDOB) > new Date()){
            reject("ChildTwo - " + allMessages.InvalidMessages.ChildDOB);
        }else if(allParams.NumberOfChildrens > 1 && !allParams.ChildTwo.Gender){
            reject("ChildTwo" + allMessages.MandatoryMessages.ChildGender);
        }else if(allParams.NumberOfChildrens > 1 && !commonFuncAndObj.isValidOption(allParams.ChildTwo.Gender,commonFuncAndObj.Gender)){
            reject("ChildTwo - " + allMessages.InvalidMessages.ChildGender);
        }else if(allParams.NumberOfChildrens > 2 && !allParams.ChildThree.Name){
            reject("ChildThree - " + allMessages.MandatoryMessages.ChildName);
        }else if(allParams.NumberOfChildrens > 2 && !allParams.ChildThree.DOB){
            reject("ChildThree - " + allMessages.MandatoryMessages.ChildDOB);
        }else if(new Date(allParams.ChildThree.ChildDOB) > new Date()){
            reject("ChildThree - " + allMessages.InvalidMessages.ChildDOB);
        }else if(allParams.NumberOfChildrens > 2 && !allParams.ChildThree.Gender){
            reject("ChildThree - " + allMessages.MandatoryMessages.ChildGender);
        }else if(allParams.NumberOfChildrens > 2 && !commonFuncAndObj.isValidOption(allParams.ChildThree.Gender,commonFuncAndObj.Gender)){
            reject("ChildThree - " + allMessages.InvalidMessages.ChildGender);
        }else resolve(null);
        
        
    }).then(()=>{
        return agentDetailsCollection.find({"AgentID":allParams.UpdatedBy});
    }).then((agentdetails)=>{
        if(!agentdetails.length){
            throw allMessages.InvalidMessages.UpdatedBy;
        }else return leadCollection.find({"LeadID":allParams.LeadID});
    }).then((leadDetails) =>{
        if(!leadDetails.length){
            throw allMessages.InvalidMessages.LeadID;
        }else if(leadDetails[0].PersonalInfo.MaritalStatus == "Single"){
            leadDetails     =   leadDetails[0];
            leadDetails.FamilyInfo      = {
                "SpouseName"            :   "",
                "SpouseOcccupation"     :   "",
                "SpouseDOB"             :   "",
                "MarriageDate"          :   "",
                "NumberOfChildrens"     :   0,
                "ChildOne"              :   {
                    "Name"              :   "",
                    "DOB"               :   "",
                    "Gender"            :   ""
                },   
                "ChildTwo"              :   {
                    "Name"              :   "",
                    "DOB"               :   "",
                    "Gender"            :   ""
                },  
                "ChildThree"            :   {
                    "Name"              :   "",
                    "DOB"               :   "",
                    "Gender"            :   ""
                }        
            };

            return leadCollection.findOneAndUpdate({"LeadID" : allParams.LeadID},leadDetails);
        }else{
            leadDetails     =   leadDetails[0];
            leadDetails.FamilyInfo      = {
                "SpouseName"            :   allParams.SpouseName,
                "SpouseOcccupation"     :   allParams.SpouseOcccupation,
                "SpouseDOB"             :   allParams.SpouseDOB,
                "MarriageDate"          :   allParams.MarriageDate,
                "NumberOfChildrens"     :   allParams.NumberOfChildrens,
                "ChildOne"              :   {
                    "Name"              :   allParams.ChildOne.Name,
                    "DOB"               :   allParams.ChildOne.DOB,
                    "Gender"            :   allParams.ChildOne.Gender
                },   
                "ChildTwo"              :   {
                    "Name"              :   allParams.ChildTwo.Name,
                    "DOB"               :   allParams.ChildTwo.DOB,
                    "Gender"            :   allParams.ChildTwo.Gender
                },  
                "ChildThree"            :   {
                    "Name"              :   allParams.ChildTwo.Name,
                    "DOB"               :   allParams.ChildTwo.DOB,
                    "Gender"            :   allParams.ChildTwo.Gender
                }        
            };

            return leadCollection.findOneAndUpdate({"LeadID" : allParams.LeadID},leadDetails);
        }
    }).then((updatedLead)=>{
        if(!updatedLead){
            res.status(200).json({status : false, message : "Something went wrong.", data : updatedLead});
        }else{
            res.status(200).json({status : true, message : "Success", data : updatedLead});
        }
    }).catch((err)=>{
        res.status(400).json({status : false, message : err, data : null});
    })
}

module.exports          =   {updateLeadPersonalDetails,updateMeetingInfo,updateFamilyInfo};