var popupNotification;
var windowWidget;

$(document).ready(function () {

    popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    $("#Loadwindow").kendoWindow({
        width: 500,
        height: 160,
        draggable: false,
        content: {
            template: "Please Wait While Loading Data.."
        },
    });

    windowWidget = $("#Loadwindow").data("kendoWindow");
    $("#menu").kendoMenu();

});


function closeModuleWindow() {
    var dialog = $("#windowTin").data("kendoWindow");
    setTimeout(function() {
        dialog.close();
    });
}


function unblockUI() {
    var dialog = $("#Loadwindow").data("kendoWindow").center().open();
    $("#Loadwindow").parent().find(".k-window-action").css("visibility", "hidden");
    setTimeout(function () {
        dialog.close();
    });
    $("#body").removeClass('blur');
    kendo.ui.progress(windowWidget.element, false);

}

function blockUI() {
    var dialog = $("#Loadwindow").data("kendoWindow").center().open();
    $("#Loadwindow").parent().find(".k-window-action").css("visibility", "hidden");

    setTimeout(function () {
        dialog.open();
    });
    $("#body").addClass('blur');
    kendo.ui.progress(windowWidget.element, true);
}


