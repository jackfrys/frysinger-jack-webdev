(function () {
    angular
        .module("MBTASafe")
        .controller("ProfileController", ProfileController);

    function ProfileController($http, $location, UserService) {
        var vm = this;
        vm.update = update;

        function init() {
            UserService.thisUser().then(function (u) {
                vm.user = u.data;
            });
        }
        init();

        vm.logout = logout;
        function logout() {
            UserService.logOut().then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }
        
        function update() {
            UserService.updateThisUser(vm.user).then(function () {
                $location.path("/");
            })
        }
    }
})();