const mongoose  = require('mongoose');
// const moment    = require('moment');
const ObjectID  = mongoose.Types.ObjectId;
const Schema    = mongoose.Schema;
const commonObj = require('./../constantfiles/common');

const today     =   new Date();

let leadDetails = new Schema({
    LeadInfo            : {
        LeadID          :   {type:String,default:"LE"+today.getFullYear()+today.getMonth()+today.getDay()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds()},
        LeadType        :   {type:String,enum:commonObj.LeadType},
        Campaign        :   {type:String,enum:commonObj.Campaign},
        AllocatedTo     :   {type:ObjectID,ref:'agentdetails'},
        AllocatedBy     :   {type:ObjectID,ref:'agentdetails'},
        AllocatedOn     :   {type:Date,default: Date.now()},
        IsReferenceLead :   Boolean,
        RefferedBy      :   {type:String,ref:'leaddetails'},
        LeadDisposition :   {type:String,enum:commonObj.lead_disposition},
        LeadSubdisposition  :   String
    },
    PersonalInfo        :   {
        FirstName       :   String,
        LastName        :   String,
        MiddleName      :   String,
        ContactNumber   :   Number,
        OtherContactNumber  :   Number,
        Address1        :   String,
        Address2        :   String,
        Address3        :   String,
        City            :   String,
        State           :   String,
        Country         :   String,
        MaritalStatus   :   {type:String,enum:commonObj.MaritalStatus},
        Gender          :   {type:String,enum:commonObj.Gender},
        DateOfBirth     :   {type:Date},
        Age             :   {type:Number},
        Occupation      :   {type:String,enum:commonObj.Occupation},
        Income          :   {type:String,enum:commonObj.Income},
        Education       :   {type:String,enum:commonObj.Education},
        Photo           :   {type:String}
    },
    MeetingInfo :   {
        MeetinDate      :   Date,
        MeetingTime     :   String,
        MeetingStatus   :   {type:String,enum:commonObj.MeetingStatus},
        PolicySourced   :   {type:String,enum:commonObj.YesNoOption},
        SelectedProduct :   {type:ObjectID,ref:'productoptions'},
        PolicyNotSourcedReason  :   {type:String,enum:commonObj.reasonForNoPolicyOptions},
        leadCategory    :   {type:String,enum:commonObj.leadCategoryOptions}
    },
    FamilyInfo  :   {
        SpouseName          :   String,
        SpouseOcccupation   :   {type:String,enum:commonObj.Occupation},
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
        CreatedBy,
        UpdatedBy
},{
    timestamps: true,
    versionKey: false,
    strict: false
});

let leadDetailsModel = mongoose.model('leaddetails', leadDetails);

module.exports  =   leadDetailsModel;