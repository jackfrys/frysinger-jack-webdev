var app = require("../../express");

var users = [
    {_id: "1", username: "jack", password: "jack", role: "ADMIN"},
    {_id: "2", username: "parent", password: "parent", role: "PARENT", travelers: [3]},
    {_id: "3", username: "traveler", password: "traveler", role: "TRAVELER"}
];

app.get("/api/project/login", getUserByCredentials);
app.get("/api/project/user/:uid", getUserById);
app.post("/api/project/user/:uid/addTraveler", addTraveler);
app.get("/api/project/user/:uid/parent", getParent);

function getUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    for (var u in users) {
        if (users[u].username == username && users[u].password == password) {
            res.send(users[u]);
        }
    }
}

function getUserById(req, res) {
    var id = req.params.uid;

    for (var u in users) {
        if (users[u]._id == id) {
            res.send(users[u]);
        }
    }
}

function addTraveler(req, res) {
    var userId = req.params.uid;
    var travelerId = req.query.travelerId;

    for (var u in users) {
        var t = users[u].travelers;
        t.push(travelerId);
    }

    res.send(200);
}

function getParent(req, res) {
    for (var u in users) {
        for (var t in users[u].travelers) {
            if (users[u].travelers[t] == req.params.uid) {
                res.send(users[u]._id);
            }
        }
    }
}