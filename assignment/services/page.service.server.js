var app = require("../../express");
var pageModel = require("../model/page/page.model.server");

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    pageModel.createPage(websiteId, page).then(function () {
        res.send(200);
    });
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;

    pageModel.findAllPagesForWebsite(websiteId).then(function (pages) {
        res.json(pages);
    });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    pageModel.findPageById(pageId).then(function (page) {
        res.json(page);
    });
}

function updatePage(req, res) {
    var pageId = req.params.pageId;

    pageModel.updatePage(pageId, req.body).then(function () {
        res.send(200);
    });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;

    pageModel.deletePage(pageId).then(function () {
        res.send(200);
    });
}