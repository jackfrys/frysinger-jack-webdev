var app = require("../../express");

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

function createWidget(req, res) {
    var widget = req.body;
    widget.pageId = req.params.pageId;
    wodget._id = new Date().getTime() + "";

    widgets.push(widget);
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    var wds = [];

    for (var w in widgets) {
        var wd = widgets[w];
        if (wd.pageId == pageId) {
            wds.push(wd);
        }
    }

    res.send(wds);
}

function findWidgetById(req, res) {
    for (var wd in widgets) {
        if (widgets[wd]._id == req.params.pageId) {
            res.send(widgets[wd])
            return;
        }
    }
}

function updateWidget(req, res) {
    var newWd = req.body;
    var wdId = req.params.widgetId;

    for (var w in widgets) {
        if (widgets[w]._id == wdId) {
            newWd._id == wdId;
            widgets[w] = newWd;
            return;
        }
    }
}

function deleteWidget(req, res) {
    var newWds = [];

    for (var w in widgets) {
        if (widgets[w] != res.params.widgetId) {
            newWds.push(widgets[w]);
        }
    }

    widgets = newWds;
}