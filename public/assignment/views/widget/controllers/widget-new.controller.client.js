(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.newHeader = newHeader;
        vm.newYoutube = newYoutube;
        vm.newImage = newImage;

        function newHeader() {
            var widgetId = WidgetService.unusedWidgetId();
            WidgetService.createWidget(vm.pageId, {"_id" : widgetId, "widgetType" : "HEADING"});
            $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
        }

        function newYoutube() {
            var widgetId = WidgetService.unusedWidgetId();
            WidgetService.createWidget(vm.pageId, {"_id" : widgetId, "widgetType" : "YOUTUBE"});
            $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
        }

        function newImage() {
            var widgetId = WidgetService.unusedWidgetId();
            WidgetService.createWidget(vm.pageId, {"_id" : widgetId, "widgetType" : "IMAGE"});
            $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
        }
    }
})();