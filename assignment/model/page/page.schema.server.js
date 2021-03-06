var mongoose = require("mongoose");
var pageSchema = mongoose.Schema({
    _website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website"
    },
    name: String,
    title: String,
    description: String,
    widgets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Widget"
    }],
    dateCreated: Date
}, {collection: "page"});
module.exports = pageSchema;