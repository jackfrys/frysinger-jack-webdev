var mongoose = require("mongoose");
var routeSchema = require("../route/route.schema.server");
var googleSchema = require("./google.schema.server");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    relationships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Traveler"
    }],
    dateCreated: {type: Date, default: Date.now()},
    activeRoute: {type: routeSchema, default: {}},
    google: googleSchema
}, {collection: "user"});
module.exports = userSchema;