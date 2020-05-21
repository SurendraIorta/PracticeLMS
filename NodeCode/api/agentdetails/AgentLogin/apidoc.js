/**
 * @api {post} /agentdetails/agentlogin AgentLogin
 * @apiName AgentLogin
 * @apiGroup Agent
 * @apiDefine Agent
 * 
 *  
 * @apiHeader {String} x-access-token User login token.
 * 
 * @apiParamExample {json} Request-Example:
 *
{
        "AgentID"  : "A123456",
	    "Password" : "Agent123"
}
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "status": true,
    "message": "Login successful.",
    "data": null
} *
 * 
 * 
 */

