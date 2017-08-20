var app = require("../../express");
var mongoose = require("mongoose");
var routeModel = require("../model/route/route.model.server");
var um = require("../model/user/user.model.server");
var userModel = require("../model/relationship/relationship.model.server");
var auth = require("./user.service.server");

app.get("/api/project/routes", auth, routes);
app.post("/api/project/routes", auth, addRoute);
app.get("/api/project/route/:rid", route);
app.put("/api/project/routes", editRoute);

app.post("/api/project/markActive", auth, markActive);
app.delete("/api/project/route/del/:rid", deleteRoute);

app.get("/api/project/allroutes", function (req, res) {
    routeModel.allRoutes().then(function (r) {
        res.json(r);
    });
});

app.get("/api/project/publicroutes", publicRoutes);

function publicRoutes(req, res) {
    routeModel.publicRoutes().then(function (rs) {
        res.json(rs);
    });
}

function deleteRoute(req, res) {
    routeModel.deleteRoute(req.params.rid).then(function () {
        res.send(200);
    });
}

function markActive(req, res) {
    um.activeRoute(req.user.id, req.body).then(function () {
        res.send(200);
    });
}

function routes(req, res) {
    var user = req.user;

    if (user.role == "PARENT") {
        routeModel.routesForParent(user.id).then(function (routes) {
            res.json(routes);
        });
    } else if (user.role == "ADMIN") {
        routeModel.allRoutes().then(function (rs) {
            res.json(rs);
        });
    } else {

        userModel.relForTraveler(user.id).then(function (rels) {
            if (rels.length == 0) {
                res.json([]);
                return;
            }
            var parentId = rels[0].parent;
            routeModel.routesForParentChildren(parentId).then(function (ro) {
                res.json(ro);
            });
        });
    }
}

function addRoute(req, res) {
    var r = req.body;
    var u = req.user;
    r.parent = u.id;
    r.un = req.user.username;
    routeModel.addRoute(r).then(function () {
        res.send(200);
    });
}

function editRoute(req, res) {
    routeModel.updateRoute(req.body._id, req.body).then(function () {
        res.send(200);
    });
}

function route(req, res) {
    routeModel.routeForId(req.params.rid).then(function (r) {
        res.json(r);
    });
}