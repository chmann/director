let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const devPort = 8080;

//Initialize Data
const dbfile = fs.readFileSync('./db.json');
var db = JSON.parse(dbfile);
var stages = db.stages;

//Start Server
const app = express();
app.use(compression());
if(process.env.NODE_ENV === 'production') {
    // We are running in production mode - Enable SSL
    var options = {
        // pfx: fs.readFileSync('sslcert/cmann.pfx'),
        // passphrase: 'password'
    };
    var httpsServer = http.createServer(options,app).listen(8080, function(){
        console.log('server running 8080');
    });
} else {
    // We are running in development mode
    var httpServer = http.createServer(app).listen(devPort);
    console.log('dev server running ' + devPort);
}

//Server Configuration
app.all('*', function(req, res, next) {
    if(process.env.NODE_ENV === 'production') {
        //res.header("Access-Control-Allow-Origin", "https://www.godirector.org");
        res.header("Access-Control-Allow-Origin", "http://cmann.org");
    }
    else {
        res.header("Access-Control-Allow-Origin", "*");
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
    if (t0 > thresh/2 && t1 > thresh && t3 > thresh/2 && t2 > thresh/2 &&
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

app.get('/api/authvictory/*',(req, res) => {
    let times = req.params.split ? req.params.split('/') : req.params[0].split('/');
    let thresh = 42;
    let thresh1 = 142;
    let thresh2 = 42;
    //Tr-el-et 2 3 4 1 & 2
    //..0..1..2.3.4.5.6.7
    let t0 = parseInt(times[0]);
    let t1 = parseInt(times[1]);
    let t2 = parseInt(times[2]);
    let t3 = parseInt(times[3]);
    let t4 = parseInt(times[4]);
    let t5 = parseInt(times[5]);
    let t6 = parseInt(times[6]);
    let t7 = parseInt(times[7]);
    let result = {};
    let tavg = (t0 + t1 + t2) / 3;
    if (Math.abs(t0 - tavg) < thresh && Math.abs(t1 - tavg) < thresh &&
        Math.abs(t2 - tavg) < thresh &&
        t3 > 1.69 * t0 && t3 < 4.12 * t0 &&
        t4 > 1.69 * t1 && t4 < 4.12 * t1 &&
        t5 > 1.69 * t2 && t5 < 4.12 * t2
        ) {
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
        result.t0 = Math.abs(t0 - tavg);
        result.t1 = Math.abs(t1 - tavg);
        result.t2 = Math.abs(t2 - tavg);
        result.tavg = tavg;
        result.orig = [t0, t1, t2];
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
        message: s.message,
        creed: s.creed
    });
});

app.get('/api/Content/victory', middleware.checkToken, (req, res) => {
    let s = stages[1];
    res.json({
        success: true,
        type: 'TOP SECRET',
        message: s.message,
        creed: 'Congratulations on making it here! We will be taking back our world now. Hang on to something.\t\tPlaceholder.'
    });
});