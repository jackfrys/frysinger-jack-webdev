(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).then(function (websites) {
                vm.websites = websites.data;
            });
        }

        init();
    }
})();