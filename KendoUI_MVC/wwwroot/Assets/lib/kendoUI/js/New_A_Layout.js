var popupNotification;
var redirectUrl = 'Approval.aspx',
    moduleName = 'Approval System';


$(function () {
    popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    $(".linkLabel").hide();
    $('#RefTracker').click(function () {
        $('.status').attr('disabled', true);
        $(".status").css({ "cursor": "not-allowed", "background": "rgb(231 231 231)" });
        $('#txtjobNo').attr('disabled', false);
        $("#txtjobNo").css({ "cursor": "", "background": "" });


    });

    $('input[type=radio][name=rbdStatus]').change(function () {
        $('.status').attr('disabled', true);
        $(".status").css({ "cursor": "not-allowed", "background": "rgb(231 231 231)" });

        $('.status').val('');
        $('.status').show();

        $(".linkLabel").hide();

        var Status = parseInt($('input[name=rbdStatus]:checked').val());
        switch (Status) {
            case 1:
                $('#txtjobNo').attr('disabled', false).focus();
                $("#txtjobNo").css({ "cursor": "", "background": "" });
                break;
            case 2:
                $('#txtCSTNo').attr('disabled', false).focus();
                $("#txtCSTNo").css({ "cursor": "", "background": "" });
                break;

            case 3:
                $('#txtPR').attr('disabled', false).focus();
                $("#txtPR").css({ "cursor": "", "background": "" });
                break;
            case 4:
                $('#txtFB').attr('disabled', false).focus();
                $("#txtFB").css({ "cursor": "", "background": "" });
                break;
            case 5:
                $('#txtBlock').attr('disabled', false).focus();
                $("#txtBlock").css({ "cursor": "", "background": "" });
                break;
            case 6:
                $('#txtYarnBK').attr('disabled', false).focus();
                $("#txtYarnBK").css({ "cursor": "", "background": "" });
                break;
            case 7:
                $('#txtAcsrBK').attr('disabled', false).focus();
                $("#txtAcsrBK").css({ "cursor": "", "background": "" });
                break;
            case 8:
                $('#txtOrder').attr('disabled', false).focus();
                $("#txtOrder").css({ "cursor": "", "background": "" });
                break;
            case 9:
                $('#txtPO').attr('disabled', false).focus();
                $("#txtPO").css({ "cursor": "", "background": "" });
                break;
            default:
                $('.status').attr('disabled', true);

                break;
        }
    });

    $(".status").keyup(function (event) {
        if (event.which == 13) {
            RefTracking();
        }
    });

});

