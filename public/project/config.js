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
    }
})();