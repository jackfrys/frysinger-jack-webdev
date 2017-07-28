var app = require("../express");

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
    page.websiteId = req.params.websiteId;
    page._id = new Date().getTime() + "";

    pages.push(page);
}

function findAllPagesForWebsite(req, res) {
    var ps = [];

    for (var p in pages) {
        var page = pages[p];
        if (page.websiteId == req.params.websiteId) {
            ps.push(page);
        }
    }

    res.send(ps);
}

function findPageById(req, res) {
    for (var p in pages) {
        if (pages[p]._id == req.params.pageId) {
            res.send(pages[p]);
            return;
        }
    }
}

function updatePage(req, res) {
    var newPage = req.body;

    for (var p in pages) {
        if (pages[p]._id == req.params.pageId) {
            newPage._id == req.params.pageId;
            pages[p] == newPage;
            return;
        }
    }
}

function deletePage(req, res) {
    var newPs = [];

    for (var p in pages) {
        if (pages[p]._id != req.params.pageId) {
            newPs.push(pages[p]);
        }
    }

    res.send(newPs);
}