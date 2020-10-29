const express = require('express');
const moment = require('moment');
const Redis = require('./lib/redis.js');

const app = express();

// include the mustache template engine for express
const mustacheExpress = require('mustache-express');

// registers the mustache engine with Express
app.engine("mustache", mustacheExpress());

// sets mustache to be the view engine
app.set('view engine', 'mustache');

// sets /views to be the /views folder
// files should have the extension filename.mustache
app.set('views', __dirname + '/views');

app.get('/dashboard', function(req, res) {

    let fakeTimestamp = (new Date());
    fakeTimestamp.setDate(fakeTimestamp.getDate() - 5);
    let newTimestamp = moment(fakeTimestamp).fromNow();

    const redis = new Redis();

    let statuses = redis.get_statuses();

    console.log(statuses);

    // create an object of data for our template
    let data = {
        title: "Dashboard",
        items: [
            {status: "OK", message: "Don't stop, never give up", timestamp: newTimestamp},
            {status: "OK", message: "Hold your head high and reach the top", timestamp: newTimestamp},
            {status: "ERROR", message: "Let the world see what you have got", timestamp: newTimestamp},
            {status: "OK", message: "Bring it all back to you", timestamp: newTimestamp},
        ]
    }

    // render the page mypage.mustache found under the /views folder
    res.render('dashboard', data);

});

app.get(/^(.+)$/, function(req,res) {
    console.log("static file request: " + req.params[0]);
    res.sendFile(__dirname + req.params[0]);
});

var server = app.listen(3000, function() {
  console.log("server listening...");
});
