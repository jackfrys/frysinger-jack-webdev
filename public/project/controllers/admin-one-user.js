(function () {
    angular
        .module("MBTASafe")
        .controller("AdminOneUser", AdminOneUser);

    function AdminOneUser($http, $location, $routeParams) {
        var vm = this;

        vm.logout = logout;
        vm.update = update;
        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }

        $http.get("/api/project/allusers").then(function (us) {
            var uers = us.data;
            for (var u in uers) {
                if (uers[u]._id == $routeParams["uid"]) {
                    vm.user = uers[u];
                    break;
                }
            }
        });

        function update() {
            $http.put("/api/project/admin/user/" + $routeParams["uid"], vm.user).then(function () {
                $location.path("/users");
            })
        }
    }
})();