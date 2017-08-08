var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var userSchema = require("./user.schema.server");
var db = require("./database");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = mongoose.model("UserModel", userSchema);

this.createWebsiteForUser = createWebsiteForUser;
this.findAllWebsitesForUser = findAllWebsitesForUser;
this.findWebsiteById = findWebsiteById;
this.updateWebsite = updateWebsite;
this.deleteWebsite = deleteWebsite;

function createWebsiteForUser(userId, website) {
    return userModel.findById(userId).then(function (user) {
        website.user = user;
        return websiteModel.create(website);
    })
}

function findAllWebsitesForUser(userId) {
    return userModel.findById(userId).populate("pages");
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return userModel.update({_id:userId}, {$set:user});
}

function deleteWebsite(websiteId) {
    return userModel.findOneAndRemove({_id:websiteId});
}