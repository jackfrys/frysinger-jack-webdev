(function () {
    angular
        .module("MBTASafe")
        .controller("DashboardController", DashboardController);

    function DashboardController() {
        var vm = this;

        vm.user = {role: "TRAVELER"};
        vm.routes = [{name: "My route 1", username: "jackfrys", children: true, public: false, steps: [{place: "place-nuniv", step: "EXIT"}], origin: "Back Bay Station", destination: "Northeastern University"}]
    }
})();