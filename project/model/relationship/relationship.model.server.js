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

function addRelationship(parentId, travelerUsername) {
    return userModel.findOne({username:travelerUsername}).then(function (user) {
        return relModel.create({parent: parentId, traveler: user.id});
    });
}

function deleteRel(parentId, travelerId) {
    return relModel.findOneAndRemove({parent: mongoose.Schema.Types.ObjectId(parentId), traveler: mongoose.Schema.Types.ObjectId(travelerId)})
}

function relForParent(parentId) {
    return relModel.find({parent: mongoose.Schema.Types.ObjectId(parentId)});
}

function relForTraveler(travelerId) {
    return relModel.find({traveler: travelerId});
}

function allRels() {
    return relModel.find({});
}