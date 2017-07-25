(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

            for (w in vm.widgets) {
                var widget = vm.widgets[w];

                if (widget.hasOwnProperty("text")) {
                    widget.text = $sce.trustAsHtml(widget.text);
                }

                if (widget.hasOwnProperty("url")) {
                    widget.url = $sce.trustAsResourceUrl(widget.url);
                }
            }
        }
        init();
    }
})();