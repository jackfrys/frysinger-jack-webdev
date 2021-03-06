var mongoose = require("mongoose");
var routeSchema = require("./route.schema.server");
var db = require("../database");
var routeModel = mongoose.model("RouteModel", routeSchema);

routeModel.routesForParent = routesForParent;
routeModel.routesForParentChildren = routesForParentChildren;
routeModel.route = route;
routeModel.updateRoute = updateRoute;
routeModel.deleteRoute = deleteRoute;
routeModel.addRoute = addRoute;
routeModel.routeForId = routeForId;
routeModel.allRoutes = allRoutes;
routeModel.publicRoutes = publicRoutes;

function publicRoutes() {
    return routeModel.find({public: true});
}

function routesForParent(parentId) {
    return routeModel.find({parent: parentId});
}

function routesForParentChildren(parentId) {
    return routeModel.find({parent: parentId, children: true});
}

function route(routeId) {
    return routeModel.findById(routeId);
}

function updateRoute(routeId, route) {
    return routeModel.findByIdAndUpdate(routeId, {$set: route});
}

function deleteRoute(routeId) {
    return routeModel.findByIdAndRemove(routeId);
}

function addRoute(route) {
    return routeModel.create(route);
}

function routeForId(routeId) {
    return routeModel.findById(routeId);
}

function allRoutes() {
    return routeModel.find({});
}

module.exports = routeModel;