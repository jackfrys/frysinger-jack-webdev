(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        this.updateProfile = updateProfile;
        vm.userId = $routeParams["uid"];

        function init() {
            UserService.findUserById(vm.userId).then(function (user) {
                vm.user = user.data;
            });
        }

        init();

        function updateProfile() {
            UserService.updateUser(vm.userId, vm.user);
        }
    }
})();