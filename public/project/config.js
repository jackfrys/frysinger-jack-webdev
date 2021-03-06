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
            .when("/route/follow/:uid", {
                templateUrl: "views/follow/follow.view.client.html",
                controller: "FollowController",
                controllerAs: "model"
            })
            .when("/explore", {
                templateUrl: "views/explore-mbta/stops.view.client.html",
                controller: "StopsController",
                controllerAs: "model"
            })
            .when("/explore/:stopId", {
                templateUrl: "views/explore-mbta/stop.view.client.html",
                controller: "StopController",
                controllerAs: "model"
            })
            .when("/gallery", {
                templateUrl: "views/route-gallery/route-gallery.html",
                controller: "RouteGalleryController",
                controllerAs: "model"
            })
            .when("/users", {
                templateUrl: "views/admin-users/all-users.html",
                controller: "AdminUsers",
                controllerAs: "model"
            })
            .when("/users/:uid", {
                templateUrl: "views/admin-users/admin-one-user.html",
                controller: "AdminOneUser",
                controllerAs: "model"
            })
    }
})();