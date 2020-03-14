let mongoose    =   require('mongoose');
let Schema      =   mongoose.Schema;

let testBase64Schema  =   new Schema({
    photo   :   Buffer,
    name    :   String
});

let testBase64Collection    =   mongoose.model('testbase64',testBase64Schema);


let saveBase64File  =   (req,res)=>{
    var allParams   =   req.body;
    console.log(allParams)
    return new Promise((resolve,reject)=>{
        if(!allParams.name){
            reject("Name is mandatory.");
        }else resolve(null)
    }).then(()=>{
        console.log("Valid data")
        return testBase64Collection.create({
            name    : allParams.name,
            photo   :   allParams.photo
        })
    }).then((testBase64Result)=>{
        
        res.status(200).json({status : true, message : "Success", data : testBase64Result});
    }).catch((err)=>{
        res.status(400).status({status : false, message : err, data : null});
    })
}  

module.exports  =   saveBase64File;