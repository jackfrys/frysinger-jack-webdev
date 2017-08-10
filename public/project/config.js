(function () {
    angular
        .module("MBTASafe")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/:stopId", {
                templateUrl: "views/stop.view.client.html",
                controller: "StopController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user.view.client.html",
                controller: "UserController",
                controllerAs: "model"
            })
    }
})();