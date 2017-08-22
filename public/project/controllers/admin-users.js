(function () {
    angular
        .module("MBTASafe")
        .controller("AdminUsers", AdminUsers);

    function AdminUsers($http, $location) {
        var vm = this;

        vm.logout = logout;
        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }

        $http.get("/api/project/allusers").then(function (us) {
            vm.users = us.data;
        })
    }
})();