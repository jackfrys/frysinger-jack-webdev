var mongoose = require("mongoose");
var routeSchema = mongoose.Schema({
    route: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "Route"
    },
    place: String,
    action: String,
}, {collection: "route"});
module.exports = routeSchema;