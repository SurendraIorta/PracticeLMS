/**
     * This file contains methods for Agent Login.
     * 
     * @param {*} req 
     * @param {*} res 
     * @author : Surendra Waso
     */

const agentLoginCollection  =   require('./model');
let mongoose                =   require('mongoose');
let ObjectID                =   mongoose.Types.ObjectId;

let allMesssages            =   require('./../../constantfiles/messages');

/**
     * This method is used to login by the Agent with the given details
     * @param {*} req 
     * @param {*} res 
     * @author : Surendra Waso(03 March 2020)
     */

     let agentLoginMethod   =   (req,res) => {
        var allParams       =   req.body;
        console.log("allParams ",allParams);

        return new Promise((resolve,reject) =>{
            if(!allParams.AgentID){
                reject("AgentID is mandatory.");
            }else if(!allParams.Password){
                reject("Password is mandatory.");
            }else{
                resolve(null);
            }
        }).then(()=>{
            return agentLoginCollection.findOne({"AgentID":allParams.AgentID});
        }).then((agentDetails)=>{
            console.log("agentDetails",agentDetails);
            if(agentDetails){
                console.log("in",agentDetails);
                if(agentDetails.Password === allParams.Password){
                    res.status(200).json({status : true, message : allMesssages.LoginSuccess,data : null});
                }else{
                    res.status(200).json({status : false,message : allMesssages.IncorrectPassword,data : null});
                }
            }else{
                console.log("out",agentDetails);
                res.status(200).json({status : false,message : allMesssages.IncorrectAgentID,data : null});
            }
        }).catch((err)=>{
            res.status(400).json({status: false, message: err, data: null });
        });
     } 

     module.exports =   agentLoginMethod;