(function () {
    angular
        .module("MBTASafe")
        .service("UserService", UserService);

    function UserService($http) {

        var api = {
            allUsers: allUsers,
            logout: logout
        };

        return api;

        function allUsers() {
            return $http.get("/api/project/allusers");
        }

        function logout() {
            return $http.get("/api/project/logout");
        }

        function updateUser(uid, user) {
            return $http.put("/api/project/admin/user/" + uid, user);
        }
    }
});