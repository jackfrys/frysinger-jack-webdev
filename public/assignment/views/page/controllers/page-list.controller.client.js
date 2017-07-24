(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageSerivce) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.pages = PageSerivce.findPageByWebsiteId(websiteId);
        }
    }
})();