var mongoose = require("mongoose");
var googleSchema = mongoose.Schema({
    id: String,
    token: String
}, {collection: "google"});
module.exports = googleSchema;