(function () {
    angular
        .module("MBTASafe")
        .controller("StopController", StopController);

    function StopController($routeParams, MBTAService) {
        var vm = this;
        function init() {
            MBTAService.predictions($routeParams["stopId"]).then(function (resp) {
                vm.predictions = resp.data;
            })
        };
        init();
    }
})();