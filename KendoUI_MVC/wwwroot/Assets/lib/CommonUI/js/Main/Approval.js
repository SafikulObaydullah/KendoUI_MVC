$(document).ready(function () {
    var user = $('#username').val();
    $('#txtusername').html(user);
    var start = new Date();
    var end = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 60);
    var fromDate = end.toLocaleDateString();
    var toDate = start.toLocaleDateString();
    $("#daterangepicker").kendoDateRangePicker({
        //range: { start: start, end: end },
        labels: false
    });

    var value = { start: fromDate, end: toDate };

    $("#daterangepicker").data("kendoDateRangePicker").range(value);
    var ApprovalType = 0;
    var TaskCode = 0;
    var DocCode = "";

    LoadTaskList();
    ajaxCall(fromDate, toDate, ApprovalType, TaskCode, DocCode);
    
    $(".comboBox").kendoComboBox();
    $(".textbox").kendoTextBox();
    expansionpanel();
});

function expansionpanel() {
    $('#advanceSearch').kendoExpansionPanel({
        title: 'Advance Document History Search',
    });

    $('#historyGrid').kendoExpansionPanel({
        title: 'History',
        expanded: true
    });
}



function ajaxCall(from, to, ApprovalType, TaskCode, DocCode) { 
    $("#grid").empty();
    var param = { "fromDate": from, "toDate": to, "ApprovalType": ApprovalType, "TaskCode": TaskCode, "DocCode": DocCode};
    blockUI();
    $.ajax({
        url: 'Handlers/FileApprovalNotify.ashx?MethodName=LoadData',
        type: 'POST',
        data:JSON.stringify(param),
        success: function (data) {
            unblockUI();
            var result = JSON.parse(data);
            //console.log(result);
            if (result.length <= 0) {
                popupNotification.error("No Data Found by This Credentials!");
                $("#noData").show();
                $("#historyTable").hide();
                $("#historyTable").hide();

                return;
            }
            $("#noData").hide();
            $("#historyTable").show();

            $("#grid").kendoGrid({
                dataSource: {
                    data: result,
                    pageSize: 100
                },
                height: 470,
                sortable: true,
                
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                width:'auto',
                toolbar: ["search"],
                columns: [{
                    field: "Action_Date",
                    title: "Action Date",
                    width: 100,
                    }, {
                    template: "<div> #= (TASK.slice(-1) == '-') ? TASK.slice(0,-1) : TASK #</div> ",
                    field: "TASK",
                    title: "Doc Type",
                    width: 100,

                    },
                    {
                    field: "DOC_CODE",
                    title: "Doc Code",
                    width: 80,
                    },
                    {
                    field: "Action",
                    title: "My Action",
                    width: 80,

                },{
                    field: "Note",
                    title: "My Action Note",
                    width: 160,

                },{
                        template: "<div> #:Approval_State# #= (Approval_State == 'Submit') ? 'By' : 'By' #  <span style='color:blue;'> #:TO# </span> #= (Approval_State == 'Submit') ? '' : 'On' #  #= (OutAction_Date == null) ? '' : OutAction_Date # </div>",
                        field: "Approval_State",
                        title: "Last Action Status",
                        width: 210,

                },{
                    field: "AllNotes",
                    title: "Comments",
                        width: 220,

                    },
{
                    template: "<a onclick='ViewReport(\"#:reportName#\",\"#:TASK_CODE#\",\"#:DOC_CODE#\",\"#:Version#\")' class='k-button k-primary primaryTextButton' style='cursor: pointer;'>View</a>",
                    width: 65,

                },]
            });

        },
        error: function (data) {
            unblockUI();
            popupNotification.error("Error Loading History Data")
        }
    });
}

function LoadTaskList() {
    //blockUI();
    $.ajax({
        type: "GET",
        url: "Handlers/FileApprovalNotify.ashx",
        data: { 'MethodName': 'LoadTaskList' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //unblockUI();
            var result = data;
            //console.log(result);
            $("#combotask").kendoComboBox({
                dataTextField: "Doc_Name",
                dataValueField: "BaseCode",
                placeholder: "Select a Task...",
                dataSource: result,
                filter: "contains",
                select: onSelect,
                change: onChange

            });
        },
        error: function (data) {
            unblockUI();
            alert('failed');
        }
    });
}
function onSelect(e) {
    var dataItem = e.dataItem;
    if (dataItem.BaseCode == undefined) {
        return;
    }
    $('#spantaskCodeCode').html(dataItem.BaseCode);
}
function onChange(e) {
    if ($("#combotask").data("kendoComboBox").value() == '') {
        $('#spantaskCodeCode').html('');

    }
}
function View() {
    var AppHistory = $("#daterangepicker").data("kendoDateRangePicker").range();
    var fromAppHistoryDate = kendo.toString(kendo.parseDate(AppHistory.start), "MM/dd/yyyy");
    var toAppHistoryDate = kendo.toString(kendo.parseDate(AppHistory.end), "MM/dd/yyyy");
    var DocCode = $('#txtDocCode').val();
    var combobox = $("#combotask").data("kendoComboBox")._valueBeforeCascade;
    var task = combobox;

    if (fromAppHistoryDate == null) {
        fromAppHistoryDate = '';
    }
    if (toAppHistoryDate == null) {
        toAppHistoryDate = '';
    }
    if (task == '' || task == undefined) {
        task = 0;
    }
    var AppType = 0;
    if ($('#Approved').is(":checked")) {
        AppType = 1;
    }
    if ($('#NotApproved').is(":checked")) {
        AppType = 2;
    }
    if ($('#Approved').is(":checked") && $('#NotApproved').is(":checked")) {
        AppType = 0;
    }
    
    ajaxCall(fromAppHistoryDate, toAppHistoryDate, AppType, task, DocCode);
    var param = { "fromDate": fromAppHistoryDate, "toDate": toAppHistoryDate, "AppType": AppType, "DocCode": DocCode };
    console.log(param);
}

function ViewReport(ReportName,DocBaseID, DocID, DocVersion){
    var baseUrl = '/ApprovalSystem';
    var url = baseUrl + "/HTMLReport/" + ReportName + "?clientAgent=Web&userId=0 &docBaseId=" + DocBaseID + "&docCode=" + DocID + "&docVersion=" + DocVersion;
    window.open(url, '_blank');
}

