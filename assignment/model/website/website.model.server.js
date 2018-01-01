var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var userSchema = require("../user/user.schema.server");
var db = require("../database");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = mongoose.model("UserModel", userSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    return userModel.findById(userId).then(function (user) {
        website._user = mongoose.Schema.Types.ObjectId(userId);
        return websiteModel.create(website);
    })
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: mongoose.Schema.Types.ObjectId(userId)});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
    return websiteModel.findOneAndRemove({_id: websiteId});
}