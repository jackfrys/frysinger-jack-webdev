(function () {
    angular
        .module("MBTASafe")
        .controller("ProfileController", ProfileController);

    function ProfileController($http, $location) {
        var vm = this;
        vm.update = update;

        $http.get("/api/project/user/").then(function (u) {
            vm.user = u.data;
        });
        
        function update() {
            $http.put("/api/project/user", vm.user).then(function () {
                $location.path("/");
            })
        }
    }
})();