function RefTracking() {
    $('.status').attr('disabled', true);

    var paramObj = { job_code: '', cost_sheet_code: '', PR_no: '', fb_code: '', block_code: '', yarn_booking: '', accessories_booking: '', buyer_order_code: '', po_no: '' };
    var Status = parseInt($('input[name=rbdStatus]:checked').val());
    var isValid = true;

    switch (Status) {
        case 1:
            $('#txtjobNo').attr('disabled', false).focus();
            if ($('#txtjobNo').val() == '') {
                isValid = false;
                popupNotification.show('Please provide job no', "warning");
            }
            else
                var Job = $("#txtjobNo").val();
            var code = AddPrefix(1, Job);
            $("#txtjobNo").val(code);
                paramObj.job_code = $('#txtjobNo').val();
            break;

        case 2:
            $('#txtCSTNo').attr('disabled', false).focus();
            if ($('#txtCSTNo').val() == '') {
                isValid = false;
                popupNotification.show('Please provide cost Sheet No', "warning");
            }
            else
                paramObj.cost_sheet_code = AddPrefix(Status, $('#txtCSTNo').val());
            break;

        case 3:
            $('#txtPR').attr('disabled', false).focus();
            if ($('#txtPR').val() == '') {
                isValid = false;
                popupNotification.show('Please provide Purchase requisition no', "warning");
            }
            else
                paramObj.po_no = AddPrefix(Status, $('#txtPR').val());
            break;

        case 4:
            $('#txtFB').attr('disabled', false).focus();
            if ($('#txtFB').val() == '') {
                isValid = false;
                popupNotification.show('Please provide fabric booking no', "warning");
            }
            else
                paramObj.fb_code = AddPrefix(Status, $('#txtFB').val());
            break;

        case 5:
            $('#txtBlock').attr('disabled', false).focus();
            if ($('#txtBlock').val() == '') {
                isValid = false;
                popupNotification.show('Please provide block no', "warning");
            }
            else
                paramObj.block_code = AddPrefix(Status, $('#txtBlock').val());
            break;

        case 6:
            $('#txtYarnBK').attr('disabled', false).focus();
            if ($('#txtYarnBK').val() == '') {
                isValid = false;
                popupNotification.show('Please provide yarn booking no', "warning");
            }
            else
                paramObj.yarn_booking = AddPrefix(Status, $('#txtYarnBK').val());
            break;

        case 7:
            $('#txtAcsrBK').attr('disabled', false).focus();
            if ($('#txtAcsrBK').val() == '') {
                isValid = false;
                popupNotification.show('Please provide accessories booking no', "warning");
            }
            else
                paramObj.accessories_booking = AddPrefix(Status, $('#txtAcsrBK').val());
            break;

        case 8:
            $('#txtOrder').attr('disabled', false).focus();
            if ($('#txtOrder').val() == '') {
                isValid = false;
                popupNotification.show('Please provide Order no', "warning");
            }
            else
                paramObj.buyer_order_code = AddPrefix(Status, $('#txtOrder').val());
            break;
        case 9:
            $('#txtPO').attr('disabled', false).focus();
            if ($('#txtPO').val() == '') {
                isValid = false;
                popupNotification.show('Please provide PO no', "warning");
            }
            else
                paramObj.po_no = $('#txtPO').val();     // no fixed code formate.
            break;
        default:
            paramObj = {};
            isValid = false;
            break;
    }

    if (isValid) {
        blockUI();
        $.ajax({
            url: bUrl + '/ExternalModuleCall/RefTracking',
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(paramObj),
            contentType: "application/json",

            success: function (data) {
                unblockUI();
                var response = JSON.parse(data);
                var validResult = (_.without(_.values(response), null));

                if (validResult.length > 0) {
                    $('#txtjobNo').val(response.job_code);
                    $('#txtPR').val(response.PR_no);

                    //-------------- Link Creating --------------------
                    if (status == 2) {
                        $('#txtCSTNo').val(response.cost_sheet_code);
                        $('#lblCSTNo').hide();
                    }
                    else {
                        $('#txtCSTNo').hide();
                        $('#lblCSTNo').html(response.cost_sheet_code == null ? 'N/A' : '<a onClick="RefLinkCreate(2, \'' + response.cost_sheet_code + '\')" style="cursor:pointer;color:#428bca">' + response.cost_sheet_code + '</a> ');
                        $('#lblCSTNo').show();
                    }

                    if (status == 4) {
                        $('#txtFB').val(response.fb_code);
                        $('#lblFB').hide();
                    }
                    else {
                        $('#txtFB').hide();
                        $('#lblFB').html(response.fb_code == null ? 'N/A' : '<a onClick="RefLinkCreate(4,\'' + response.fb_code + '\')"style="cursor:pointer;color:#428bca">' + response.fb_code + '</a> ');
                        $('#lblFB').show();
                    }
                    if (status == 5) {
                        $('#txtBlock').val(response.block_code);
                        $('#lblBlock').hide();
                    }
                    else {
                        $('#txtBlock').hide();
                        $('#lblBlock').html(response.block_code == null ? 'N/A' : '<a onClick="RefLinkCreate(5,\'' + response.block_code + '\')"style="cursor:pointer;color:#428bca">' + response.block_code + '</a> ');
                        $('#lblBlock').show();
                    }
                    //---------------------- End Link Creating -------------------------

                    $('#txtYarnBK').val(response.yarn_booking);
                    $('#txtAcsrBK').val(response.accessories_booking);
                    $('#txtOrder').val(response.buyer_order_code);

                    $('#txtPO').val(response.po_no);
                    $('#txtItems').val(response.Items);
                    $('#txtStyle').val(response.style);

                    /// adding tooltip
                    $('#txtjobNo').attr('title', response.job_code);
                    $('#txtCSTNo').attr('title', response.cost_sheet_code);
                    $('#txtPR').attr('title', response.PR_no);
                    $('#txtFB').attr('title', response.fb_code);
                    $('#txtBlock').attr('title', response.block_code);
                    $('#txtYarnBK').attr('title', response.yarn_booking);
                    $('#txtAcsrBK').attr('title', response.accessories_booking);
                    $('#txtOrder').attr('title', response.buyer_order_code);

                    $('#txtPO').attr('title', response.po_no);
                    $('#txtItems').attr('title', response.Items);
                    $('#txtStyle').attr('title', response.style);
                }
                else
                popupNotification.show('Invlid search code or data not found', "warning");
            },
            error: function () {
                unblockUI();

                alert("An error has occurred while tracking  reference.");
            }
        });

    }

    return true;
}

