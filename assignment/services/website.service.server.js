var app = require("../../express");
var websiteModel = require("../model/website/website.model.server");

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
    var userId = req.params.userId;

    websiteModel.createWebsiteForUser(userId, website).then(function () {
        res.send(200);
    });
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;

    websiteModel.findAllWebsitesForUser(userId).then(function (websites) {
        res.json(websites);
    });
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel.findWebsiteById(websiteId).then(function (website) {
        res.json(website);
    });
}

function updateWebsite(req, res) {
    var newWebsite = req.body;
    var id = req.params.websiteId;

    websiteModel.updateWebsite(id, newWebsite).then(function () {
        res.send(200);
    });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel.deleteWebsite(websiteId).then(function () {
        res.send(200);
    });
}