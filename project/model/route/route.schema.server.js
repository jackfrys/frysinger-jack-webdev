var mongoose = require("mongoose");
var stepSchema = require("./step.schema.server");
var routeSchema = mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    un: String,
    public: {type: Boolean, default: false},
    children: {type: Boolean, default: false},
    steps: [stepSchema],
    name: String
}, {collection: "route"});
module.exports = routeSchema;