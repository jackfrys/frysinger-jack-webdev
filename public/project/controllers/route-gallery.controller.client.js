(function () {
    angular
        .module("MBTASafe")
        .controller("RouteGalleryController", RouteGalleryController);

    function RouteGalleryController($http) {
        var vm = this;

        $http.get("/api/project/publicroutes").then(function (rs) {
            vm.routes = rs.data;

            for (var r in vm.routes) {
                var rt = vm.routes[r];
                if (rt.steps.length > 0) {
                    rt.origin = rt.steps[0].place;
                    rt.destination = rt.steps[rt.steps.length - 1].place;
                }
            }
        });

        vm.logout = logout;
        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }
    }
})();