module.exports = {
    port : 3003,
    jwt: {
        secret: "SECRET_KEY",
        options: {expiresIn: 365 * 60 * 60 * 24} // 365 days
    },
    db : {
        mongo : {
            // uri:"mongodb://127.0.0.1:27017/practicelms",
            uri:"mongodb+srv://lmsdb:lmsDB@2020@practicelms-9zrk8.mongodb.net/practicelms?retryWrites=true&w=majority",
            options: {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                autoIndex: true,
                // user: '',
                // pass: '',
                socketTimeoutMS: 0,
                keepAlive: true,
                // reconnectTries: 30,
                useUnifiedTopology: true 
            }
        }
    }
}