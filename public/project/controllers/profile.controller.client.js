(function () {
    angular
        .module("MBTASafe")
        .controller("ProfileController", ProfileController);

    function ProfileController($http, $location) {
        var vm = this;
        vm.update = update;

        function init() {
            $http.get("/api/project/user/").then(function (u) {
                vm.user = u.data;
            });
        }
        init();

        vm.logout = logout;
        function logout() {
            $http.get("/api/project/logout").then(function () {
                vm.user = {role:"UNAUTH"};
                $location.path("/");
            })
        }
        
        function update() {
            $http.put("/api/project/user", vm.user).then(function () {
                $location.path("/");
            })
        }
    }
})();