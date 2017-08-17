var app = require("../../express");
var mongoose = require("mongoose");
var routeModel = require("../model/route/route.model.server");
var userModel = require("../model/relationship/relationship.model.server");
var auth = require("./user.service.server");

app.get("/api/project/routes", auth, routes);
app.post("/api/project/routes", auth, addRoute);

function routes(req, res) {
    var user = req.user;

    if (user.role == "PARENT") {
        routeModel.routesForParent(user.id).then(function (routes) {
            res.json(routes);
        });
    }

    userModel.relForTraveler(user.id).then(function (rels) {
        var parentId = rels[0].id;
        routeModel.routesForParentChildren(parentId).then(function (ro) {
            res.json(ro);
        });
    });
}

function addRoute(req, res) {
    var r = req.body;
    var u = req.user;
    r.parent = mongoose.Schema.Types.ObjectId(u.id);
    routeModel.createRoute(r).then(function () {
        res.send(200);
    });
}

function editRoute(req, res) {
    routeModel.updateRoute(req.body.id, req.body).then(function () {
        res.send(200);
    });
}