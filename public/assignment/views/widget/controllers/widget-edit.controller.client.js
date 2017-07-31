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
            WidgetService.findWidgetById(vm.widgetId).then(function (widget) {
                vm.widget = widget.data;
            });
        }
        init();
    }
})();