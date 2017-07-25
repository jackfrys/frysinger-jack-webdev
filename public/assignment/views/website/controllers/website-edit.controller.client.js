(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
        
        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            $location.path("/user/" + vm.userId + "/website");
        }
        
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.path("/user/" + vm.userId + "/website");
        }
    }
})();