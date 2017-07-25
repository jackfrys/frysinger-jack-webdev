(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($scope) {
        var vm = this;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
    }
})();