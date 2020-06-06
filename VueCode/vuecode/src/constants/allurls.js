
var baseURL             =   "http://localhost:3003";
var allUrlList          =   {
    "agentLogin"            :   baseURL +   "/agentdetails/agentlogin",
    "getAgentDetails"       :   baseURL +   "/agentdetails/getagentdetails",
    "getReportingAgentList" :   baseURL +   "/agentdetails/getreportingagentlist"
}

var allUrls =   {
     getURL :   function(urlName){
        return allUrlList[urlName];
    }
}

module.exports = allUrls;