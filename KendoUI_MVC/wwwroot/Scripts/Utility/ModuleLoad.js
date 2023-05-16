$(function () {
    LoadModule();
});
var bUrl = "";
//var bUrl = "/DMS";

//function LoadModule() {
//    var urlpost = bUrl+'/Home/GetModules';
//    var formData = new FormData();

//    $.ajax({
//        url: urlpost,
//        type: "POST",
//        data: formData,
//        dataType: 'json',
//        contentType: false,
//        processData: false,
//        success: function (response) {
//            console.log(response);
//            var html = '';
//            if (response != null) {
//                for (i = 0; i < response.length; i++) {
//                    var appendhtml = '<a class="menu_mIcon" href="' + response[i].RedirectUrl + '">'
//                                   + '<img title="' + response[i].DisplayName + '" src="' + response[i].ImageUrl + '"' + " height=47px width=47px/>"
//                                   + response[i].DisplayName +  '</a>';
//                    html += appendhtml; 
//                }
//            }
//            $('#div_module').append(html);
//        },
//        error: function (xhr) {
//            //toastr.options.timeOut = 1500;
//            //toastr.warning(xhr.status + ': ' + xhr.statusText);
//        }
//    });
//}


function LoadModule() {
    var urlpost = bUrl + '/Home/GetModules';
    var formData = new FormData();
    $('#div_module').html('');
    $.ajax({
        url: urlpost,
        type: "POST",
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            //console.log(response);
            var html = '';
            if (response != null) {
                for (i = 0; i < response.length; i++) {
                    var appendhtml = "";
                    if (response[i].RedirectUrl == "/ApprovalSystem/") {
                        appendhtml = '<li>' +

                                           '<a href="#" onclick="CallApprovalModule(' + 1 + ')">' +

                                               '<span class="icon"><span class="icon16 icomoon-icon-cube"></span></span>' +
                                               '<span class="event">' + response[i].DisplayName + ' </span>' +
                                           '</a>' +

                                       '</li>';
                    }
                    else {
                        appendhtml = '<li>' +

                                            '<a href="' + response[i].RedirectUrl + '">' +

                                                '<span class="icon"><span class="icon16 icomoon-icon-cube"></span></span>' +
                                                '<span class="event">' + response[i].DisplayName + ' </span>' +
                                            '</a>' +

                                        '</li>';
                    }

                    html += appendhtml;
                }
            }
            $('#div_module').append(html);
        },
        error: function (xhr) {
            //toastr.options.timeOut = 1500;
            //toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}