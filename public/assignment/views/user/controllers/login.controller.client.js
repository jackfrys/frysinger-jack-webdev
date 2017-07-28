(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        
        function login(user) {
            UserService.findUserByCredentials(user.username, user.password).then(function (myUser) {
                if (myUser) {
                    $location.url("/user/" + myUser._id);
                } else {
                    vm.alert = "Unable to login";
                }
            });
        }
    }
})();