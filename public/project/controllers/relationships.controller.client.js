(function () {
    angular
        .module("MBTASafe")
        .controller("RelationshipController", RelationshipController);

    function RelationshipController($http, $location, UserService) {
        var vm = this;
        vm.deleteRel = deleteRel;
        vm.newRel = {};
        vm.addRel = addRel;
        vm.logout = logout;

        function init() {
            $http.get("/api/project/user").then(function (d) {
                vm.user = d.data;
            }, function () {
                vm.user = {role: "UNAUTH"};
            });

            $http.get("/api/project/relationships").then(function (d) {
                vm.rels = d.data;

                $http.get("/api/project/allusers").then(function (u) {
                    var usrs = u.data;

                    for (var r in vm.rels) {
                        var rel = vm.rels[r];

                        for (var u in usrs) {
                            var us = usrs[u];

                            if (us._id + "" == rel.parent + "") {
                                rel.parentName = us.username;
                            }

                            if (us._id + "" == rel.traveler + "") {
                                rel.username = us.username;
                            }
                        }
                    }
                });
            });
        }

        init();

        function logout() {
            UserService.logOut().then(function () {
                vm.user = {role: "UNAUTH"};
                $location.path("/");
            })
        }

        function deleteRel(rel) {
            $http.delete("/api/project/relationships/" + rel._id).then(function () {
                $http.get("/api/project/relationships").then(function (d) {
                    vm.rels = d.data;

                    $http.get("/api/project/allusers").then(function (u) {
                        var usrs = u.data;

                        for (var r in vm.rels) {
                            var rel = vm.rels[r];

                            for (var u in usrs) {
                                var us = usrs[u];

                                if (us._id + "" == rel.parent + "") {
                                    rel.parentName = us.username;
                                }

                                if (us._id + "" == rel.traveler + "") {
                                    rel.username = us.username;
                                }
                            }
                        }
                    });
                });
            });

        }

        function addRel() {
            $http.get("/api/project/user/" + vm.newRel.uid).then(function (us) {
                vm.newRel.uid = "";
                $http.post("/api/project/relationships/" + us.data._id).then(function () {
                    $http.get("/api/project/relationships").then(function (d) {
                        vm.rels = d.data;

                        $http.get("/api/project/allusers").then(function (u) {
                            var usrs = u.data;

                            for (var r in vm.rels) {
                                var rel = vm.rels[r];

                                for (var u in usrs) {
                                    var us = usrs[u];

                                    if (us._id + "" == rel.parent + "") {
                                        rel.parentName = us.username;
                                    }

                                    if (us._id + "" == rel.traveler + "") {
                                        rel.username = us.username;
                                    }
                                }
                            }
                        });
                    });
                })
            })
        }
    }
})();