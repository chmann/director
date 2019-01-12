const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('express-cors');
const app = express();
const devPort = 6180;

//Initialize Data
const dbfile = fs.readFileSync('./db.json');
var db = JSON.parse(dbfile);
var stages = db.stages;

//Start Server
if(process.env.NODE_ENV === 'production') {
    // We are running in production mode - Enable SSL
    var options = {
        pfx: fs.readFileSync('sslcert/pvtkey.pfx'),
        passphrase: 'password'
    };
    var httpsServer = https.createServer(options,app).listen(8443, function(){
        console.log('server running 8443');
    });
} else {
    // We are running in development mode
    var httpServer = http.createServer(app).listen(devPort);
    console.log('dev server running ' + devPort);
}

//Server Configuration
app.use(cors({
    allowedOrigins: [
        'https://www.cmann.org', 'https://www.cmann.org:8443', 'localhost', 'http://localhost:4200', 'localhost:6180'
    ]
}));
app.use(bodyParser.json());

//Public API
app.get('/api/authbros/*',(req, res) => {
    let times = req.params.split ? req.params.split('/') : req.params[0].split('/');
    let thresh = 142;
    let t0 = times[0];
    let t1 = times[1];
    let t2 = times[2];
    let t3 = times[3];
    let result = {};
    if ( t0 > thresh/2 && t1 > thresh && t3 > thresh/2 && t2 > thresh/2 &&
         Math.abs(3.4 * t0 - t1) <= thresh &&
         Math.abs(1.3 * t1 - t2) <= thresh &&
         Math.abs(t0 - t3) <= thresh) {
          let s = stages[0];
          result = {message: s.message, title: s.title, log: s.log};
    }

    res.send(result);
});