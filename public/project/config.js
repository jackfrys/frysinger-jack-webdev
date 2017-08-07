(function () {
    angular
        .module("MBTASafe")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/:stopId", {
                templateUrl: "views/stop.view.client.html",
                controller: "StopController",
                controllerAs: "model"
            })
    }
})();