(function () {
    angular
        .module("MBTASafe")
        .controller("LoginController", LoginController)

    function LoginController($http) {
        var vm = this;

        vm.user = {};
        vm.login = login;

        function login() {
            $http.post("/api/project/login", vm.user).then(function (user) {
                $location.path("/");
            })
        }
    }
})