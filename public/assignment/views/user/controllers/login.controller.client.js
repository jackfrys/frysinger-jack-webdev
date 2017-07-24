(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        
        function login(user) {
            var myUser = UserService.findUserByCredentials(user.username, user.password);
            if (myUser) {
                $location.url("/user/" + myUser._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }
})();