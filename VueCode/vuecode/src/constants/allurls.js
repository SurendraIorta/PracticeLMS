
var baseURL             =   "http://localhost:3003";
var allUrlList          =   {
    "createAgent"           :   baseURL +   "/agentdetails/createagent",
    "agentLogin"            :   baseURL +   "/agentdetails/agentlogin",
    "getAgentDetails"       :   baseURL +   "/agentdetails/getagentdetails",
    "getReportingAgentList" :   baseURL +   "/agentdetails/getreportingagentlist",


    "createNewLead"         :   baseURL +   "/leaddetails/createlead",
    "getRefLeadDetails"     :   baseURL +   "/refdetails/getreferencedetails"
}

var allUrls =   {
     getURL :   function(urlName){
        return allUrlList[urlName];
    }
}

module.exports = allUrls;