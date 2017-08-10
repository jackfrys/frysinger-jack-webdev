(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, WidgetService, $location, FlickrService) {
        var vm = this;
        vm.searchPhotos = function(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        };

        vm.selectPhoto = selectPhoto;
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService.findWidgetById($routeParams["wgid"]).then(function (d) {
                var w = d.data;
                w.url = url;
                WidgetService.updateWidget($routeParams["wgid"], w).then(function () {
                    $location.path("/user/" + $routeParams["uid"] + "/website/" + $routeParams["wid"] + "/page/" + $routeParams["pid"] + "/widget/" + $routeParams["wgid"]);
                });
            });
        }
    }
})();