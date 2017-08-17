var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require("mongoose");

var userModel = require("../model/user/user.model.server");
var app = require("../../express");

var auth = authorized;
// app.post('/api/project/login', passport.authenticate('local'), login);
app.post("/api/project/simpleLogin", simpleLogin);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.post('/api/project/user', auth, createUser);
app.get('/api/project/loggedin', loggedin);
app.get('/api/project/user', auth, findAllUsers);
app.get('/api/project/user/:uid', findUser);
app.put('/api/project/user/:id', auth, updateUser);
app.delete('/api/project/user/:id', auth, deleteUser);

var users = [
    {_id: "1", username: "jack", password: "jack", role: "ADMIN"},
    {_id: "2", username: "parent", password: "parent", role: "PARENT", travelers: [3]},
    {_id: "3", username: "traveler", password: "traveler", role: "TRAVELER"}
];

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function findUser(req, res) {
    userModel.findUserById(req.params.uid).then(function (user) {
        res.json(user);
    }, function () {
        res.json({});
    });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
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

function simpleLogin(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel.findUserByCredentials(username, password).then(function (user) {
        res.json(user._id);
    });
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function register(req, res) {
    var newUser = req.body;
    newUser.roles = ['student'];

    userModel
        .findUserByUsername(newUser.username)
        .then(
            function (user) {
                if (user) {
                    res.json(null);
                } else {
                    return userModel.createUser(newUser);
                }
            },
            function (err) {
                res.status(400).send(err);
            }
        )
        .then(
            function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            },
            function (err) {
                res.status(400).send(err);
            }
        );
}

function findAllUsers(req, res) {
    if (isAdmin(req.user)) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    } else {
        res.status(403);
    }
}

function deleteUser(req, res) {
    if (isAdmin(req.user)) {

        userModel
            .removeUser(req.params.id)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    } else {
        res.status(403);
    }
}

function updateUser(req, res) {
    res.send(200);
    return;
    var newUser = req.body;
    if (!isAdmin(req.user)) {
        delete newUser.roles;
    }
    if (typeof newUser.roles == "string") {
        newUser.roles = newUser.roles.split(",");
    }

    userModel
        .updateUser(req.params.id, newUser)
        .then(
            function (user) {
                return userModel.findAllUsers();
            },
            function (err) {
                res.status(400).send(err);
            }
        )
        .then(
            function (users) {
                res.json(users);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
}

function createUser(req, res) {
    res.send(200);
    return;
    var newUser = req.body;
    if (newUser.roles && newUser.roles.length > 1) {
        newUser.roles = newUser.roles.split(",");
    } else {
        newUser.roles = ["student"];
    }

    // first check if a user already exists with the username
    userModel
        .findUserByUsername(newUser.username)
        .then(
            function (user) {
                // if the user does not already exist
                if (user == null) {
                    // create a new user
                    return userModel.createUser(newUser)
                        .then(
                            // fetch all the users
                            function () {
                                return userModel.findAllUsers();
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                    // if the user already exists, then just fetch all the users
                } else {
                    return userModel.findAllUsers();
                }
            },
            function (err) {
                res.status(400).send(err);
            }
        )
        .then(
            function (users) {
                res.json(users);
            },
            function () {
                res.status(400).send(err);
            }
        )
}

function isAdmin(user) {
    if (user.roles.indexOf("admin") > 0) {
        return true
    }
    return false;
}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}