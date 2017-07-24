(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageSerivce) {
        var vm = this;
        vm.websiteId = $routeParams["websiteId"];
        function init() {
            vm.pages = PageSerivce.findPageByWebsiteId(websiteId);
        }
    }
})();