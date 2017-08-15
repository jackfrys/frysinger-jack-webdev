(function () {
    angular
        .module("MBTASafe")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/dashboard/dashboard.client.html",
                controller: "DashboardController",
                controllerAs: "model"
            })
    }
})();