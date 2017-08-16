(function () {
    angular
        .module("MBTASafe")
        .controller("DashboardController", DashboardController);

    function DashboardController($http, $rootScope) {
        var vm = this;

        $http.get("/api/project/user/" + $rootScope.user).then(function (u) {
            vm.user = u.data;
        });
        vm.routes = [{name: "My route 1", username: "jackfrys", children: true, public: false, steps: [{place: "place-nuniv", step: "EXIT"}], origin: "Back Bay Station", destination: "Northeastern University"}]
    }
})();