var express = require('express');
var app = express();
var path = require('path');

//Use morgan logger for logging requests
var logger = require('morgan');
app.use(logger("dev"));

// Use body-parser for handling form submissions
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Sets up the backend server Port
var port = process.env.PORT || 4025;
app.listen(port, function () {
    console.log("App listening on PORT " + port);
});

var mongoose = require('mongoose');
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:/NYT_db";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)

/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
//allow the api to be accessed by other apps
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

//routes
app.get('/api/articles', function (req, res) {
})

app.post('/api/articles', function (req, res) {
})

app.delete('/api/articles', function (req, res) {
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
});
