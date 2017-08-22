(function() {
    angular
        .module("MBTASafe")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $http, UserService) {
        var vm = this;
        vm.register = register;
        vm.logout = logout;

        function logout() {
            UserService.logout().then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }

        function register(user, role) {
            if(user.password != user.password2 || !user.password || !user.password2) {
                vm.error = "Your passwords don't match";
            } else {
                user.role = role;
                $http.post("/api/project/register", user)
                    .then(
                        function(response) {
                            var user = response.data;
                            if(user != null) {
                                vm.currentUser = user;
                                $location.url("/");
                            }
                        },
                        function(err) {
                            vm.error = err;
                        }
                    );
            }
        }
    }
})();