const allListOptions  =   {
    genderOptions   :  ["Male","Female","Other"],
    yesNoOptions    :  ["Yes","No"],
    campaignOptions: ["New Customer","Reference"],
    leadTypeOptions: ["New Customer", "Orphan Customer","Own Acquired Customer","Reference"],
    nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters.',
    ],
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
    ],
    mobileRules: [
        v => !!v || 'Mobile is required',
        v => (v && v.toString().length === 10) || 'Mobile number should be of 10 digits.',
        // v => /(6|7|8|9)\d{9}/.test(v) || 'Mobile number is not valid.'
    ],
    ageRules: [
        v => !!v || 'Age is required',
        v => (v && (v > 0 && v <= 60)) ||  'Age should not be more than 60.'
    ],
    userPhotoRules: [
        value => !value || value.size < 1000000 || 'Photo size should be less than 2 MB!',
        v=> v && v.type.includes("image") || "Please select an image file!",
    ],
    
    

}

module.exports  =   allListOptions;