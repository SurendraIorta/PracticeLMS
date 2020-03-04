    /**
     * This file contains methods for Creating agent.
     * 
     * @param {*} req 
     * @param {*} res 
     * @author : Surendra Waso
     */

    let mongoose    = require('mongoose');
    let ObjectID    = mongoose.Types.ObjectId;
    
    let agentCollection =   require('./model');
    let agentPasswordCollection =   require('./../AgentLogin/model');
    let allMessages     =   require('./../../constantfiles/messages');

    /**
     * This method is used to create the Agent with the given details
     * @param {*} req 
     * @param {*} res 
     * @author : Surendra Waso(02 March 2020)
     */
    let createAgent  =   (req,res) =>{
        var allParams   =   req.body;

        console.log("allParams for creating agent = ",allParams);
        return new Promise((resolve,reject) => {
            if(allParams.Age > 60 && allParams.Age < 18){
                reject(allMessages.InvalidAge);
            }else if(!allParams.ManagerID){
                reject(allMessages.InvalidManagerId);
            }else if(!allParams.CreatedBy){
                reject(allMessages.InvalidCreatedBy);
            }else if(!allParams.ContactNumber || (allParams.ContactNumber.length !== 10)){
                reject(allMessages.InvalidContactNumber);
            }else if((allParams.OtherContactNumber.length !== 10)){
                reject(allMessages.InvalidContactNumber);
            }else resolve(null)
        }).then(()  =>{
            return agentCollection.findOne({"Email":allParams.Email});
        }).then((agentDetails) => {
            console.log("agentDetails",agentDetails);
            if(agentDetails){
                console.log("agentDetails3",agentDetails);
                throw allMessages.AgentMailExist;
            }else{
                console.log("agentDetails4",agentDetails);
                allParams.ManagerID = allParams.ManagerID.length > 5 ? ObjectID(allParams.ManagerID) : "";
                allParams.CreatedBy = allParams.CreatedBy.length > 5 ? ObjectID(allParams.CreatedBy) : "";
                allParams.UpdatedBy = allParams.CreatedBy;

                console.log("agentDetails1",agentDetails);
                return agentCollection.create(allParams);
            }            
        }).then((agent) => {
            let agentPasswdObj  =   {
                AgentID     :   agent.AgentID,
                Password    :   "Agent@123",
                CreatedBy   :   agent.CreatedBy,
                UpdatedBy   :   agent.UpdatedBy
            }
            return agentPasswordCollection.create(agentPasswdObj);
        }).then((agentPasswd) => {
            console.log("agentPasswd : ",agentPasswd);
            if(agentPasswd){
                res.status(200).json({status: true, message: "Success", data: agentPasswd });
            }
        }).catch((err)=>{
            res.status(400).json({status: false, message: err, data: null });
        });

    }

    module.exports      =   createAgent;