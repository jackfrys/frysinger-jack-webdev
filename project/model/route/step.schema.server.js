var mongoose = require("mongoose");
var routeSchema = mongoose.Schema({
    route: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "Route"
    },
    place: String,
    action: String,
    completed: {type: Boolean, default: false}
}, {collection: "route"});
module.exports = routeSchema;