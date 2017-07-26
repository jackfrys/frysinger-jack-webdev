(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "unusedWidgetId": unusedWidgetId
        };

        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var wds = [];

            for (var wd in widgets) {
                if (widgets[wd].pageId == pageId) {
                    wds.push(widgets[wd]);
                }
            }

            return wds;
        }

        function findWidgetById(widgetId) {
            for (var wd in widgets) {
                if (widgets[wd]._id == widgetId) {
                    return widgets[wd];
                }
            }
        }

        function updateWidget(widgetId, widget) {
            deleteWidget(widgetId);
            widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            var wds = [];

            for (var wd in widgets) {
                if (widgets[wd]._id != widgets) {
                    wds.push(widgets[wd]);
                }
            }

            widgets = wds;
        }

        function unusedWidgetId() {
            return Math.round(Math.random() * 10000000);
        }
    }
})();