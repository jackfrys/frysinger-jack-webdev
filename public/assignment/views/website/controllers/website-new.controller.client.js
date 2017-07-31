(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.newWebsite = newWebsite;
        vm.website = {};
        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).then(function (websites) {
                vm.websites = websites.data;
            });
        }
        init();

        function newWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website).then(function () {
                $location.path("/user/" + vm.userId + "/website");
            });
        }
    }
})();