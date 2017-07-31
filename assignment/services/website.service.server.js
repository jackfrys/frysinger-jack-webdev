var app = require("../../express");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    website._id = new Date().getTime() + "";
    website.developerId = req.params.userId;

    websites.push(website);
}

function findAllWebsitesForUser(req, res) {
    var ws = [];

    for (var w in websites) {
        if (websites[w].developerId == req.params.userId) {
            ws.push(websites[w]);
        }
    }

    res.send(ws);
}

function findWebsiteById(req, res) {
    for (var w in websites) {
        var website = websites[w];
        if (website._id == req.params.websiteId) {
            res.send(website);
            return;
        }
    }
}

function updateWebsite(req, res) {
    var newWebsite = req.body;

    for (var w in websites) {
        if (websites[w]._id == req.params.websiteId) {
            newWebsite._id = req.params.websiteId;
            websites[w] = newWebsite;
            return;
        }
    }
}

function deleteWebsite(req, res) {
    var newWs = [];

    for (var w in websites) {
        if (websites[w]._id != req.params.websiteId) {
            newWd.push(websites[w]);
        }
    }

    websites = newWs;
}