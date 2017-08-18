(function () {
    angular
        .module("MBTASafe")
        .controller("RelationshipController", RelationshipController);

    function RelationshipController($http) {
        var vm = this;
        vm.deleteRel = deleteRel;
        vm.newRel = {};
        vm.addRel = addRel;

        $http.get("/api/project/user").then(function (d) {
            vm.user = d.data;
        }, function () {
            vm.user = {role:"UNAUTH"};
        });

        $http.get("/api/project/relationships").then(function (d) {
            vm.rels = d.data;
        });

        function deleteRel(rel) {
            $http.delete("/api/project/relationships", rel).then(function () {
                $http.get("/api/project/relationships").then(function (d) {
                    vm.rels = d.data;
                });
            });

        }

        function addRel() {
            $http.post("/api/project/relationships", vm.newRel).then(function () {
                $http.get("/api/project/relationships").then(function (d) {
                    vm.rels = d.data;
                });
            })
        }
    }
})();