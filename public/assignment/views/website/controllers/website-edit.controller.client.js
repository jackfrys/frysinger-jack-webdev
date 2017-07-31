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
            WebsiteService.findWebsiteById(vm.websiteId).then(function (website) {
                vm.website = website.data;
            });

            WebsiteService.findWebsitesByUser(vm.userId).then(function (websites) {
                vm.websites = websites.data;
            });
        }
        init();
        
        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website).then(function () {
                $location.path("/user/" + vm.userId + "/website");
            });
        }
        
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId).then(function () {
                $location.path("/user/" + vm.userId + "/website");
            });
        }
    }
})();