(function() {
    angular
        .module("MBTASafe")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $http) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user.password != user.password2 || !user.password || !user.password2) {
                vm.error = "Your passwords don't match";
            } else {
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