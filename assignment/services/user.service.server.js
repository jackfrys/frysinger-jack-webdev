var app = require("../../express");

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.post("/api/user", createUser);
app.get("/api/user?username=username", findUserByUsername);
app.get("/api/user?username=username&password=password", findUserByCredentials);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function createUser(req, res) {
    var user = req.body;
    user._id = new Date().getTime() + "";
    users.push(user);
    res.send(user);
}

function findUserByUsername(req, res) {
    var username = req.query.username;

    for (var u in users) {
        if (users[u].username = username) {
            res.send(users[u]);
            return;
        }
    }

}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    for (var u in users) {
        var user = users[u];

        if (user.username == username && user.password == password) {
            res.send(user);
            return;
        }
    }

}

function findUserById(req, res) {
    var userId = req.params.userId;

    for (var u in users) {
        if (users[u]._id == userId) {
            res.send(users[u]);
            return;
        }
    }
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;

    for (var u in users) {
        if (users[u]._id == userId) {
            users[u] = user;
            return;
        }
    }
}

function deleteUser(req, res) {
    var user = req.params.userId;
    var newUsers = []

    for (var u in users) {
        if (users[u]._id != userId) {
            newUsers.push(users[u])
        }
    }

    users = newUsers;
}