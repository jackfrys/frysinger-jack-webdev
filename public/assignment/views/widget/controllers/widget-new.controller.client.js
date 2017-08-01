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
            WidgetService.createWidget(vm.pageId, {"widgetType" : "HEADING"}).then(function (widget) {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget.data._id);
            });
        }

        function newYoutube() {
            WidgetService.createWidget(vm.pageId, {"widgetType" : "YOUTUBE"}).then(function (widget) {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget.data._id);
            });
        }

        function newImage() {
            WidgetService.createWidget(vm.pageId, {"widgetType" : "IMAGE"}).then(function (widget) {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget.data._id);
            });
        }
    }
})();