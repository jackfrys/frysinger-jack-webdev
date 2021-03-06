var app = require("../../express");
var userModel = require("../model/user/user.model.server");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

app.post("/api/user", createUser);
app.get("/api/user", findUserByCredentials);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user).then(function (user) {
        res.json(user);
    });
}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var passwordProvided = req.query.hasOwnProperty("password");

    userModel.findUserByCredentials(username, password).then(function (user) {
        res.json(user);
    });
}

function findUserById(req, res) {
    var userId = req.params.userId;

    userModel.findUserById(userId).then(function (user) {
        res.send(user);
    })
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;

    userModel.updateUser(userId, user).then(function () {
        res.send(200);
    })
}

function deleteUser(req, res) {
    var user = req.params.userId;
    userModel.deleteUser(userId).then(function () {
        res.send(200);
    });
}