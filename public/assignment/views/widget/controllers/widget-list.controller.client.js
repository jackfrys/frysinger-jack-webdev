(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService, $scope) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        $scope.pageId = vm.pageId;

        vm.trustImageUrl = trustImageUrl;
        vm.trustYoutube = trustYoutube;
        vm.trustHTML = trustHTML;

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId).then(function (widgets) {
                vm.widgets = widgets.data;
            });
        }

        init();

        function trustImageUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function trustHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function trustYoutube(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }
    }
})();