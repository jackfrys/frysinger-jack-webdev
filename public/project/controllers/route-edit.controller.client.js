(function () {
    angular
        .module("MBTASafe")
        .controller("RouteEditController", RouteEditController);

    function RouteEditController($http, $routeParams, $location) {
        var vm = this;
        var newR = $routeParams["rid"] == "new";

        vm.editRoute = editRoute;
        vm.addStep = addStep;

        if (newR) {
            vm.route = {steps:[{}, {}]};
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
    }
})();