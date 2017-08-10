var app = require("../../express");

var users = [
    {_id: "1", username: "jack", password: "jack", role: "ADMIN"},
    {_id: "2", username: "parent", password: "parent", role: "PARENT"},
    {_id: "3", username: "traveler", password: "traveler", role: "TRAVELER"}
];

app.get("/api/login", getUserByCredentials);
app.get("/api/user/:uid", getUserById);

function getUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    for (var u in users) {
        if (users[u].username == username && users[u].password == password) {
            res.send(users[u]);
        }
    }
}

function getUserById(res, req) {
    var id = res.params.uid;

    for (var u in users) {
        if (users[u]._id == id) {
            res.send(users[u]);
        }
    }
}