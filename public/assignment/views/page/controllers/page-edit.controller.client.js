(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService) {
        var vm = this;
        vm.pageId = $routeParams["pageId"];
        function init() {
            vm.page = PageService.findPageById(pageId);
        }
        init();
    }
})();