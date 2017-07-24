(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["websiteId"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();
        
        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website)
        }
        
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
    }
})();