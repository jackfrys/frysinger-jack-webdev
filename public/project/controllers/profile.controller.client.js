(function () {
    angular
        .module("MBTASafe")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $http) {
        var vm = this;

        $http.get("/api/project/user/" + $rootScope.user).then(function (u) {
            vm.user = u.data;
        });
    }
})();