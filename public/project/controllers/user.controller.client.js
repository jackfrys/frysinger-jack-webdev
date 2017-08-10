(function () {
    angular
        .module("MBTASafe")
        .controller("UserController", UserController);

    function UserController($routeParams, $http) {
        $http.get("/api/user/" + $routeParams["uid"]).then(function (user) {
            vm.user = user.body;
        })
    }
})();