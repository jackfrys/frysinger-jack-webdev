(function () {
    angular
        .module("WebAppMaker")
        .service("UserService", UserService);
    
    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };

        return api;

        function createUser(user) {
            users.push(user);
        }
        
        function findUserById(userId) {
            for (var user in users) {
                if (user._id == userId) {
                    return user;
                }
            }
        }

        function findUserByUsername(username) {
            for (var user in users) {
                if (user.username == username) {
                    return user;
                }
            }
        }

        function findUserByCredentials(username, password) {
            for (var user in users) {
                if (user.username == username && user.password == password) {
                    return user;
                }
            }
        }
        
        function updateUser(userId, user) {
            var newUsers = [];

            for (var u in users) {
                if (user._id == userId) {
                    newUsers.push(user);
                } else {
                    newUsers.push(u);
                }
            }

            users = newUsers;
        }
        
        function deleteUser(userId) {
            var newUsers = [];

            for (var u in users) {
                if (user._id != userId) {
                    newUsers.push(u);
                }
            }

            users = newUsers;
        }

    }
})();