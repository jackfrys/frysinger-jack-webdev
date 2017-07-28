(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService, $location) {
        var vm = this;
        vm.createUser = createUser;
        vm.user = {"_id" : Math.round(Math.random() * 1000000)}

        function createUser() {
            UserService.createUser(vm.user).then(function () {
                $location.path("/user/" + vm.user._id);
            });
        }
    }
})();