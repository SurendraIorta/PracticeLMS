let mongoose        =   require('mongoose');
let Schema          =   mongoose.Schema();


let callDispositionSchema   =   new Schema({

    LeadID              :       String,
    CallDisposition     :       String,
    CallSubDisposition  :       String,
    CallDate            :       Date,
    CallTime            :       String,
    CreatedBy           :       {type:String,ref:'agentdetails'},
    UpdatedBy           :       {type:String,ref:'agentdetails'}
},{
    timestamps          :       true,
    strict              :       false,
    versionKey          :       false
})

let callDispositionModel    =   mongoose.model('calldispodetails',callDispositionSchema);
module.exports              =   callDispositionModel;