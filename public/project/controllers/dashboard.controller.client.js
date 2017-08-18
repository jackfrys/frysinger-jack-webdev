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
        });

        $http.get("/api/project/routes").then(function (rs) {
            vm.routes = rs.data;
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