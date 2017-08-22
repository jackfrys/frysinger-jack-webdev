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

        function init() {
            $http.get("/api/project/stops").then(function (resp) {
                vm.stops = resp.data;
            });
        }
        init();

        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }

        function submit() {
            $location.path("/explore/" + vm.search);
        }

        function show(stop) {
            $location.path("/explore/" + stop.code);
        }
    }
})();