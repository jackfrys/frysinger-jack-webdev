(function () {
    angular
        .module("MBTASafe")
        .controller("RouteEditController", RouteEditController);

    function RouteEditController($http, $routeParams, $location) {
        var vm = this;
        var newR = $routeParams["rid"] == "new";

        vm.editRoute = editRoute;
        vm.addStep = addStep;
        vm.deleteRoute = deleteRoute;

        vm.searchText = "";
        vm.stations = ["hi", "bye"];

        vm.logout = logout;
        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }

        if (newR) {
            vm.route = {steps: [{}, {}]};
        } else {
            $http.get("/api/project/route/" + $routeParams["rid"]).then(function (route) {
                vm.route = route.data;
            });
        }

        $http.get("/api/project/user").then(function (u) {
            vm.user = u.data;
        });

        function editRoute() {
            if (newR) {
                $http.post("/api/project/routes", vm.route).then(function () {
                    $location.path("/");
                })
            } else {
                if ($routeParams) {
                    $http.put("/api/project/routes", vm.route).then(function () {
                        $location.path("/");
                    });
                }
            }
        }

        function addStep() {
            vm.route.steps.push({});
        }

        function deleteRoute(route) {
            $http.delete("/api/project/route/del/" + $routeParams["rid"]).then(function () {
                $location.path("/")
            });
        }
    }
})();