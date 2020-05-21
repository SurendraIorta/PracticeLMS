let chalk = require('chalk');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let routes = require('./routes');

require('./config/mongoose');//initializing mongoose

let config = require('./config/configdetails');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

/* CORS ISSUE */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,authorization,Content-Type,Access-Control-Request-Headers,enctype');

    // Set to true if you need the website to include cookies in  requests
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    }
    else {
        // Pass to next layer of middleware
        next();
    }
});
/* CORS */

app.use('/apidocs', express.static('apidocs'));
app.use('/uploads', express.static('uploads'));//Image folder

app.use('/', routes);
app.post('/callback', function (req, res) {
    console.log(req);
});


app.listen(config.port);

console.log(chalk.green('Server started on port : ' + config.port ));

module.exports = app;




// //Load HTTP module
// const http = require("http");
// const hostname = '127.0.0.1';
// const port = 3000;

// //Create HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {

//   //Set the response HTTP header with HTTP status and Content type
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// //listen for request on port 3000, and as a callback function have the port listened on logged
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });