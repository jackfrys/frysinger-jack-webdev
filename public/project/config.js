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
            .when("/login", {
                templateUrl: "views/login/login.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/relationships", {
                templateUrl: "views/relationships/relationships.view.client.html",
                controller: "RelationshipController",
                controllerAs: "model"
            })
            .when("/route/:rid", {
                templateUrl: "views/routes/routes.view.client.html",
                controller: "RouteEditController",
                controllerAs: "model"
            })
            .when("/explore", {
                templateUrl: "views/explore-mbta/stops.view.client.html",
                controller: "StopsController",
                controllerAs: "model"
            })
            .when("/explore/:sid", {
                templateUrl: "views/explore-mbta/stop.view.client.html",
                controller: "StopController",
                controllerAs: "model"
        })
    }
})();