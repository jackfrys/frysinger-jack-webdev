(function () {
    angular
        .module("MBTASafe")
        .controller("LoginController", LoginController)

    function LoginController($http, $rootScope, $location) {
        var vm = this;

        vm.user = {};
        vm.login = login;

        function login() {
            $http.post("/api/project/login", vm.user).then(function (user) {
                $rootScope.user = user.data;
                $location.path("/");
            })
        }
    }
})();