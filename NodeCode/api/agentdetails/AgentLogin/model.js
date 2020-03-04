const mongoose  = require('mongoose');
// const moment    = require('moment');
const ObjectID  = mongoose.Types.ObjectId;
const Schema    = mongoose.Schema;
const commonObj = require('./../../constantfiles/common');

let agentPasswords      =   new Schema({
    AgentID     :   {type:String,ref:'agentdetails'},
    Password    :   String,
    CreatedBy   :   {type:String,ref:'agentdetails'},
    UpdatedBy   :   {type:String,ref:'agentdetails'}
},{
    timestamps: true,
    versionKey: false,
    strict: false
});

let agentPasswordsModel = mongoose.model('agentpasswords', agentPasswords);

module.exports  =   agentPasswordsModel;
