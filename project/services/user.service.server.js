var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require("mongoose");
var app = require("../../express");

var userModel = require("../model/user/user.model.server");
var relModel = require("../model/relationship/relationship.model.server");

var auth = authorized;
app.post('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/logout', logout);
app.post('/api/project/register', register);
app.post('/api/project/user', auth, createUser);
app.get('/api/project/loggedin', loggedin);

app.get("/api/project/user", auth, getThisUser);
app.put("/api/project/user", auth, updateThisUser);
app.delete("/api/project/user", auth, deleteThisUser);
app.get("/api/project/relationships", auth, relationships);
app.post("/api/project/relationships", auth, newRelationship);
app.delete("/api/project/relationships/:rid", deleteRelationship);

app.get("/api/project/allusers", allusers);

app.post("/api/user/:uid", user);

app.get("/api/project/rels", function (req, res) {
    relModel.allRels().then(function (r) {
        res.json(r);
    })
});

module.exports = auth;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function allusers(req, res) {
    userModel.allUsers().then(function (re) {
        res.json(re);
    });
}

function user(req, res) {
    userModel.findUserById(req.params.uid).then(function (u) {
        res.json(u);
    });
}

function newRelationship(req, res) {
    relModel.addRelationship(req.user.id, req.body.uid).then(function () {
        res.send(200);
    })
}

function relationships(req, res) {
    if (req.user.role == "PARENT") {
        relModel.relForParent(req.user.id).then(function (rel) {
            res.json(rel);
        });
    } else {
        relModel.relForTraveler(req.user.id).then(function (rel) {
            res.json(rel);
        });
    }
}

function deleteRelationship(req, res) {
    relModel.deleteRel(req.params.rid).then(function (re) {
        res.send(200);
    });
}

function getThisUser(req, res) {
    userModel.findUserById(req.user.id).then(function (user) {
        res.json(user);
    });
}

function updateThisUser(req, res) {
    userModel.updateUser(req.body._id, req.body).then(function () {
        res.send(200);
    });
}

function deleteThisUser(req, res) {
    userModel.deleteUser(req.user.id).then(function () {
        res.send(200);
    });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
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
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function logout(req, res) {
    req.logOut();
    res.redirect("/project");
}

function register(req, res) {
    var newUser = req.body;

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

function createUser(req, res) {
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