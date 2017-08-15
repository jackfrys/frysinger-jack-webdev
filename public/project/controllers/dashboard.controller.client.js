(function () {
    angular
        .module("MBTASafe")
        .controller("DashboardController", DashboardController);

    function DashboardController() {
        var vm = this;

        vm.user = {role: "TRAVELER"};
    }
})();