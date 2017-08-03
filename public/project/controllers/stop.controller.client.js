(function () {
    angular
        .module("MBTASafe")
        .controller("StopController", StopController);

    function StopController($http, $routeParams) {
        var vm = this;
        $http.get("/api/predictions/" + $routeParams["stopId"]).then(function (resp) {
            vm.predictions = resp.data;
        })
    }
})();