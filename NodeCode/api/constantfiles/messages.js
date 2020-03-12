let mandatoryString =   " is mandatory.";

module.exports = {
    "InvalidMessages"           :   {
        "InvalidManagerId"      :   "ManagerId is not valid.",
        "InvalidCreatedBy"      :   "CreatedBy is not valid.",
        "InvalidAge"            :   "Age should be less than 60 and more than 18.",
        "InvalidContactNumber"  :   "Invalid contact number, please dont add 0 or country code.",
        "InvalidFirstName"      :   "Invalid First name, name should not have any space or special character.",
        "InvalidMiddleName"     :   "Invalid Middle name, name should not have any space or special character.",
        "InvalidLastName"       :   "Invalid Last name, name should not have any space or special character.",
        "InvalidDateOfBirth"    :   "Date of birth should be less than today.",
        "UpdatedBy"             :   "UpdatedBy is not valid.",
        "OtherContactNumber"    :   "Invalid other contact number, please dont add 0 or country code.",
        "Email"               :   "Please enter a valid Email."
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
        "DateOfBirth"           :   "DateOfBirth" + mandatoryString

    },
    "AlreadyExistMessages"      :   {
        "AgentMailExist"        :   "Agent email already exist.",
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
        "NoAgentReporting"      :   "No agent foud reporting to this manager."
    }
    


};