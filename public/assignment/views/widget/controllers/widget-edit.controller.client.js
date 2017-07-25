(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.pageId = $routeParams["pid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
    }
})();