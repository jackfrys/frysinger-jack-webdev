(function () {
    angular
        .module("MBTASafe")
        .controller("DashboardController", DashboardController);

    function DashboardController($http, $location) {
        var vm = this;

        vm.markActive = markActive;
        vm.markComplete = markComplete;
        vm.logout = logout;

        function init() {
            $http.get("/api/project/user").then(function (u) {
                vm.user = u.data;
            }, function () {
                vm.user = {role: "UNAUTH"};
            });

            $http.get("/api/project/routes").then(function (rs) {
                vm.routes = rs.data;

                for (var r in vm.routes) {
                    var route = vm.routes[r];
                    if (route.steps.length > 0) {
                        route.origin = route.steps[0].place;
                        route.destination = route.steps[route.steps.length - 1].place;
                    } else {
                        route.destination = "unknown destination";
                        route.origin = "unknown origin"
                    }
                }
            });
        }

        init();

        function markActive(route) {
            $http.post("/api/project/markActive", route).then(function () {
                vm.user.activeRoute = route;
                $location.path("/");
            });
        }

        function markComplete(step) {
            step.completed = !step.completed;
            $http.put("/api/project/user", vm.user);
        }

        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role: "UNAUTH"};
                $location.path("/");
            })
        }
    }
})();