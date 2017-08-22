(function () {
    angular
        .module("MBTASafe")
        .controller("LoginController", LoginController)

    function LoginController($http, $rootScope, $location) {
        var vm = this;

        vm.user = {};
        vm.login = login;
        vm.logout = logout;

        function logout() {
            UserService.logOut().then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }

        function login() {
            $http.post("/api/project/login", vm.user).then(function (user) {
                $rootScope.user = user.data;
                $location.path("/");
            })
        }
    }
})();