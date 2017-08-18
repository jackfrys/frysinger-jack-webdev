(function () {
    angular
        .module("MBTASafe")
        .controller("FollowController", FollowController);

    function FollowController($routeParams, $http) {
        var vm = this;
        var uid = $routeParams["uid"];

        $http.get("/api/project/user/follow/" + uid).then(function (u) {
            vm.user = u.data;
        }, function () {
            vm.user = {role:"UNAUTH"};
        });
    }
})();