(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($scope) {
        var vm = this;
        vm.pageId = $routeParameters["pageId"];
        function init() {
            vm.page = PageService.findPageById(pageId);
        }
        init();
    }
})();