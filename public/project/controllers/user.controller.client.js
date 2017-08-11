(function () {
    angular
        .module("MBTASafe")
        .controller("UserController", UserController);

    function UserController($routeParams, $http) {
        var vm = this;
        $http.get("/api/project/user/" + $routeParams["uid"]).then(function (user) {
            vm.user = user.data;
            $http.get("/api/project/user/" + vm.user._id + "/routes").then(function (routes) {
                vm.routes = routes.data;
            });

            $http.get("/api/project/user/" + vm.user._id + "/parent").then(function (re) {
                var p = re.data;
                $http.get("/api/project/user/" + p + "/routes").then(function (ro) {
                    vm.parentRoutes = ro.data;
                })
            })
        })
    }
})();