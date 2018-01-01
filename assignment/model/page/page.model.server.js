var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("../database");
var pageModel = mongoose.model("PageModel", pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;

function createPage(websiteId, page) {
    page.websiteId = mongoose.Schema.Types.ObjectId(websiteId);
    return pageModel.create(page);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({websiteId: mongoose.Schema.Types.ObjectId(websiteId)});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.findOneAndUpdate({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel.findOneAndRemove({_id: pageId});
}