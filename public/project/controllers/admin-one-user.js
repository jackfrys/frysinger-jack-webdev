(function () {
    angular
        .module("MBTASafe")
        .controller("AdminOneUser", AdminOneUser);

    function AdminOneUser($http, $location, $routeParams, UserService) {
        var vm = this;

        vm.logout = logout;
        vm.update = update;

        function init() {
            UserService.allUsers().then(function (us) {
                var uers = us.data;
                for (var u in uers) {
                    if (uers[u]._id == $routeParams["uid"]) {
                        vm.user = uers[u];
                        break;
                    }
                }
            });
        }

        init();

        function logout() {
            UserService.logout().then(function () {
                vm.user = {role: "UNAUTH"};
                $location.path("/");
            })
        }

        function update() {
            UserService.updateUser($routeParams["uid"], vm.user).then(function () {
                $location.path("/users");
            })
        }
    }
})();