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
app.put("/page/:pageId/widget", reorderWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.post("/api/upload", uploadImage);

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/'+filename;

    var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId;

    res.redirect(callbackUrl);
}

function createWidget(req, res) {
    var widget = req.body;
    widget.pageId = req.params.pageId;
    widget._id = new Date().getTime() + "";

    widgets.push(widget);
    res.send(widget);
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
        if (widgets[wd]._id == req.params.widgetId) {
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
            res.send(200);
            return;
        }
    }
}

function reorderWidget(req, res) {
    // separate widgets for page
    var page = [];
    var nonPage = [];

    for (var w in widgets) {
        var widget = widgets[w];
        if (widget.pageId == req.params.pageId) {
            page.push(widget);
        } else {
            nonPage.push(widget);
        }
    }

    // remove the moved widget
    var pageRemoved = [];
    var wid = undefined;
    for (var w in page) {
        var widget = page[w];
        if (w == req.query.initial) {
            wid = widget;
        } else {
            pageRemoved.push(widget);
        }
    }

    // insert back into widgets
    var sortedPage = [];
    for (var w in pageRemoved) {
        var widget = pageRemoved[w];
        if (w == req.query.final) {
            sortedPage.push(wid);
        }

        sortedPage.push(widget);
    }

    // add back to original
    for (var w in sortedPage) {
        nonPage.push(sortedPage[w]);
    }

    widgets = nonPage;
}

function deleteWidget(req, res) {
    var newWds = [];

    for (var w in widgets) {
        if (widgets[w]._id != req.params.widgetId) {
            newWds.push(widgets[w]);
        }
    }

    widgets = newWds;
    res.send(200);
}