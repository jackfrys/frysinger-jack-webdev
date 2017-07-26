(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.newPage = newPage;

        vm.page = {};
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function newPage(page) {
            page._id = Math.round(Math.random() * 1000);
            PageService.createPage(vm.websiteId, page);
            $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }
})();