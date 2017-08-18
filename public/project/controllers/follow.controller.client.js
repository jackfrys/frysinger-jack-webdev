(function () {
    angular
        .module("MBTASafe")
        .controller("FollowController", FollowController);

    function FollowController($routeParams, $http) {
        var vm = this;
        var uid = $routeParams["uid"];

        vm.logout = logout;
        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }

        $http.get("/api/project/user/follow/" + uid).then(function (u) {
            vm.user = u.data;
        }, function () {
            vm.user = {role:"UNAUTH"};
        });
    }
})();