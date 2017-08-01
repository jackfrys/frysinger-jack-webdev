(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.pageId = $routeParams["pid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.widgetId = $routeParams["wgid"];

        vm.saveChanges = saveChanges;

        function init() {
            WidgetService.findWidgetById(vm.widgetId).then(function (widget) {
                vm.widget = widget.data;
            });
        }
        init();

        function saveChanges() {
            WidgetService.updateWidget(vm.widgetId, vm.widget).then(function (response) {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            });
        }
    }
})();