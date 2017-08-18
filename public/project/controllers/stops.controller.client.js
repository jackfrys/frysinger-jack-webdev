(function () {
    angular
        .module("MBTASafe")
        .controller("StopsController", StopsController);

    function StopsController($http, $location) {
        var vm = this;
        vm.submit = submit;
        vm.search = "";
        vm.show = show;

        vm.logout = logout;
        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }

        $http.get("/api/project/stops").then(function (resp) {
            vm.stops = resp.data;
        });

        function submit() {
            $location.path(vm.search);
        }

        function show(stop) {
            $location.path(stop.code);
        }
    }
})();