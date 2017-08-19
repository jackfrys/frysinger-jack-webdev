var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("../database");
var userModel = mongoose.model("ProjectUserModel", userSchema);
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.relationships = relationships;
userModel.activeRoute = activeRoute;
userModel.allUsers = allUsers;

module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.find({google:{id:googleId}});
}

function allUsers() {
    return userModel.find({});
}

function createUser(user) {
    return userModel.create({username:user.username, password:user.password, role:user.role});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username:username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username:username, password:password});
}

function updateUser(userId, user) {
    return userModel.update({_id:userId}, {$set:user});
}

function deleteUser(userId) {
    return userModel.findByIdAndRemove(userId);
}

function relationships(userId) {
    return userModel.findById(userId).populate("relationships");
}

function activeRoute(userId, route) {
    return userModel.findByIdAndUpdate(userId, {$set:{activeRoute:route}});
}