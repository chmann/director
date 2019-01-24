let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const devPort = 6180;

//Initialize Data
const dbfile = fs.readFileSync('./db.json');
var db = JSON.parse(dbfile);
var stages = db.stages;

//Start Server
const app = express();

if(process.env.NODE_ENV === 'production') {
    // We are running in production mode - Enable SSL
    var options = {
        pfx: fs.readFileSync('sslcert/godirector.pfx'),
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
app.all('*', function(req, res, next) {
    if(process.env.NODE_ENV === 'production') {
        res.header("Access-Control-Allow-Origin", "https://www.godirector.org");
        //res.header("Access-Control-Allow-Origin", "https://www.cmann.org");
    }
    else {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    }
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

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
          let token = jwt.sign({username: 'stg'},
            config.secret,
            { expiresIn: '1h' // expires in 1 hour
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: s.message,title: s.title, log: s.log,
            token: token
          });
    }
    else {
        res.send(result);
    }
});

app.get('/api/test', middleware.checkToken, (req, res) => {
    res.json({
        success: true,
        message: 'You have a valid token!'
    });
});

app.get('/api/Content/bros', middleware.checkToken, (req, res) => {
    let s = stages[1];
    res.json({
        success: true,
        type: s.type,
        message: s.message
    });
});