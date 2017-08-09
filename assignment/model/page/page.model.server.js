var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var userSchema = require("./user.schema.server");
var pageSchema = require("./page.schema.server");
var db = require("../database");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = mongoose.model("UserModel", userSchema);
var pageModel = mongoose.model("PageModel", pageModel);
module.exports = pageModel;

this.createPage = createPage;
this.findAllPagesForWebsite = findAllPagesForWebsite;
this.findPageById = findPageById;
this.updatePage = updatePage;
this.deletePage = deletePage;

function createPage(websiteId, page) {

}

function findAllPagesForWebsite(websiteId) {

}

function findPageById(pageId) {

}

function updatePage(pageId, page) {

}

function deletePage(pageId) {

}