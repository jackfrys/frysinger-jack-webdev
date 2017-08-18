(function () {
    angular
        .module("MBTASafe")
        .controller("DashboardController", DashboardController);

    function DashboardController($http, $location) {
        var vm = this;

        vm.markActive = markActive;
        vm.markComplete = markComplete;

        $http.get("/api/project/user").then(function (u) {
            vm.user = u.data;
        }, function () {
            vm.user = {role:"UNAUTH"};
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

        function markActive(route) {
            $http.post("/api/project/markActive", route).then(function () {
                $location.path("/");
            });
        }

        function markComplete(step) {
            step.completed = true;
            $http.put("/api/project/user", vm.user);
        }
    }
})();