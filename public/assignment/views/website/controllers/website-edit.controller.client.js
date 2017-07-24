(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["websiteId"];
        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();
    }
})();