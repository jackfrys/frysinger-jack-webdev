(function () {
    angular
        .module("MBTASafe")
        .service("MBTAService", MBTAService);

    function MBTAService($http) {

        var api = {
            allStops: allStops,
            predictions: predictions
        };

        return api;

        function allStops() {
            return $http.get("/api/project/stops")
        }

        function predictions(stopId) {
            return $http.get("/api/project/predictions/" + stopId);
        }
    }
})();