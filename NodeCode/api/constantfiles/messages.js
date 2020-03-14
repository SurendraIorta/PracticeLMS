let mandatoryString =   " is mandatory.";
let invalidString   =   "Invalid value for ";

module.exports = {
    "InvalidMessages"           :   {
        "InvalidManagerId"      :   "ManagerId is not valid.",
        "InvalidCreatedBy"      :   "CreatedBy is not valid.",
        "InvalidAge"            :   "Age should be less than 60 and more than 18.",
        "InvalidContactNumber"  :   "Invalid contact number, please dont add 0 or country code.",
        "InvalidFirstName"      :   "Invalid First name, name should not have any space or special character. Minimum length 3 and maximum length 10",
        "InvalidMiddleName"     :   "Invalid Middle name, name should not have any space or special character. Minimum length 3 and maximum length 10",
        "InvalidLastName"       :   "Invalid Last name, name should not have any space or special character. Minimum length 3 and maximum length 10",
        "InvalidDateOfBirth"    :   "Date of birth should be less than today.",
        "UpdatedBy"             :   "UpdatedBy is not valid.",
        "OtherContactNumber"    :   "Invalid other contact number, please dont add 0 or country code.",
        "Email"                 :   "Please enter a valid Email.",
        "LeadID"                :   "Invalid LeadID, please check the LeadID.",
        "AllocatedTo"           :   "AllocatedTo is not a valid AgentId.",
        "AllocatedBy"           :   "AllocatedBy is not a valid AgentId.",
        "LeadType"              :   invalidString + "LeadType.",
        "Campaign"              :   invalidString + "Campaign.",
        "RefferedBy"            :   "Invalid LeadID for RefferedBy.",
        "Gender"                :   invalidString + "Gender.",
        "MaritalStatus"         :   invalidString + "MaritalStatus.",
        "Occupation"            :   invalidString + "Occupation",
        "Income"                :   invalidString + "Income",
        "Education"             :   invalidString + "Education",
        "Age"                   :   invalidString + "Age, Age should be in between 18 and 60.",
        "MeetingStatus"         :   invalidString + "MeetingStatus. Valid options -'Met','Not Met'.",
        "MeetingDate"           :   invalidString + "MeetingDate. Date should be today or upto 10 days in future from today.",
        "MeetingTime"           :   invalidString + "MeetingTime. Meeting time should be in between 8.00 AM and 8.00 PM.",
        "PolicySourced"         :   invalidString + "PolicySourced. Valid options -'Yes','No'.",
        "SelectedProduct"       :   invalidString + "SelectedProduct.",
        "PolicyNotSourcedReason":   invalidString + "PolicyNotSourcedReason.",
        "LeadCategory"          :   invalidString + "LeadCategory.",
        "NotMetReason"          :   invalidString + "NotMetReason." 
    },
    "MandatoryMessages"         :   {
        "MandatoryAgentID"      :   "AgentID" + mandatoryString,
        "MandatoryManagerID"    :   "ManagerID"+ mandatoryString,
        "MandatoryPassword"     :   "Password" + mandatoryString,
        "CreatedBy"             :   "CreatedBy" + mandatoryString,
        "UpdatedBy"             :   "UpdatedBy" + mandatoryString,
        "LeadType"              :   "LeadType" + mandatoryString,
        "Campaign"              :   "Campaign" + mandatoryString,
        "AllocatedTo"           :   "AllocatedTo" + mandatoryString,
        "AllocatedBy"           :   "AllocatedBy" + mandatoryString,
        "IsReferenceLead"       :   "IsReferenceLead" + mandatoryString,
        "RefferedBy"            :   "RefferedBy" + mandatoryString,
        "FirstName"             :   "FirstName" + mandatoryString,
        "LastName"              :   "LastName" + mandatoryString,
        "MiddleName"            :   "MiddleName" + mandatoryString,
        "ContactNumber"         :   "ContactNumber" + mandatoryString,
        "Gender"                :   "Gender" + mandatoryString,
        "DateOfBirth"           :   "DateOfBirth" + mandatoryString,
        "LeadID"                :   "LeadID" + mandatoryString,
        "Address1"              :   "Address1" + mandatoryString,
        "City"                  :   "City" + mandatoryString,
        "State"                 :   "State" + mandatoryString,
        "Country"               :   "Country" + mandatoryString,
        "MaritalStatus"         :   "MaritalStatus" + mandatoryString,
        "Occupation"            :   "Occupation"  + mandatoryString,
        "Income"                :   "Income" + mandatoryString,
        "Education"             :   "Education" + mandatoryString,
        "MeetingStatus"         :   "MeetingStatus" + mandatoryString,
        "MeetingDate"           :   "MeetingDate" + mandatoryString,
        "MeetingTime"           :   "MeetingTime" + mandatoryString,
        "PolicySourced"         :   "PolicySourced value" + mandatoryString,
        "SelectedProduct"       :   "SelectedProduct"  + mandatoryString,
        "PolicyNotSourcedReason":   "PolicyNotSourcedReason" + mandatoryString,
        "leadCategory"          :   "LeadCategory" + mandatoryString,
        "NotMetReason"          :   "NotMetReason" + mandatoryString


    },
    "AlreadyExistMessages"      :   {
        "AgentMailExist"        :   "Agent email already exist.",
        "LeadContactNumber"     :   "Contact number is already present, cannot create the lead.",
        "MeetingExist"          :   "Meeting already exist for this lead."
    },
    "SuccessMessages"           :   {
        "LoginSuccess"          :   "Login successful.",
        "AgentDetailsFound"     :   "Agent details found.",
        "AgentListFound"        :   "Agent list found."
    },
    "IncorrectMessages"         :   {
        "IncorrectPassword"     :   "Incorrect password.",
        "IncorrectAgentID"      :   "Incorrect AgentID.",
    },
    "OtherMessages"             :   {
        "NoAgentReporting"      :   "No agent foud reporting to this manager.",
        "NoContactChange"       :   "ContactNumber should not be changed.",
        "OCExists"              :   "OtherContactNumber already exists as other lead's ContactNumber."
    }
    


};