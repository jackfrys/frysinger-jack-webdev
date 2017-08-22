(function () {
    angular
        .module("MBTASafe")
        .controller("AdminUsers", AdminUsers);

    function AdminUsers($http, $location, UserService) {
        var vm = this;

        vm.logout = logout;

        function init() {
            UserService.allUsers().then(function (us) {
                vm.users = us.data;
            })
        }
        init();

        function logout() {
            UserService.logout().then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }
    }
})();