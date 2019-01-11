const express = require('express');
const bodyParser = require('body-parser');
//const environment = require('./../src/environments/environment');
const cors = require('express-cors');
const app = express();
const PORT = 6180;//environment.production ? 6180 : 8000;

app.use(cors({
    allowedOrigins: [
        'cmann.org', 'localhost', 'http://localhost:4200', 'localhost:6180'
    ]
}));

app.listen(PORT, () => {
    console.log('Server started on',PORT);
});
app.use(bodyParser.json());

app.get('/api/authbros/*',(req, res) => {
    let times = req.params.split ? req.params.split('/') : req.params[0].split('/');
    let thresh = 142;
    let t0 = times[0];
    let t1 = times[1];
    let t2 = times[2];
    let t3 = times[3];
    let result = {message: '', title: '', log: ''};
    if ( t0 > thresh/2 && t1 > thresh && t3 > thresh/2 && t2 > thresh/2 &&
         Math.abs(3.4 * t0 - t1) <= thresh &&
         Math.abs(1.3 * t1 - t2) <= thresh &&
         Math.abs(t0 - t3) <= thresh) {
          result.message = "Hail Thee Brother";
          result.title = "BRINGING FUN BACK 2019";
          result.log = "We Hail Thee Brother!!";
    }

    res.send(result);
});