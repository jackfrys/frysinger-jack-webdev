var mongoose = require("mongoose");
var relSchema = require("./relationshiop.schema.server");
var db = require("../database");
var relModel = mongoose.model("RelModel", relSchema);
var userModel = require("../user/user.model.server");

relModel.addRelationship = addRelationship;
relModel.deleteRel = deleteRel;
relModel.relForParent = relForParent;
relModel.relForTraveler = relForTraveler;
relModel.allRels = allRels;
module.exports = relModel;

function addRelationship(parentId, travelerId) {
    return relModel.create({parent: parentId, traveler: travelerId});
}

function deleteRel(id) {
    return relModel.findByIdAndRemove(id);
}

function relForParent(parentId) {
    return relModel.find({parent: parentId});
}

function relForTraveler(travelerId) {
    return relModel.find({traveler: travelerId});
}

function allRels() {
    return relModel.find({});
}