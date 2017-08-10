(function () {
    angular
        .module("MBTASafe")
        .controller("LoginController", LoginController);

    function LoginController($http, $location) {
        var vm = this;
        vm.login = login;
        vm.user = {};

        function login() {
            $http.get("/api/login?username=" + vm.user.username + "&password=" + vm.user.password).then(function (res) {
                var user = res.data;
                $location.path("/user/" + user._id);
            })
        }
    }
})();