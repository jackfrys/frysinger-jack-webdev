(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            vm.userId = UserService.findUserById(userId);
        }
        init();
    }
})();