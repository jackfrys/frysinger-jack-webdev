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

            for (var r in vm.rels) {
                var rel = vm.rels[r];
                $http.get("/api/user/" + rel.traveler).then(function (that) {
                    rel.username = that.data.username;
                })
            }
        });

        function deleteRel(rel) {
            $http.delete("/api/project/relationships/" + rel._id).then(function () {
                $http.get("/api/project/relationships").then(function (d) {
                    vm.rels = d.data;

                    for (var r in vm.rels) {
                        var rel = vm.rels[r];
                        $http.get("/api/user/" + rel.traveler).then(function (that) {
                            rel.username = that.data.username;
                        })
                    }
                });
            });

        }

        function addRel() {
            $http.post("/api/project/relationships", vm.newRel).then(function () {
                $http.get("/api/project/relationships").then(function (d) {
                    vm.rels = d.data;

                    for (var r in vm.rels) {
                        var rel = vm.rels[r];
                        $http.get("/api/user/" + rel.traveler).then(function (that) {
                            rel.username = that.data.username;
                        })
                    }
                });
            })
        }
    }
})();