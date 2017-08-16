(function () {
    angular
        .module("MBTASafe")
        .controller("DashboardController", DashboardController);

    function DashboardController() {
        var vm = this;

        vm.user = {role: "TRAVELER"};
        vm.routes = [{name: "My route 1", steps: [{place: "place-nuniv", step: "EXIT"}], origin: "Back Bay Station", destination: "Northeastern University"}]
    }
})();