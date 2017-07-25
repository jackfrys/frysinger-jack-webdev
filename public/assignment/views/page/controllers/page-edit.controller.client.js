(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.page = PageService.findPageById(pageId);
        }
        init();
    }
})();