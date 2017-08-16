(function() {
    angular
        .module("MBTASafe")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $http) {
        var vm = this;
        vm.resister = register;

        function register(user) {
            if(user.password != user.password2 || !user.password || !user.password2) {
                $scope.error = "Your passwords don't match";
            } else {
                UserService
                    .register(user)
                    .then(
                        function(response) {
                            var user = response.data;
                            if(user != null) {
                                $rootScope.currentUser = user;
                                $location.url("/profile");
                            }
                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );
            }
        }
    }
})();