// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const _          = require('lodash');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8899;        // set our port
const token = '3b48a662-8d39-43af-9770-db2d38b3d5a5'; //this is very temporary

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8899/api)
/*
Use this endpoint to pass the token using
header: Bearer [token]
 */
router.get('/', function(req, res) {
    // get the authorization token from the header
    if(req.headers['authorization'] && req.headers['authorization'] === `Bearer ${token}`){
        res.statusCode = 200;
    }else{
        res.statusCode = 401;
    }
    if(res.statusCode === 200){
        res.json({ message: 'Welcome to FarmStand API' });
    }

    if(res.statusCode === 401){
        res.json({ message: 'Unauthorized, Access Denied' });
    }

});
/*
use this end point to pass the username password pair. The pair must be encoded
in base64
 */
router.get('/validate', function(req, res) {
    // get the authorization token from the header

    if(req.headers['authorization']){
        //strip out the access pair
        const rePattern = new RegExp(/[^basic\s].*$/ig);
        const arrMatches = req.headers['authorization'].match(rePattern);
        if(Array.isArray(arrMatches)){
            //base64 decode
            const buffer = new Buffer(arrMatches[0], 'base64').toString("ascii")
            if(buffer === 'farmer:potatohead'){
                res.statusCode === 200;
                res.json({ data: new Buffer(token).toString('base64')});
            }else{
                res.statusCode === 401;
                res.json({ message: 'Unauthorized, Access Denied' })
            }
        }
    }
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on ' + port);
