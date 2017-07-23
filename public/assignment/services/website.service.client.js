(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var ws = [];

            for (var w in websites) {
                if (w.developerId == userId) {
                    ws.push(w);
                }
            }

            return ws;
        }

        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if (w._id == websiteId) {
                    return w;
                }
            }
        }

        function updateWebsite(websiteId, website) {
            deleteWebsite(websiteId);
            websites.push(website);
        }

        function deleteWebsite(websiteId) {
            var ws = [];

            for (var w in websites) {
                if (w._id != websiteId) {
                    ws.push(w);
                }
            }

            return ws;
        }

    }
})();