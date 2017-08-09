(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService, $location) {
        var vm = this;
        vm.createUser = createUser;
        vm.user = {};

        function createUser() {
            UserService.createUser(vm.user).then(function (user) {
                $location.path("/user/" + user.data._id);
            });
        }
    }
})();