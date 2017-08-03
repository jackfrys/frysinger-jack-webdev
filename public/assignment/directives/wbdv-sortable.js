(function () {
    angular
        .module("WebAppMakerDirectives", [])
        .directive("SortableWidgets", $(function () {
            $('#sortable').sortable({
                start: function (edit, ui) {
                    $(this).attr("start", ui.item.index());
                },
                update: function (edit, ui) {
                    var pageId = window.location.href.split("/")[10];
                    var url = "/page/" + pageId + "/widget?initial=" + $(this).attr("start") + "&final=" + ui.item.index();
                    $(this).removeAttr("start");
                    $.ajax({type: "PUT", url: url})
                }
            });
        }));
})