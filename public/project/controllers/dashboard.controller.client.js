(function () {
    angular
        .module("MBTASafe")
        .controller("DashboardController", DashboardController);

    function DashboardController($http, $rootScope) {
        var vm = this;

        $http.get("/api/project/user").then(function (u) {
            vm.user = u.data;
        });

        $http.get("/api/project/routes").then(function (rs) {
            vm.routes = rs.data;
        });
    }
})();