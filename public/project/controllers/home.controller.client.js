(function () {
    angular
        .module("MBTASafe")
        .controller("HomeController", HomeController);

    function HomeController($http, $location) {
        var vm = this;
        vm.submit = submit;
        vm.search = "";

        $http.get("/api/stops").then(function (resp) {
            vm.stops = resp.data;
        });

        function submit() {
            $location.path(vm.search);
        }
    }
})();