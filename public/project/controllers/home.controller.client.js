(function () {
    angular
        .module("MBTASafe")
        .controller("HomeController", HomeController);

    function HomeController($http) {
        var vm = this;
        $http.get("/api/stops").then(function (resp) {
            vm.stops = resp.data;
        })
    }
})();