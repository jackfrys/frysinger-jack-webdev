var mongoose = require("mongoose");
var stepSchema = require("./step.schema.server");
var routeSchema = mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    public: {type: Boolean, default: false},
    children: {type: Boolean, default: false},
    steps: [stepSchema]
}, {collection: "route"});
module.exports = routeSchema;