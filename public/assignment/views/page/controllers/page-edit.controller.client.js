(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        this.deletePage = deletePage;
        this.updatePage = updatePage;
        vm.pageId = $routeParams["pid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            PageService.findPageById(vm.pageId).then(function (page) {
                vm.page = page.data;
            });
        }

        init();

        function deletePage() {
            PageService.deletePage(vm.pageId).then(function (res) {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            })
        }

        function updatePage() {
            PageService.updatePage(vm.pageId, vm.page).then(function (res) {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            })
        }
    }
})();