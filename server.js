var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(express.static(__dirname + '/public'));

require("./test/app");
require("./assignment/app.js");
require("./project/app.js");

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

port = process.env.PORT || 3000;
app.listen(port);