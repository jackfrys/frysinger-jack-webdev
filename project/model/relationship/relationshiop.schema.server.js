var mongoose = require("mongoose");
var relSchema = mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    traveler: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    }
}, {collection: "relationship"});
module.exports = relSchema;