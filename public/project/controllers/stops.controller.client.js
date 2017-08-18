(function () {
    angular
        .module("MBTASafe")
        .controller("StopsController", StopsController);

    function StopsController($http, $location) {
        var vm = this;
        vm.submit = submit;
        vm.search = "";
        vm.show = show;

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