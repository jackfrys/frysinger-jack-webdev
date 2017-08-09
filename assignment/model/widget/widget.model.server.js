var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("../database");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget.page = mongoose.Schema.Types.ObjectId(pageId);
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({page: mongoose.Schema.Types.ObjectId(pageId)});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.findOneAndUpdate({_id:widgetId}, {$set:widget});
}

function deleteWidget(widgetId) {
    return widgetModel.findOneAndRemove({_id:widgetId});
}

function reorderWidget(pageId, start, end) {
    
}