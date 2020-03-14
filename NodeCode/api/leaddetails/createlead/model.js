const mongoose  = require('mongoose');
// const moment    = require('moment');
const ObjectID  = mongoose.Types.ObjectId;
const Schema    = mongoose.Schema;
const commonObj = require('./../../constantfiles/common').commonObj;

const today     =   new Date();
// console.log(commonObj.Campaign);
let leadDetails = new Schema({
    LeadID          :   {type:String,default:"LE"+today.getFullYear()+(today.getMonth() +1)+today.getDay()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds()},
    LeadInfo            : {
        LeadType        :   {type:String},
        Campaign        :   {type:String},
        AllocatedTo     :   {type:String,ref:'agentdetails'},
        AllocatedBy     :   {type:String,ref:'agentdetails'},
        AllocatedOn     :   {type:Date,default: Date.now()},
        IsReferenceLead :   Boolean,
        RefferedBy      :   {type:String,ref:'leaddetails'},
        LeadDisposition :   {type:String},
        LeadSubdisposition  :   String
    },
    PersonalInfo        :   {
        FirstName       :   String,
        LastName        :   String,
        MiddleName      :   String,
        ContactNumber   :   String,
        OtherContactNumber  :   String,
        Address1        :   String,
        Address2        :   String,
        Address3        :   String,
        City            :   String,
        State           :   String,
        Country         :   String,
        MaritalStatus   :   {type:String},
        Gender          :   {type:String},
        DateOfBirth     :   {type:Date},
        Age             :   {type:Number,min:18,max:60},
        Occupation      :   {type:String},
        Income          :   {type:String},
        Education       :   {type:String},
        Photo           :   {type:String}
    },
    MeetingInfo :   {
        MeetingDate     :   Date,
        MeetingTime     :   String,
        MeetingStatus   :   {type:String},
        NotMetReason    :   String,
        PolicySourced   :   {type:String},
        SelectedProduct :   {type:ObjectID,ref:'productoptions'},
        PolicyNotSourcedReason  :   {type:String},
        LeadCategory    :   {type:String}
    },
    FamilyInfo  :   {
        SpouseName          :   String,
        SpouseOcccupation   :   {type:String},
        SpouseDOB           :   Date,
        MarriageDate        :   Date,
        ChildOne            :   {
            Name            :   String,
            DOB             :   String,
            Gender          :   String
        },   
        ChildTwo            :   {
            Name            :   String,
            DOB             :   String,
            Gender          :   String
        },  
        ChildThree          :   {
            Name            :   String,
            DOB             :   String,
            Gender          :   String
        }        
    },
        CreatedBy:{type : String,ref:'agentdetails'},
        UpdatedBy:{type : String,ref:'agentdetails'}
},{
    timestamps: true,
    versionKey: false,
    strict: false
});

let leadDetailsModel = mongoose.model('leaddetails', leadDetails);

module.exports  =   leadDetailsModel;