(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService() {

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var ps = [];

            for (var p in pages) {
                if (pages[p]._id == websiteId) {
                    ps.push(pages[p]);
                }
            }

            return ps;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id == pageId) {
                    return pages[p];
                }
            }
        }

        function updatePage(pageId, page) {
            deletePage(pageId);
            pages.push(page);
        }

        function deletePage(pageId) {
            var ps = [];

            for (var p in pages) {
                if (pages[p]._id != pages) {
                    ps.push(pages[p]);
                }
            }

            pages = ps;
        }

    }
})();