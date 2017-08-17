var mongoose = require("mongoose");
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
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "user"});
module.exports = userSchema;