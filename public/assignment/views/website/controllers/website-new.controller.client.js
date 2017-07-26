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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function newWebsite(website) {
            website._id = Math.round(Math.random() * 100000);
            WebsiteService.createWebsite(vm.userId, website);
            $location.path("/user/" + vm.userId + "/website");
        }
    }
})();