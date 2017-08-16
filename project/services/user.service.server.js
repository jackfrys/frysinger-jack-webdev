var app = require("../../express");

var users = [
    {_id: "1", username: "jack", password: "jack", role: "ADMIN"},
    {_id: "2", username: "parent", password: "parent", role: "PARENT", travelers: [3]},
    {_id: "3", username: "traveler", password: "traveler", role: "TRAVELER"}
];

// app.get("/api/project/login", getUserByCredentials);
// app.get("/api/project/user/:uid", getUserById);
// app.post("/api/project/user/:uid/addTraveler", addTraveler);
// app.get("/api/project/user/:uid/parent", getParent);
//
// function getUserByCredentials(req, res) {
//     var username = req.query.username;
//     var password = req.query.password;
//
//     for (var u in users) {
//         if (users[u].username == username && users[u].password == password) {
//             res.send(users[u]);
//         }
//     }
// }
//
// function getUserById(req, res) {
//     var id = req.params.uid;
//
//     for (var u in users) {
//         if (users[u]._id == id) {
//             res.send(users[u]);
//         }
//     }
// }
//
// function addTraveler(req, res) {
//     var userId = req.params.uid;
//     var travelerId = req.query.travelerId;
//
//     for (var u in users) {
//         var t = users[u].travelers;
//         t.push(travelerId);
//     }
//
//     res.send(200);
// }
//
// function getParent(req, res) {
//     for (var u in users) {
//         for (var t in users[u].travelers) {
//             if (users[u].travelers[t] == req.params.uid) {
//                 res.send(users[u]._id);
//             }
//         }
//     }
// }

var passport      = require('passport');
var auth = authorized;
app.post  ('/api/project/login', passport.authenticate('local'), login);
app.post  ('/api/project/logout',         logout);
app.post  ('/api/project/register',       register);
app.post  ('/api/project/user',     auth, createUser);
app.get   ('/api/project/loggedin',       loggedin);
app.get   ('/api/project/user',     auth, findAllUsers);
app.put   ('/api/project/user/:id', auth, updateUser);
app.delete('/api/project/user/:id', auth, deleteUser);
function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};

var userModel = require("../../model/user/user.model.server.js")();
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials({username: username, password: password})
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
function serializeUser(user, done) {
    done(null, user);
}
function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}