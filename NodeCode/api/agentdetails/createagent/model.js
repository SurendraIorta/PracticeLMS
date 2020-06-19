const mongoose  = require('mongoose');
// const moment    = require('moment');
const ObjectID  = mongoose.Types.ObjectId;
const Schema    = mongoose.Schema;
const commonObj = require('./../../constantfiles/common');

const today     =   new Date();

let agentDetails    =   new Schema({
    AgentID         :   {type : String,required:true},
    FirstName       :   String,
    LastName        :   String,
    MiddleName        :   String,
    Gender          :   {type:String,enum:commonObj.Gender},
    ContactNumber   :   String,
    OtherContactNumber  :   String,
    Email           :   String,
    MaritalStatus   :   {type:String,enum:commonObj.MaritalStatus},
    PanNumber       :   String,
    Address1        :   String,
    Address2        :   String,
    Address3        :   String,
    City            :   String,
    State           :   String,
    Country         :   String,
    BranchName      :   String,
    Department      :   String,
    ManagerID       :   {type:String,ref:'agentdetails'},
    DateOfBirth     :   Date,
    Age             :   Number,
    Photo           :   String,
    Designation     :   String,
    CreatedBy       :   {type:String,ref:'agentdetails'},
    UpdatedBy       :   {type:String,ref:'agentdetails'}
},{
    timestamps: true,
    versionKey: false,
    strict: false
});

let agentDetailsModel = mongoose.model('agentdetails', agentDetails);

module.exports  =   agentDetailsModel;
