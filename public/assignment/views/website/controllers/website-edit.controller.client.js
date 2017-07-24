(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($scope) {
        var vm = this;
        vm.websiteId = $routeParameters["websiteId"];
        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();
    }
})();