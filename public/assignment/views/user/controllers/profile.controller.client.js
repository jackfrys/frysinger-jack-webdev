(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            UserService.findUserById(vm.userId).then(function (user) {
                vm.user = user.data;
            });
        }
        init();
    }
})();