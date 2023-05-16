$(function () {
    $('.menu_moduleContainer').hide();

    $(".menu_moduleimg").click(function () {
        if ($(".menu_moduleContainer").is(":visible"))
            $(".menu_moduleContainer").fadeOut("fast");
        else
            $(".menu_moduleContainer").fadeIn("fast");
    });
});

//$(function () {
//    $('#logoutContainer').hide();

//    $("#user_spot2").click(function () {
//        if ($("#logoutContainer").is(":visible"))
//            $("#logoutContainer").fadeOut();
//        else
//            $("#logoutContainer").fadeIn();
//    });
//});

$(document).mouseup(function (e) {
    //var container = $("#logoutContainer");

    //if (!container.is(e.target) && container.has(e.target).length === 0) {
    //    container.fadeOut();
    //}

    var container2 = $(".menu_moduleContainer");
    if (!container2.is(e.target) && container2.has(e.target).length === 0) {
        container2.fadeOut();
    }
});

$(document).ready(function () {
    //if ($(".lblResponse").text() == "0") {
    //    $(".notice").hide();
    //    $(".history").show();
    //}
    //else {
    //    $(".notice").show();
    //    $(".history").hide();
    //}
});

//$(function () {

//    var logger = $.connection.ApprovalHub;

//    logger.client.logMessage = function (msg) {
//        //console.log(msg);
//        if (msg == '0') {
//            if (!$(".notice").is(':animated')) {
//                $(".notice").fadeOut(500);
//                $(".history").fadeIn(500);
//            }
//        }
//        else {
//            if ($(".lblResponse").text() != msg) {
//                $(".notice").fadeOut(500);
//                $(".notice").fadeIn(500);
//                $(".history").fadeOut(500);
//                $(".lblResponse").text(msg);
//            }
//        }
//    };

//    $.connection.hub.start();
//});


function LoadExternalModule(redirectUrl, moduleName) {

    var data = {};
    data['MethodName'] = 'TokenAuthentication';
    data['redirectUrl'] = redirectUrl;
    data['moduleName'] = moduleName;

    $.ajax({
        url: "/Dashboard/Handlers/AuthenticationToken.ashx",
        url: "/Handlers/AuthenticationToken.ashx",
        async: false,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var container2 = $(".menu_moduleContainer");
            container2.hide();
            if (data.mode == 'true') {
                window.open(data.url);
            }
            else
                alert("An error has occurred while loading module.");
        },
        error: function () {
            alert("An error has occurred while loading module.");
        }
    });
}