function RefLinkCreate(docType, linkText) {

    var ReportName = '';
    var DocBaseID = '';
    var html = '';

    switch (docType) {

        case 2:
            ReportName = 'rptCostingSheet.aspx';
            DocBaseID = 37;
            break;

        case 4:
            ReportName = 'rptFabricBooking.aspx';
            DocBaseID = 63;
            break;
        case 5:
            ReportName = 'rptMasterBlockOrder.aspx';
            DocBaseID = 45;
            break;

        default:
            ReportName = '';
            DocBaseID = -1;
            break;
    }
    var docCode = linkText.split(',');
    var paramRpt = { DocCode: docCode[0], DocBaseID: DocBaseID };
    //$.blockUI({ baseZ: 2000 });
    blockUI();

    $.ajax({
        url: bUrl + '/ExternalModuleCall/GetRptMaxVersion',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(paramRpt),
        contentType: "application/json",

        success: function (data) {
            //$(document).ajaxStop($.unblockUI);
            unblockUI();

            var response = JSON.parse(data);

            console.log(response);
            // var url = response.result.url + '/?token=' + response.token + '&type=submit';
            if (response != null) {
                if (response.DocBaseID != "63") {
                    var urlLink = 'ApprovalSystem/htmlReport/' + ReportName + '?clientAgent=Web&userId=' + 0 + '&docBaseId=' + DocBaseID + '&docCode=' + docCode[0] + '&docVersion=' + response.MaxVersion;
                    window.open(urlLink);
                }
                else {
                    LoadExternalModuleFabricBooking(response.DocBaseID, docCode[0], response.MaxVersion, '', '', '');
                }
            }
            else
            popupNotification.show('Report doest found in approval history', "warning");
        },
        error: function () {
            //$(document).ajaxStop($.unblockUI);
            unblockUI();

            alert("An error has occurred while tracking  reference.");
        }
    });
}

function LoadExternalModuleFabricBooking(docType, docCode, version, Json, SubReportJson, type) {
    var data = {};
    data['MethodName'] = 'TokenAuthentication';
    data['redirectUrl'] = redirectUrl;
    data['moduleName'] = moduleName;
    data['DocType'] = docType;
    data['DocCode'] = docCode;
    data['Version'] = version;
    data['Json'] = Json;
    data['SubReportJson'] = SubReportJson;

    $.ajax({
        url: bUrl + '/ExternalModuleCall/TokenAuthenticationFabricBooking',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",

        success: function (data) {
            var response = JSON.parse(data);
            var url = response.result.url + '/?token=' + response.token + '&type=LiveReport';
            window.open(url, '_blank');
        },
        error: function () {
            alert("An error has occurred while loading module.");
        }
    });
}

function LoadExternalModule(docType, docCode, version, Json, SubReportJson, type) {
    var data = {};
    data['MethodName'] = 'TokenAuthentication';
    data['redirectUrl'] = redirectUrl;
    data['moduleName'] = moduleName;
    data['DocType'] = docType;
    data['DocCode'] = docCode;
    data['Version'] = version;
    data['Json'] = Json;
    data['SubReportJson'] = SubReportJson;

    $.ajax({
        url: bUrl + '/ExternalModuleCall/TokenAuthentication',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",

        success: function (data) {
            var response = JSON.parse(data);

            var url = '';
            if (type == "Notify") {
                url = response.result.url + '/?token=' + response.token + '&type=Notify';
            }
            else {
                url = response.result.url + '/?token=' + response.token;
            }
            window.open(url, '_blank');
        },
        error: function () {
            alert("An error has occurred while loading module.");
        }
    });
}

function CallApprovalModule(type) {
    var docCode = "";
    var docType = "";
    var version = "";
    var SubReportJson = "";
    var Json = "";

    LoadExternalModule(docType, docCode, version, Json, SubReportJson, type)
}

function AddPrefix(type, str) {
    var max = 0;
    var prefix = '';
    var postfix = '';
    var docType = '';
    var hasPrefix = false;
    var code = str;

    str = str.toString();

    switch (type) {
        case 1:
            docType = 'Job Code';
            prefix = 'J';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 10;

            var job = str.split('(');
            str = job[0];
            if (job.length == 2)
                postfix = job[1].toUpperCase();
            break;

        case 2:
            docType = 'Cost Sheet';
            prefix = 'CST';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 8;
            break;

        case 3:
            docType = 'Purchase Requisition';
            prefix = 'PR';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 6;
            break;
        case 4:
            docType = 'Fabric Booking';
            prefix = 'FB';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 6;
            break;
        case 5:
            docType = 'Block Order';
            prefix = 'BL';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 7;
            break;
        case 6:
            docType = 'Yarn Booking';
            prefix = 'BK';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 8;
            break;
        case 7:
            docType = 'Accessories Booking';
            prefix = 'BK';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 8;
            break;
        case 8:
            docType = 'Buyer Order';
            prefix = 'B';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 7;
            break;
        case 9:
            docType = 'P D';
            prefix = 'PD';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 6;
            break;
        default:
            docType = 'Type Not Found';
            prefix = '';
            max = 0;
            break;
    }

    if (!hasPrefix) {
        str = addZeros(str, max);
        code = prefix + str;
    }
    if (postfix != '')
        code = code + '(' + postfix.toUpperCase();

    return code;
}

function addZeros(str, max) {
    str = str.toString();
    return str.length < max ? addZeros("0" + str, max) : str;
}
