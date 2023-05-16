var SelectedDocNoArray = [];
var QueueList = [];
var UserList = [];
var SaveDocInfo = [];
var ApprovalPermissionList = [];
var ApprovalActionList = [
    {"ActionId":5 , "ActionName": "Approved"},{"ActionId":6 , "ActionName": "Recommend"},{"ActionId":7 , "ActionName": "Deny"},
    {"ActionId":8 , "ActionName": "Submit"},{"ActionId":9 , "ActionName": "Agree"},{"ActionId":71 , "ActionName": "Cancel Request"},
    {"ActionId":72 , "ActionName": "Recommend Cancel"},{"ActionId":73 , "ActionName": "Allow Cancel"},{"ActionId":74 , "ActionName": "Reject Cancelletion"},
    {"ActionId":90 , "ActionName": "Change Request"},{"ActionId":91 , "ActionName": "Disagree"},{"ActionId":92 , "ActionName": "Recommend Change"},
    {"ActionId":93 , "ActionName": "Job Create /Update"},
];

var SortItemList = [{"ID":1 , "Name": "In Time"}, {"ID":2 , "Name": "From Employee"}, {"ID":3 , "Name": "Doc Type"}];

$(document).ready(function () {
    var user = $('#username').val();
    LoadQueue();
    LoadUserList();
    LoadApprovalPermission();
    $("#ddlRecomToEmp").kendoComboBox({
        placeholder: 'Please Select Employee..',
        dataTextField: "EmpName",
        dataValueField: "ID",
        dataSource: [],
        filter: "contains",
        suggest: true,
        index: -1
    });
    $("#ddlRecomToEmp").data("kendoComboBox").value('');

    $("#ddlSentToEmpR").kendoComboBox({
        placeholder: 'Please Select Employee..',
        dataTextField: "EmpName",
        dataValueField: "ID",
        dataSource: [],
        filter: "contains",
        suggest: true,
        index: -1
    });
    $("#ddlSentToEmpR").data("kendoComboBox").value('');

    $("#ddlSentToEmpChange").kendoComboBox({
        placeholder: 'Please Select Employee..',
        dataTextField: "EmpName",
        dataValueField: "ID",
        dataSource: [],
        filter: "contains",
        suggest: true,
        index: -1
    });
    $("#ddlSentToEmpChange").data("kendoComboBox").value('');

    $("#ddlSentToEmpCancel").kendoComboBox({
        placeholder: 'Please Select Employee..',
        dataTextField: "EmpName",
        dataValueField: "ID",
        dataSource: [],
        filter: "contains",
        suggest: true,
        index: -1
    });
    $("#ddlSentToEmpCancel").data("kendoComboBox").value('');

    $("#cmbSortData").kendoComboBox({
        placeholder: 'Select Sort By..',
        dataTextField: "Name",
        dataValueField: "ID",
        dataSource: SortItemList,
        filter: "contains",
        suggest: true,
        index: -1,
        change: function (e) {
            e._defaultPrevented = true;
            var value = this.value();
            onSortItemChange(value);
        }
    });
    $("#cmbSortData").data("kendoComboBox").value('');

    $("#txtNote").keypress(function(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            $("#btnSendRecommend").focus();
        }
    });
    $("#txtNoteDeny").keypress(function(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            $("#btnSendDeny").focus();
        }
    });

    $('#mdlRecommend').on('hidden.bs.modal', function () { 
        $('#recomDocCode').html('');
        $('#chkNotify').prop('checked',false);
        ShowButtonOnModalClose();
    });

    $('#mdlRecommendChange').on('hidden.bs.modal', function () { 
        $('#recomChangeDocCode').html('');
        $('#recomChangeHeaderDoc').html('');
        $("#txtChangeNote").val('');
        $('#chkChangeNotify').prop('checked',false);
        $("#ddlSentToEmpChange").data("kendoComboBox").value('');
        ShowButtonOnModalClose();
    });

    $('#mdlRecommendCancel').on('hidden.bs.modal', function () { 
        $('#recomCancelDocCode').html('');
        $('#recomCancelHeaderDoc').html('');
        $("#txtCancelNote").val('');
        $('#chkCancelNotify').prop('checked',false);
        $("#ddlSentToEmpCancel").data("kendoComboBox").value('');
        ShowButtonOnModalClose();
    });

    $('#mdlDisagree').on('shown.bs.modal', function() {
        $("#txtNoteDisagree").focus();
    });

    $('#mdlDisagree').on('hidden.bs.modal', function () {  
        $("#disagreeHeaderDoc").html('');
        $('#disagreeDocCode').html('');  
        ShowButtonOnModalClose();
    });

    $('#mdlReject').on('shown.bs.modal', function() {
        $("#txtNoteReject").focus();
    });

    $('#mdlReject').on('hidden.bs.modal', function () { 
        $("#rejectHeaderDoc").html('');
        $("#RejectDocCode").html('');     
        ShowButtonOnModalClose();
    });

    $('#mdlDeny').on('shown.bs.modal', function() {
        $("#txtNoteDeny").focus();
    });

    $('#mdlDeny').on('hidden.bs.modal', function () {
        $('#DenyDocCode').html('');       
        ShowButtonOnModalClose();
    });

    $('#mdlReport').on('hidden.bs.modal', function () {
        ShowButtonOnModalClose();
        $('#reportGrid').attr('src', "");
        $('#chkNotifyR').prop('checked',false);
    });

    $('#txtSearchData').on('input', function (e) {
        SearchDocument();
    }); 
});

function SearchDocument(){
    SelectedDocNoArray = [];
    var searchValue = $('#txtSearchData').val();
    $("#gridQueue").data("kendoGrid").dataSource.filter({
        logic  : "or",
        filters: [
          {
              field   : "InTime",
              operator: "contains",
              value   : searchValue
          },
          {
              field   : "DocType",
              operator: "contains",
              value   : searchValue
          },
          {
              field   : "DocDetails",
              operator: "contains",
              value   : searchValue
          },
          {
              field   : "DocSummary",
              operator: "contains",
              value   : searchValue
          },
          {
              field   : "FromEmp",
              operator: "contains",
              value   : searchValue
          }            
        ]
    });
    var grid = $("#gridQueue").getKendoGrid();
    grid.clearSelection();
    ShowButtonOnModalClose();
    ButtonShowOnHover();
}

function ShowButtonOnModalClose(){
    SelectedDocNoArray = [];
    var grid = $("#gridQueue").data("kendoGrid");
    var selected = grid.selectedKeyNames();
    SelectedDocNoArray = selected;
    if (SelectedDocNoArray.length != 0) { 
        var Data = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        var buttonList = Data[0].btnList.split(',');
        var PermissionData = _.filter(buttonList, function (item) { return item == '5'; });
        if (PermissionData.length > 0) {
            $("#btnApprove").show();
        }
        else{
            $("#btnApprove").hide();
        }
        $("#btnRecommend").show();
    }
    else{
        $("#btnApprove").hide();
        $("#btnRecommend").hide();
    }
}

function onSortItemChange(Id) {
    if (Id == '1') {
        QueueList = _.sortBy(QueueList, 'ID').reverse();;
    }
    else if (Id == '2') {
        QueueList = _.sortBy(QueueList, 'FromEmp');
    }
    else if (Id == '3') {
        QueueList = _.sortBy(QueueList, 'DocType');
    }
    else{
        QueueList = _.sortBy(QueueList, 'ID').reverse();
    }
    GridBind();
    SearchDocument();
    //$("#cmbSortData").data("kendoComboBox").value(Id);
}

function LoadUserList() {
    $.ajax({
        url: 'Handlers/ApprovalHandler.ashx?MethodName=LoadUserList',
        type: 'POST',
        data: {},
        success: function (data) {
            var result = data;
            UserList = result;           
        },
        error: function (data) {
            popupNotification.error("Error Loading History Data")
        }
    });
}

function LoadApprovalPermission() {
    var obj = {};
    obj.DocBaseID = 0;
    var jsonData = JSON.stringify(obj);
    $.ajax({
        url: 'Handlers/ApprovalHandler.ashx?MethodName=GetApprovalPermission',
        type: 'POST',
        data: jsonData,
        success: function (data) {
            var result = JSON.parse(data);
            ApprovalPermissionList = result;             
        },
        error: function (data) {
            popupNotification.error("Error Loading History Data")
        }
    });
}

function LoadQueue() {
    $('#txtSearchData').val('');
    SelectedDocNoArray = [];
    SaveDocInfo = [];
    blockUI();
    $.ajax({
        url: 'Handlers/ApprovalHandler.ashx?MethodName=GetApprovalQueue',
        type: 'POST',
        data: {},
        success: function (data) {
            unblockUI();
            if(data =='logout'){
                var baseUrl = '/ApprovalSystem';
                var url = baseUrl + "/login.aspx";
                window.location.href=url;
            }
            else{
                var result = JSON.parse(data);
                QueueList = result
                //console.log(result);
                if (QueueList.length == 0) {
                    GridBind();
                }
                else {
                    QueueList = _.sortBy(QueueList, 'ID').reverse();
                    GridBind();
                } 
            }                     
        },
        error: function (data) {
            unblockUI();
            popupNotification.error("Error Loading History Data")
        }
    });
}

function GridBind(){
    $("#btnApprove").hide();
    $("#btnRecommend").hide();
    //$("#cmbSortData").data("kendoComboBox").value('');
    //$("#txtSearchData").val('');
    SelectedDocNoArray = [];
    $("#gridQueue").empty();
    $("#numerOfRequest").html(QueueList.length);
    //_.map(QueueList, function (obj) {
    //    obj.DocType_DocDetails = obj.DocType + '-' + obj.DocDetails;
    //});

    $("#QueueTable").show();    
    $("#gridQueue").kendoGrid({
        dataSource: {
            data: QueueList,
            schema: {
                model: {
                    id: "ID"
                }
            }
        },
        //height: 530,
        //sortable: true,
        change: onChange,
        width: 'auto',
        //toolbar: ["search"],
        columns: [
            { selectable: true, stickable: true, width: 10 },
            {
                template: "<div class='row'><div class='col-md-1' style='padding-right: 10px;'><a style='cursor:pointer;' onclick='ViewReport(\"#:reportName#\",\"#:DocBaseID#\",\"#:ID#\",\"#:DocCode#\",\"#:Version#\",\"#:ActionID#\")'><span class='dot' id='icon_#:ID#'>#:DocShortName#</span></a></div>"+
                          "<div  class='col-md-9'  style='padding-left: 0px;padding-right: 0px;'><p style='margin-bottom: 0px;'>#:InTime#</p><p style='margin-bottom: 0px;font-style: italic;'>#:FromEmp# <span style='cursor: pointer; color: blue;' class='tooltipData' id='tooltip_#:ID#'>More...</span></p></div></div>",
                field: "InTime", stickable: true,
                title: "Sender",
                width: 95,
            },
            {   
                template: function(o){
                    if(o.DocType.length <= 25){
                        return "<a style='cursor:pointer;' onclick='ViewReport(\""+ o.reportName +"\",\""+ o.DocBaseID +"\",\""+ o.ID +"\",\""+ o.DocCode +"\",\""+ o.Version +"\",\""+ o.ActionID +"\")'><p style='margin-bottom: 0px;color:blue;'><u>" + o.DocType + "</u></p> <p style='margin-bottom: 0px;'>"+ o.DocDetails+ "</p></a>";
                    }
                    else {
                        var subStr = o.DocType.substring(0, 22);
                        return "<a style='cursor:pointer;' onclick='ViewReport(\""+ o.reportName +"\",\""+ o.DocBaseID +"\",\""+ o.ID +"\",\""+ o.DocCode +"\",\""+ o.Version +"\",\""+ o.ActionID +"\")'><p style='margin-bottom: 0px;color:blue;'><u>" + subStr + "</u></p> <p style='margin-bottom: 0px;'>"+ o.DocDetails+ "</p></a>";
                    }
                },                   
                field: "DocType",
                title: "Doc Info",
                width: 40,
                stickable: true,

            },
            {
                field: "DocSummary",stickable: true,
                title: "Doc Summary",
                width: 190,
                template: function(o){
                    var textArea = document.createElement('textarea');
                    textArea.innerHTML = o.DocSummary;
                    if(textArea.value.length <= 200){
                        return "<div style='position: relative;'><div class='docSummary' id='docSummary_" + o.ID +"'>" + textArea.value + "</div>"+
                               "<div class='rowButton' id='buttons_" + o.ID +"' style='float:right;text-align: right;padding-left: 0px;padding-right: 0px;'></div></div>";
                    }
                    else {
                        var subStr = textArea.value.substring(0, 199);
                        return "<div style='position: relative;'><div class='docSummary' id='docSummary_" + o.ID +"'><p style='margin-bottom: 0px;'><span>" + subStr + "</span><span style='cursor: pointer; color: blue;' class='tooltipDocSummary' id='tooltipDocSummary_"+ o.ID +"'> More...</span></p></div>"+
                               "<div class='rowButton' id='buttons_" + o.ID +"' style='float:right;text-align: right;padding-left: 0px;padding-right: 0px;'></div></div>";
                    }
                }

            }, 
        ],
        noRecords: {
            template: "No document available in your queue."
        },        
        dataBound: function (e) {
            var grid = this;
            var rows = grid.items();
            $(rows).each(function (e) {
                var row = this;
                var dataItem = grid.dataItem(row);
                var BackgroundColor = dataItem.BackgroundColor;
                var ID  = dataItem.ID;
                var currenRow = grid.table.find("tr[data-uid='" + dataItem.uid + "']");
                $(currenRow).css("color", "black"); 
                if(BackgroundColor != '' && BackgroundColor != null){
                    $("#icon_"+ ID).css("background", "#"+BackgroundColor);
                }               
            });
        }
    });
    var TooltipData=[];
    $("#gridQueue").kendoTooltip({
        filter: "td .tooltipData", // tooltip elements of the Grid.
        position: "left",
        width: 800,
        //height:400,
        content: function (e) {
            var id = e.target[0].id;
            var docId = parseInt(id.split("_")[1]);
            var filterdata = _.filter(QueueList, function (o) { return o.ID == docId; });
            TooltipData=[];
            if(filterdata[0].approvalJson != "<NewDataSet/>" && filterdata[0].approvalJson != ""){                
                TooltipData = JSON.parse(filterdata[0].approvalJson);
                var html= '<table style="width:780px">'+
                        '<tr>'+
                           '<th style="border:.1pt solid black;">Action</th>' +
                           '<th style="border:.1pt solid black;">In Time</th>' +
                           '<th style="border:.1pt solid black;">From</th>' +
                           '<th style="border:.1pt solid black;">Designation</th>' +
                           '<th style="border:.1pt solid black;">Comment</th>' +
                        '</tr>';
                for(var i=0; i<TooltipData.length; i++){
                    html += '<tr>'+
                           '<td style="border:.1pt solid black;">'+ TooltipData[i].Approval_Action +'</td>' +
                           '<td style="border:.1pt solid black;">'+ TooltipData[i].Receive_Time +'</td>' +
                           '<td style="border:.1pt solid black;">'+ TooltipData[i].From_Employee +'</td>' +
                           '<td style="border:.1pt solid black;">'+ TooltipData[i].From_Employee_Desig +'</td>' +
                           '<td style="border:.1pt solid black;">'+ TooltipData[i].Comments +'</td>' +
                          '</tr>';
                }
                html += '</table>';  
                
                return html;
            }            
        },
        show: function (e) {           
            if(TooltipData.length ==0){    
                e.sender.popup.element.removeClass('tooltipHeight');
                e.sender.popup.element.addClass('tooltipNodata');
            }
            else{  
                e.sender.popup.element.removeClass('tooltipNodata');
                if(TooltipData.length > 8){
                    e.sender.popup.element.addClass('tooltipHeight');
                
                }
                else if (TooltipData.length <= 8){
                    e.sender.popup.element.removeClass('tooltipHeight');
                } 
            }            
        },
    }).data("kendoTooltip");

    $("#gridQueue").kendoTooltip({
        filter: "td .tooltipDocSummary", // tooltip elements of the Grid.
        position: "left",
        width: 500,
        content: function (e) {
            var id = e.target[0].id;
            var docId = parseInt(id.split("_")[1]);
            var filterdata = _.filter(QueueList, function (o) { return o.ID == docId; });
            var textArea = document.createElement('textarea');
            textArea.innerHTML = filterdata[0].DocSummary;
            return textArea.value;
        }
    }).data("kendoTooltip");

    ButtonShowOnHover();
    //$(window).scrollTop(0);
}

function ButtonShowOnHover(){
    $("#gridQueue > .k-grid-content > table > tbody > tr").hover(function(e) {       
        var grid = $("#gridQueue").data("kendoGrid");
        var tr = e.target.closest('tr');
        var dataItem = grid.dataItem(tr);
        var docId = dataItem.ID.toString();
        $(".rowButton").html('');
        var html = "<a onclick='ApproveDoc(\""+ docId + "\")' id='Approve_"+ docId + "' class='k-button success' style='cursor: pointer; min-width: 35px;display:none;' title='Approve'><i class='fa fa-check' aria-hidden='true'></i></a>" +
                   "<a onclick='RecommendDoc(\""+ docId + "\")' id='Recommend_"+ docId + "' class='k-button info' style='cursor: pointer; min-width: 35px;display:none;' title='Recommend'><i class='fa fa-paper-plane' aria-hidden='true'></i></a>" +
                   "<a onclick='DenyDoc(\""+ docId + "\")' id='Deny_"+ docId + "' class='k-button danger' style='cursor: pointer; min-width: 35px;display:none;' title='Deny'><i class='fa fa-reply' aria-hidden='true'></i></a>" +
                   "<a onclick='RecommendChangeModal(\""+ docId + "\")' id='RecommendChange_"+ docId + "' class='k-button info' style='cursor: pointer; min-width: 35px;display:none;' title='Recommend Change'><i class='fa fa-paper-plane' aria-hidden='true'></i></a>" +
                   "<a onclick='RecommendCancelModal(\""+ docId + "\")' id='RecommendCancel_"+ docId + "' class='k-button danger' style='cursor: pointer; min-width: 35px;display:none;' title='Recommend Cancel'><i class='fa fa-reply' aria-hidden='true'></i></a>" +
                   "<a onclick='AgreeChangeDoc(\""+ docId + "\",\"\",false)' id='AgreeChange_"+ docId + "' class='k-button success' style='cursor: pointer; min-width: 35px;display:none;' title='Agree Change'><i class='fa fa-check' aria-hidden='true'></i></a>" +
                   "<a onclick='DisagreeModalOpen(\""+ docId + "\")' id='DisagreeChange_"+ docId + "' class='k-button danger' style='cursor: pointer; min-width: 35px;display:none;' title='Disagree Change'><i class='fa fa-reply' aria-hidden='true'></i></a>" +
                   "<a onclick='AllowCancelDoc(\""+ docId + "\",\"\",false)' id='AllowCancel_"+ docId + "' class='k-button success' style='cursor: pointer; min-width: 35px;display:none;' title='Allow Cancel'><i class='fa fa-check' aria-hidden='true'></i></a>" +                 
                   "<a onclick='RejectModalOpen(\""+ docId + "\")' id='RefuseCancel_"+ docId + "' class='k-button danger' style='cursor: pointer; min-width: 35px;display:none;' title='Refuse Cancel'><i class='fa fa-reply' aria-hidden='true'></i></a>" ;     
        $("#buttons_"+ docId).html(html);
        $("#buttons_"+ docId).width("50%");
        $("#buttons_"+ docId).css("z-index", "10");
        $("#docSummary_"+ docId).css("position", "absolute");
       
        var buttonList = dataItem.btnList.split(',');
        for(var i = 0; i < buttonList.length; i++){
            if(buttonList[i] == "5"){
                $("#Approve_"+ docId).show();
            }
            else if(buttonList[i] == "6"){
                $("#Recommend_"+ docId).show();
            }
            else if(buttonList[i] == "7"){
                $("#Deny_"+ docId).show();
            }
            else if(buttonList[i] == "92"){
                $("#RecommendChange_"+ docId).show();
            }
            else if(buttonList[i] == "72"){
                $("#RecommendCancel_"+ docId).show();
            }
            else if(buttonList[i] == "9"){
                $("#AgreeChange_"+ docId).show();
            }
            else if(buttonList[i] == "91"){
                $("#DisagreeChange_"+ docId).show();
            }
            else if(buttonList[i] == "73"){
                $("#AllowCancel_"+ docId).show();
            }
            else if(buttonList[i] == "74"){
                $("#RefuseCancel_"+ docId).show();
            }          
        } 
    });
      
    $("#gridQueue > .k-grid-content > table > tbody > tr").mouseleave(function(e) {
        $(".rowButton").html('');
        $(".docSummary").css("position", "");
    });
}

function onChange(e) {
    row = $(this).closest("tr");
    row.removeClass("k-state-selected");
    row.removeAttr('aria-selected');
    var SelectedDocNo = this.selectedKeyNames();
    var PreviousList = SelectedDocNoArray;
    SelectedDocNoArray = [];
    if (SelectedDocNo.length != 0) {
        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNo });
        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
        var grpList = _.groupBy(SelectedList, function (itm) { return itm.DocType; });
        if (Object.keys(grpList).length > 1) {
            //popupNotification.warning('You can not select multiple types of document.');
            SelectedDocNoArray = PreviousList;

            var filterData = SelectedDocNo.filter(md => SelectedDocNoArray.every(fd => fd !== md));
            var datasource = $("#gridQueue").data("kendoGrid")._data;
            var FilterUID = _.filter(datasource, function (obj) { return obj.ID == filterData[0] });
            var grid = $("#gridQueue").data("kendoGrid");
            var row = $("#gridQueue").data("kendoGrid").tbody.find("tr[data-uid='" + FilterUID[0].uid + "']");
            grid._deselectCheckRows(row);
            $.alert({title: 'Warning', content: 'You can not select different types of document.',});  
        }
        else {
            SelectedDocNoArray = SelectedDocNo;
        }

        var Data = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        var buttonList = Data[0].btnList.split(',');
        var PermissionData = _.filter(buttonList, function (item) { return item == '5'; });
        if (PermissionData.length > 0) {
            $("#btnApprove").show();
        }
        else{
            $("#btnApprove").hide();
        }
        $("#btnRecommend").show();
    }
    else{
        $("#btnApprove").hide();
        $("#btnRecommend").hide();
    }
}

function ApproveDoc(id){
    var btnPosition = $("#Approve_"+id).position();
    var left= btnPosition.left;
    SelectedDocNoArray = [];
    var data = _.filter(QueueList, function (itm) { return itm.ID == parseInt(id) });   
    $.confirm({
        title: '',
        content: '<p><b>Are you sure to Approve? (Code: ' + data[0].DocCode + ')</b></p>',
        //onOpenBefore: function () {
        //    $(".btn-blue").css('border','2px solid red');
        //},          
        onOpen: function () {
            $(".btn-blue").focus();     
        },
        buttons: {
            confirm: {
                text: 'Yes',
                btnClass: 'btn-blue',
                action: function(){
                    SelectedDocNoArray.push(id);
                    SaveDocInfo = [];
                    if (SelectedDocNoArray.length > 0) {
                        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
                        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
                        for(var i=0; i < SelectedList.length; i++){
                            var obj = {};
                            obj.document_type = SelectedList[i].DocBaseID;
                            obj.document_code = SelectedList[i].DocCode;
                            obj.version = SelectedList[i].Version;
                            obj.note = '';
                            obj.DocSummary = '';
                            obj.DocContent = '';
                            obj.mainXMLOrJson = '';
                            obj.subreportXMLOrJson = '';
                            SaveDocInfo.push(obj)
                        }
                        SaveApprovalData(0,5,false);
                    }
                }
            },
            cancel:{
                text: 'No',
                btnClass: 'btn-warning',
                action: function(){
                    var grid = $("#gridQueue").data("kendoGrid");
                    var selected = grid.selectedKeyNames();
                    SelectedDocNoArray = selected;
                }
            }
        }
    });
}

function ApproveR(){
    var docID = $('#recomDocCode').html();
    var data = _.filter(QueueList, function (itm) { return itm.ID == parseInt(docID) });
    var Note  = $("#txtNoteR").val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    SelectedDocNoArray = [];
    $.confirm({
        title: '',
        content: '<p><b>Are you sure to Approve? (Code: ' + data[0].DocCode + ')</b></p>',
        onOpen: function () {
            $(".btn-blue").focus();
        },
        buttons: {
            confirm: {
                text: 'Yes',
                btnClass: 'btn-blue',
                action: function(){
                    SelectedDocNoArray.push(docID);
                    SaveDocInfo = [];
                    if (SelectedDocNoArray.length > 0) {
                        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
                        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
                        for(var i=0; i < SelectedList.length; i++){
                            var obj = {};
                            obj.document_type = SelectedList[i].DocBaseID;
                            obj.document_code = SelectedList[i].DocCode;
                            obj.version = SelectedList[i].Version;
                            obj.note = Note;
                            obj.DocSummary = '';
                            obj.DocContent = '';
                            obj.mainXMLOrJson = '';
                            obj.subreportXMLOrJson = '';
                            SaveDocInfo.push(obj)
                        }
                        SaveApprovalData(0,5,false);
                    }
                }
            },
            cancel:{
                text: 'No',
                btnClass: 'btn-warning',
            }
        }
    });
}

function BulkApprove() {
    SaveDocInfo = [];
    if (SelectedDocNoArray.length > 0) {
        var Data = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        var docCodes = '';
        for(var i=0; i < Data.length; i++){
            docCodes += (i == 0 ? Data[i].DocCode : ', ' + Data[i].DocCode);
        }
        var PermissionData = _.filter(ApprovalPermissionList, function (o) { return o.Doc_Base_ID == parseInt(Data[0].DocBaseID); });
        if (PermissionData.length > 0) {
            $.confirm({
                title: '',
                content: '<p><b>Are you sure to Approve?</b></p><p style="margin-bottom: 0px;">Type: '+ Data[0].DocType + '</p><p>Code: ' + docCodes + '</p>',
                onOpen: function () {
                    $(".btn-blue").focus();
                },
                buttons: {
                    confirm: {
                        text: 'Yes',
                        btnClass: 'btn-blue',
                        action: function(){
                            var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
                            SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
                            for(var i=0; i < SelectedList.length; i++){
                                var obj = {};
                                obj.document_type = SelectedList[i].DocBaseID;
                                obj.document_code = SelectedList[i].DocCode;
                                obj.version = SelectedList[i].Version;
                                obj.note = '';
                                obj.DocSummary = '';
                                obj.DocContent = '';
                                obj.mainXMLOrJson = '';
                                obj.subreportXMLOrJson = '';
                                SaveDocInfo.push(obj)
                            }
                            SaveApprovalData(0,5,false);
                        }
                    },
                    cancel:{
                        text: 'No',
                        btnClass: 'btn-warning',
                    }
                }
            });           
        }
        else {
            $.alert({title: 'Warning', content: 'You are not permitted to Approve "' + Data[0].DocType + '"',});
        }        
    }
    else {
        $.alert({title: 'Warning', content: 'Select Document To Approve.',});
    }
}

function RecommendDoc(id){
    $("#gridQueue > .k-grid-content > table > tbody > tr").mouseleave();
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(id);
    RecommendModal();
}

function RecommendModal() {
    $('#recomHeaderDoc').html('');
    $("#txtSearchRecEmp").val('');
    $("#txtNote").val('');
    $('#chkNotify').prop('checked',false);
    $("#ddlRecomToEmp").data("kendoComboBox").value('');
    if (SelectedDocNoArray.length > 0) {
        $('#recomHeaderDoc').html();
        $('#btnApprove').hide();
        $('#btnRecommend').hide();
        //$('#btnDeny').hide();
        var SelectedList =  _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
        if(SelectedList.length==1){
            $('#recomHeaderDoc').html('(Type: '+ SelectedList[0].DocType + ', Code: ' + SelectedList[0].DocDetails + ')');
        }
        else{
            $('#recomHeaderDoc').html('(Type: '+ SelectedList[0].DocType + ')');
        }
        var obj = {};
        obj.DocBaseID = parseInt(SelectedList[0].DocBaseID);
        obj.ActionID = 6;
        var docInfo = '';
        for(var i=0; i < SelectedList.length; i++){
            docInfo += (i == 0 ? (SelectedList[i].DocCode + '#' + SelectedList[i].Version+ '#' + SelectedList[i].FromEmpId) : ',' + (SelectedList[i].DocCode + '#' + SelectedList[i].Version+ '#' + SelectedList[i].FromEmpId)) ;
        }
        obj.DocInfo =  docInfo;
        var jsonData = JSON.stringify(obj);

        $.ajax({
            url: 'Handlers/ApprovalHandler.ashx?MethodName=LoadSuggestedUserList',
            type: 'POST',
            data: jsonData,
            success: function (data) {
                var result = JSON.parse(data);;
                if (result.length > 0) {
                    _.map(result, function (obj) {
                        obj.EmpName = obj.Name + ' (' + obj.Designation+ ')';
                    });
                    var ddlEmployee = $("#ddlRecomToEmp").data("kendoComboBox");
                    ddlEmployee.setDataSource(result);
                    $("#ddlRecomToEmp").data("kendoComboBox").value(result[0].ID);                    
                    var Empdata = _.filter(UserList , function(o){ return o.ID == result[0].ID});
                    if (Empdata.length > 0) {
                        $("#lblDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                        $("#lblDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
                    }
                    else{
                        $("#lblDesignation").html('<span style="color:#1919b9;">Designation: </span>' + result[0].Designation);
                        $("#lblDepartment").html('<span style="color:#1919b9;">Department: </span>' + result[0].Department );
                    }                                      
                }  
                else{
                    var ddlEmployee = $("#ddlRecomToEmp").data("kendoComboBox");
                    ddlEmployee.setDataSource([]);
                    $("#ddlRecomToEmp").data("kendoComboBox").value('');
                    $("#lblDesignation").html('');
                    $("#lblDepartment").html('');
                }
            },
            error: function (data) {
                popupNotification.error("Error Loading User Data")
            }
        });
        $('#mdlRecommend').modal('toggle');
        return;
    }
    else {
        $.alert({title: 'Warning', content: 'Select Document To Recommend.',});  
    }
}

function RecommendR(){
    var docId = $('#recomDocCode').html();
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(docId);
    var EmpId  = $("#ddlSentToEmpR").data("kendoComboBox").value();
    var Note  = $("#txtNoteR").val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    var IsNotify = $('#chkNotifyR').prop('checked');
    if(EmpId == ''){
        $.alert({title: 'Warning', content: 'Please Select "To Employee"',});
    }
    else{
        SaveDocInfo = [];
        if (SelectedDocNoArray.length > 0) {
            var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
            SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
            for(var i=0; i < SelectedList.length; i++){
                var obj = {};
                obj.document_type = SelectedList[i].DocBaseID;
                obj.document_code = SelectedList[i].DocCode;
                obj.version = SelectedList[i].Version;
                obj.note = Note;
                obj.DocSummary = '';
                obj.DocContent = '';
                obj.mainXMLOrJson = '';
                obj.subreportXMLOrJson = '';
                SaveDocInfo.push(obj)
            }
            SaveApprovalData(EmpId,6,IsNotify)
        }
        else {
            popupNotification.warning('Select Document To Recommend.');
        }
        $('#mdlReport').modal('hide');
    }
}

function BulkRecommend(){
    var EmpId  = $("#ddlRecomToEmp").data("kendoComboBox").value();
    var Note  = $("#txtNote").val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    var IsNotify = $('#chkNotify').prop('checked');
    if(EmpId == ''){
        $.alert({title: 'Warning', content: 'Please Select "To Employee"',});
    }
    else{
        SaveDocInfo = [];
        if (SelectedDocNoArray.length > 0) {
            var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
            SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
            for(var i=0; i < SelectedList.length; i++){
                var obj = {};
                obj.document_type = SelectedList[i].DocBaseID;
                obj.document_code = SelectedList[i].DocCode;
                obj.version = SelectedList[i].Version;
                obj.note = Note;
                obj.DocSummary = '';
                obj.DocContent = '';
                obj.mainXMLOrJson = '';
                obj.subreportXMLOrJson = '';
                SaveDocInfo.push(obj)
            }
            SaveApprovalData(EmpId,6,IsNotify)
        }
        else {
            $.alert({title: 'Warning', content: 'Select Document To Recommend.',});  
        }
        $('#mdlRecommend').modal('hide');
    }
}

function DenyDoc(id){
    $("#gridQueue > .k-grid-content > table > tbody > tr").mouseleave();
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(id);
    DenyModal();
}

function DenyModal() {
    $("#denyHeaderDoc").html('');
    $("#txtNoteDeny").val('');
    if (SelectedDocNoArray.length > 0) {
        var data =  _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        if(data.length==1){
            $('#denyHeaderDoc').html('(' + data[0].DocDetails + ')');
        }
        $("#txtSearchRecEmp").val('');
        $('#btnApprove').hide();
        $('#btnRecommend').hide();
        //$('#btnDeny').hide();
        $('#mdlDeny').modal('toggle');      
        return;
    }
    else {
        $.alert({title: 'Warning', content: 'Select Document To Deny.',});  
    }
}

function DenySave(){
    var Note  = $('#txtNoteDeny').val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    if(Note == ''){
        $.alert({
            title: 'Warning', 
            content: 'Please Provide Deny Note',
            onDestroy: function() {
                $("#txtNoteDeny").focus();
            }
        }); 
    }
    else if(Note.length < 2){  
        $.alert({
            title: 'Warning', 
            content: 'Please insert at least 2 characters for deny note',
            onDestroy: function() {
                $("#txtNoteDeny").focus();
            }
        });        
    }
    else{
        SaveDocInfo = [];
        if (SelectedDocNoArray.length > 0) {
            var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
            SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
            for(var i=0; i < SelectedList.length; i++){
                var obj = {};
                obj.document_type = SelectedList[i].DocBaseID;
                obj.document_code = SelectedList[i].DocCode;
                obj.version = SelectedList[i].Version;
                obj.note = Note;
                obj.DocSummary = '';
                obj.DocContent = '';
                obj.mainXMLOrJson = '';
                obj.subreportXMLOrJson = '';
                SaveDocInfo.push(obj)
            }
            SaveApprovalData(0,7,false)
        }
        else {
            popupNotification.warning('Select Document To Deny.');
        }
        $('#mdlDeny').modal('hide');
    }
}

function DenyR(){
    var docId = $('#recomDocCode').html();
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(docId);
    var Note  = $('#txtNoteR').val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    if(Note == ''){  
        $.alert({
            title: 'Warning', 
            content: 'Please Provide Deny Note',
            onDestroy: function() {
                $("#txtNoteR").focus();
            }
        });        
    }
    else if(Note.length < 2){  
        $.alert({
            title: 'Warning', 
            content: 'Please insert at least 2 characters for deny note',
            onDestroy: function() {
                $("#txtNoteR").focus();
            }
        });        
    }
    else{
        SaveDocInfo = [];
        if (SelectedDocNoArray.length > 0) {
            var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
            SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
            for(var i=0; i < SelectedList.length; i++){
                var obj = {};
                obj.document_type = SelectedList[i].DocBaseID;
                obj.document_code = SelectedList[i].DocCode;
                obj.version = SelectedList[i].Version;
                obj.note = Note;
                obj.DocSummary = '';
                obj.DocContent = '';
                obj.mainXMLOrJson = '';
                obj.subreportXMLOrJson = '';
                SaveDocInfo.push(obj)
            }
            SaveApprovalData(0,7,false)
        }
        else {
            popupNotification.warning('Select Document To Deny.');
        }
        $('#mdlReport').modal('hide');
    }
}

function RecommendChangeR(){
    var docId = $('#recomDocCode').html();
    var Note  = $("#txtNoteR").val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    var IsNotify = $('#chkNotifyR').prop('checked');
    var EmpId  = $("#ddlSentToEmpR").data("kendoComboBox").value();
    if(EmpId == ''){
        $.alert({title: 'Warning', content: 'Please Select "To Employee"',});
    }
    else{
        RecommendChangeDoc(EmpId,docId,Note,IsNotify);
        $('#mdlReport').modal('hide');
    }
}

function RecommendChangeModal(docId){
    $('#recomChangeDocCode').html('');
    $('#recomChangeHeaderDoc').html('');
    $("#txtChangeNote").val('');
    $('#chkChangeNotify').prop('checked',false);
    $("#ddlSentToEmpChange").data("kendoComboBox").value('');
    var data =  _.filter(QueueList, function (itm) { return itm.ID.toString()== docId; });
    if (data.length > 0) {      
        $('#recomChangeHeaderDoc').html('(' + data[0].DocDetails + ')');
        $('#recomChangeDocCode').html(data[0].ID);
        $('#btnApprove').hide();
        $('#btnRecommend').hide();

        var obj = {};
        obj.DocBaseID = parseInt(data[0].DocBaseID);
        obj.ActionID = 92;
        var docInfo = '';
        for(var i=0; i < data.length; i++){
            docInfo += (i == 0 ? (data[i].DocCode + '#' + data[i].Version+ '#' + data[i].FromEmpId) : ',' + (data[i].DocCode + '#' + data[i].Version+ '#' + data[i].FromEmpId)) ;
        }
        obj.DocInfo =  docInfo;
        var jsonData = JSON.stringify(obj);

        $.ajax({
            url: 'Handlers/ApprovalHandler.ashx?MethodName=LoadSuggestedUserList',
            type: 'POST',
            data: jsonData,
            success: function (data) {
                var result = JSON.parse(data);;
                if (result.length > 0) {
                    _.map(result, function (obj) {
                        obj.EmpName = obj.Name + ' (' + obj.Designation+ ')';
                    });
                    var ddlEmployee = $("#ddlSentToEmpChange").data("kendoComboBox");
                    ddlEmployee.setDataSource(result);
                    $("#ddlSentToEmpChange").data("kendoComboBox").value(result[0].ID);                    
                    var Empdata = _.filter(UserList , function(o){ return o.ID == result[0].ID});
                    if (Empdata.length > 0) {
                        $("#lblChangeDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                        $("#lblChangeDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
                    }
                    else{
                        $("#lblChangeDesignation").html('<span style="color:#1919b9;">Designation: </span>' + result[0].Designation);
                        $("#lblChangeDepartment").html('<span style="color:#1919b9;">Department: </span>' + result[0].Department );
                    }                                      
                }  
                else{
                    var ddlEmployee = $("#ddlSentToEmpChange").data("kendoComboBox");
                    ddlEmployee.setDataSource([]);
                    $("#ddlSentToEmpChange").data("kendoComboBox").value('');
                    $("#lblChangeDesignation").html('');
                    $("#lblChangeDepartment").html('');
                }
            },
            error: function (data) {
                popupNotification.error("Error Loading User Data")
            }
        });
        $('#mdlRecommendChange').modal('toggle');      
        return;
    }
    else {
        $.alert({title: 'Warning', content: 'No Document Found To Recommend Change.',});  
    }
}

function SaveRecommendChange(){
    var docId = $('#recomChangeDocCode').html();
    var Note  = $('#txtChangeNote').val().trim().replace("'", '');
    Note  = Note.replace('"', ''); 
    var IsNotify = $('#chkChangeNotify').prop('checked');
    var EmpId  = $("#ddlSentToEmpChange").data("kendoComboBox").value();
    if(EmpId == ''){
        $.alert({title: 'Warning', content: 'Please Select "To Employee"',});
    }
    else{
        RecommendChangeDoc(EmpId,docId,Note,IsNotify);
        $('#mdlRecommendChange').modal('hide');
    }   
}

function RecommendChangeDoc(EmpId,docId,Note,IsNotify){
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(docId);     
    SaveDocInfo = [];
    if (SelectedDocNoArray.length > 0) {
        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
        for(var i=0; i < SelectedList.length; i++){
            var obj = {};
            obj.document_type = SelectedList[i].DocBaseID;
            obj.document_code = SelectedList[i].DocCode;
            obj.version = SelectedList[i].Version;
            obj.note = Note;
            obj.DocSummary = '';
            obj.DocContent = '';
            obj.mainXMLOrJson = '';
            obj.subreportXMLOrJson = '';
            SaveDocInfo.push(obj)
        }
        SaveApprovalData(EmpId,92,IsNotify)
    }
    else {
        popupNotification.warning('Select Document To Recommend Change.');
    }
}

function RecommendCancelR(){
    var docId = $('#recomDocCode').html();
    var Note  = $("#txtNoteR").val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    var IsNotify = $('#chkNotifyR').prop('checked');
    var EmpId  = $("#ddlSentToEmpR").data("kendoComboBox").value();
    if(EmpId == ''){
        $.alert({title: 'Warning', content: 'Please Select "To Employee"',});
    }
    else{
        RecommendCancelDoc(EmpId,docId,Note,IsNotify);
        $('#mdlReport').modal('hide');
    }   
}

function RecommendCancelModal(docId){
    $('#recomCancelDocCode').html('');
    $('#recomCancelHeaderDoc').html('');
    $("#txtCancelNote").val('');
    $('#chkCancelNotify').prop('checked',false);
    $("#ddlSentToEmpCancel").data("kendoComboBox").value('');
    var data =  _.filter(QueueList, function (itm) { return itm.ID.toString()== docId; });
    if (data.length > 0) {      
        $('#recomCancelHeaderDoc').html('(' + data[0].DocDetails + ')');
        $('#recomCancelDocCode').html(data[0].ID);
        $('#btnApprove').hide();
        $('#btnRecommend').hide();

        var obj = {};
        obj.DocBaseID = parseInt(data[0].DocBaseID);
        obj.ActionID = 92;
        var docInfo = '';
        for(var i=0; i < data.length; i++){
            docInfo += (i == 0 ? (data[i].DocCode + '#' + data[i].Version+ '#' + data[i].FromEmpId) : ',' + (data[i].DocCode + '#' + data[i].Version+ '#' + data[i].FromEmpId)) ;
        }
        obj.DocInfo =  docInfo;
        var jsonData = JSON.stringify(obj);

        $.ajax({
            url: 'Handlers/ApprovalHandler.ashx?MethodName=LoadSuggestedUserList',
            type: 'POST',
            data: jsonData,
            success: function (data) {
                var result = JSON.parse(data);;
                if (result.length > 0) {
                    _.map(result, function (obj) {
                        obj.EmpName = obj.Name + ' (' + obj.Designation+ ')';
                    });
                    var ddlEmployee = $("#ddlSentToEmpCancel").data("kendoComboBox");
                    ddlEmployee.setDataSource(result);
                    $("#ddlSentToEmpCancel").data("kendoComboBox").value(result[0].ID);                    
                    var Empdata = _.filter(UserList , function(o){ return o.ID == result[0].ID});
                    if (Empdata.length > 0) {
                        $("#lblCancelDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                        $("#lblCancelDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
                    }
                    else{
                        $("#lblCancelDesignation").html('<span style="color:#1919b9;">Designation: </span>' + result[0].Designation);
                        $("#lblCancelDepartment").html('<span style="color:#1919b9;">Department: </span>' + result[0].Department );
                    }                                      
                }  
                else{
                    var ddlEmployee = $("#ddlSentToEmpCancel").data("kendoComboBox");
                    ddlEmployee.setDataSource([]);
                    $("#ddlSentToEmpCancel").data("kendoComboBox").value('');
                    $("#lblCancelDesignation").html('');
                    $("#lblCancelDepartment").html('');
                }
            },
            error: function (data) {
                popupNotification.error("Error Loading User Data")
            }
        });
        $('#mdlRecommendCancel').modal('toggle');      
        return;
    }
    else {
        $.alert({title: 'Warning', content: 'No Document Found To Recommend Cancel.',});  
    }
}

function SaveRecommendCancel(){
    var docId = $('#recomCancelDocCode').html();
    var Note  = $('#txtCancelNote').val().trim().replace("'", '');
    Note  = Note.replace('"', ''); 
    var IsNotify = $('#chkCancelNotify').prop('checked');
    var EmpId  = $("#ddlSentToEmpCancel").data("kendoComboBox").value();
    if(EmpId == ''){
        $.alert({title: 'Warning', content: 'Please Select "To Employee"',});
    }
    else{
        RecommendCancelDoc(EmpId,docId,Note,IsNotify);
        $('#mdlRecommendCancel').modal('hide');
    }   
    
}

function RecommendCancelDoc(EmpId,docId,Note,IsNotify){
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(docId);   
    SaveDocInfo = [];
    if (SelectedDocNoArray.length > 0) {
        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
        for(var i=0; i < SelectedList.length; i++){
            var obj = {};
            obj.document_type = SelectedList[i].DocBaseID;
            obj.document_code = SelectedList[i].DocCode;
            obj.version = SelectedList[i].Version;
            obj.note = Note;
            obj.DocSummary = '';
            obj.DocContent = '';
            obj.mainXMLOrJson = '';
            obj.subreportXMLOrJson = '';
            SaveDocInfo.push(obj)
        }
        SaveApprovalData(EmpId,72,IsNotify)
    }
    else {
        popupNotification.warning('Select Document To Recommend Cancel.');
    }
}

function AgreeChangeR(){
    var docId = $('#recomDocCode').html();
    var data = _.filter(QueueList, function (itm) { return itm.ID == parseInt(docId) });
    $.confirm({
        title: '',
        content: '<p><b>Are you sure to Agree? (Code: ' + data[0].DocCode + ')</b></p>',
        onOpen: function () {
            $(".btn-blue").focus();
        },
        buttons: {
            confirm: {
                text: 'Yes',
                btnClass: 'btn-blue',
                action: function(){                    
                    var Note  = $("#txtNoteR").val().trim().replace("'", '');
                    Note  = Note.replace('"', '');
                    var IsNotify = $('#chkNotifyR').prop('checked');
                    AgreeChangeSave(docId,Note,IsNotify);
                    $('#mdlReport').modal('hide');
                }
            },
            cancel:{
                text: 'No',
                btnClass: 'btn-warning',
            }
        }
    });   
}

function AgreeChangeDoc(docId,Note,IsNotify){
    var data = _.filter(QueueList, function (itm) { return itm.ID == parseInt(docId) });
    $.confirm({
        title: '',
        content: '<p><b>Are you sure to Agree? (Code: ' + data[0].DocCode + ')</b></p>',
        onOpen: function () {
            $(".btn-blue").focus();
        },
        buttons: {
            confirm: {
                text: 'Yes',
                btnClass: 'btn-blue',
                action: function(){
                    AgreeChangeSave(docId,'',IsNotify)
                }
            },
            cancel:{
                text: 'No',
                btnClass: 'btn-warning',
            }
        }
    });   
}

function AgreeChangeSave(docId,Note,IsNotify){
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(docId);   
    SaveDocInfo = [];
    if (SelectedDocNoArray.length > 0) {
        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
        for(var i=0; i < SelectedList.length; i++){
            var obj = {};
            obj.document_type = SelectedList[i].DocBaseID;
            obj.document_code = SelectedList[i].DocCode;
            obj.version = SelectedList[i].Version;
            obj.note = Note;
            obj.DocSummary = '';
            obj.DocContent = '';
            obj.mainXMLOrJson = '';
            obj.subreportXMLOrJson = '';
            SaveDocInfo.push(obj)
        }
        SaveApprovalData(0,9,IsNotify)
    }
    else {
        popupNotification.warning('Select Document To Recommend.');
    }
}

function DisagreeChangeR(){
    var docId = $('#recomDocCode').html();
    var Note  = $('#txtNoteR').val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    var IsNotify = $('#chkNotifyR').prop('checked');
    if(Note == ''){  
        $.alert({
            title: 'Warning', 
            content: 'Please Provide Disagree Note',
            onDestroy: function() {
                $("#txtNoteR").focus();
            }
        });        
    }
    else if(Note.length < 2){  
        $.alert({
            title: 'Warning', 
            content: 'Please insert at least 2 characters for disagree note',
            onDestroy: function() {
                $("#txtNoteR").focus();
            }
        });        
    }
    else{
        DisagreeChangeDoc(docId,Note,IsNotify);
        $('#mdlReport').modal('hide');
    }
}

function DisagreeModalOpen(docId){    
    $("#disagreeHeaderDoc").html('');
    $('#disagreeDocCode').html('');
    $("#txtNoteDisagree").val('');
    var data =  _.filter(QueueList, function (itm) { return itm.ID.toString()== docId; });
    if (data.length > 0) {      
        $('#disagreeHeaderDoc').html('(' + data[0].DocDetails + ')');
        $('#disagreeDocCode').html(data[0].ID);
        $('#btnApprove').hide();
        $('#btnRecommend').hide();
        $('#mdlDisagree').modal('toggle');      
        return;
    }
    else {
        $.alert({title: 'Warning', content: 'No Document Found To Disagree.',});  
    }
}

function DisagreeSave(){
    var docId = $('#disagreeDocCode').html();
    var Note  = $('#txtNoteDisagree').val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    if(Note == ''){
        $.alert({
            title: 'Warning', 
            content: 'Please Provide Disagree Note',
            onDestroy: function() {
                $("#txtNoteDisagree").focus();
            }
        }); 
    }
    else if(Note.length < 2){  
        $.alert({
            title: 'Warning', 
            content: 'Please insert at least 2 characters for disagree note',
            onDestroy: function() {
                $("#txtNoteDisagree").focus();
            }
        });        
    }
    else{
        DisagreeChangeDoc(docId,Note,false);
        $('#mdlDisagree').modal('hide');
    }
}

function DisagreeChangeDoc(docId,Note,IsNotify){
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(docId);
    SaveDocInfo = [];
    if (SelectedDocNoArray.length > 0) {
        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
        for(var i=0; i < SelectedList.length; i++){
            var obj = {};
            obj.document_type = SelectedList[i].DocBaseID;
            obj.document_code = SelectedList[i].DocCode;
            obj.version = SelectedList[i].Version;
            obj.note = Note;
            obj.DocSummary = '';
            obj.DocContent = '';
            obj.mainXMLOrJson = '';
            obj.subreportXMLOrJson = '';
            SaveDocInfo.push(obj)
        }
        SaveApprovalData(0,91,IsNotify)
    }
    else {
        popupNotification.warning('Select Document To Recommend.');
    }
}

function AllowCancelR(){
    var docId = $('#recomDocCode').html();
    var Note  = $('#txtNoteR').val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    var IsNotify = $('#chkNotifyR').prop('checked');
    AllowCancelDoc(docId,Note,IsNotify);
    $('#mdlReport').modal('hide');
}

function AllowCancelDoc(docId,Note,IsNotify){
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(docId);
    SaveDocInfo = [];
    if (SelectedDocNoArray.length > 0) {
        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
        for(var i=0; i < SelectedList.length; i++){
            var obj = {};
            obj.document_type = SelectedList[i].DocBaseID;
            obj.document_code = SelectedList[i].DocCode;
            obj.version = SelectedList[i].Version;
            obj.note = Note;
            obj.DocSummary = '';
            obj.DocContent = '';
            obj.mainXMLOrJson = '';
            obj.subreportXMLOrJson = '';
            SaveDocInfo.push(obj)
        }
        SaveApprovalData(0,73,IsNotify)
    }
    else {
        popupNotification.warning('Select Document To Recommend.');
    }
}

function RejectCancelR(){
    var docId = $('#recomDocCode').html();
    var Note  = $('#txtNoteR').val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    var IsNotify = $('#chkNotifyR').prop('checked');
    if(Note == ''){  
        $.alert({
            title: 'Warning', 
            content: 'Please Provide Reject Cancel Note',
            onDestroy: function() {
                $("#txtNoteR").focus();
            }
        });        
    }
    else if(Note.length < 2){  
        $.alert({
            title: 'Warning', 
            content: 'Please insert at least 2 characters for reject cancel note',
            onDestroy: function() {
                $("#txtNoteR").focus();
            }
        });        
    }
    else{
        RejectCancelDoc(docId,Note,IsNotify);
        $('#mdlReport').modal('hide');
    }
}

function RejectModalOpen(docId){    
    $("#rejectHeaderDoc").html('');
    $("#RejectDocCode").html('');
    $("#txtNoteReject").val('');
    var data =  _.filter(QueueList, function (itm) { return itm.ID.toString()== docId; });
    if (data.length > 0) { 
        $('#rejectHeaderDoc').html('(' + data[0].DocDetails + ')');
        $('#RejectDocCode').html(data[0].ID);
        $('#btnApprove').hide();
        $('#btnRecommend').hide();
        $('#mdlReject').modal('toggle');      
        return;
    }
    else {
        $.alert({title: 'Warning', content: 'No Document Found To Reject.',});  
    }
}

function RejectSave(){
    var docId = $('#RejectDocCode').html();
    var Note  = $('#txtNoteReject').val().trim().replace("'", '');
    Note  = Note.replace('"', '');
    if(Note == ''){
        $.alert({
            title: 'Warning', 
            content: 'Please Provide Reject Note',
            onDestroy: function() {
                $("#txtNoteReject").focus();
            }
        }); 
    }
    else if(Note.length < 2){  
        $.alert({
            title: 'Warning', 
            content: 'Please insert at least 2 characters for reject note',
            onDestroy: function() {
                $("#txtNoteReject").focus();
            }
        });        
    }
    else{
        RejectCancelDoc(docId,Note,false);
        $('#mdlReject').modal('hide');
    }
}

function RejectCancelDoc(docId,Note,IsNotify){
    SelectedDocNoArray = [];
    SelectedDocNoArray.push(docId);
    SaveDocInfo = [];
    if (SelectedDocNoArray.length > 0) {
        var SelectedList = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
        SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
        for(var i=0; i < SelectedList.length; i++){
            var obj = {};
            obj.document_type = SelectedList[i].DocBaseID;
            obj.document_code = SelectedList[i].DocCode;
            obj.version = SelectedList[i].Version;
            obj.note = Note;
            obj.DocSummary = '';
            obj.DocContent = '';
            obj.mainXMLOrJson = '';
            obj.subreportXMLOrJson = '';
            SaveDocInfo.push(obj)
        }
        SaveApprovalData(0,74,IsNotify)
    }
    else {
        popupNotification.warning('Select Document To Recommend.');
    }
}

function ViewReport(ReportName, DocBaseID, DocID, DocCode, DocVersion,ActionID) {
    $("#gridQueue > .k-grid-content > table > tbody > tr").mouseleave();
    $("#txtSearchRecEmpR").val('');
    $("#txtNoteR").val('');
    $('#recomDocCode').html(DocID);
    $('#btnApprove').hide();
    $('#btnRecommend').hide();
    //$('#btnDeny').hide();
    $("#ddlSentToEmpR").data("kendoComboBox").value('');
    $('#chkNotifyR').prop('checked',false);
    $('#mdlReport').modal('toggle'); 
    ShowHideReportButton(DocID);
   
    //blockUI();
    $('#iframeContainer').block({ 
        message: '<h1>Please Wait</h1>', 
        css: { border: '3px solid #dfc6c6' }
    }); 
    $('#iframeContainer .blockMsg').css("top", "150px"); 
    $('#iframeContainer .blockMsg').css("left", "350px"); 
    var baseUrl = '/ApprovalSystem';
    var reportName = ReportName.split('#')[0];
    var url = baseUrl + "/HTMLReport/" + reportName + "?clientAgent=Web&userId=0 &docBaseId=" + DocBaseID + "&docCode=" + DocCode + "&docVersion=" + DocVersion;
    $('#reportGrid').attr('src', url);
    var SelectedList = _.filter(QueueList, function (itm) { return itm.ID == parseInt(DocID); });
    SelectedList = _.uniq(SelectedList, function (itm) { return itm.ID ; });
    var obj = {};
    obj.DocBaseID = parseInt(SelectedList[0].DocBaseID);
    obj.ActionID = 6;
    var docInfo = '';
    for(var i=0; i < SelectedList.length; i++){
        docInfo += (i == 0 ? (SelectedList[i].DocCode + '#' + SelectedList[i].Version+ '#' + SelectedList[i].FromEmpId) : ',' + (SelectedList[i].DocCode + '#' + SelectedList[i].Version+ '#' + SelectedList[i].FromEmpId)) ;
    }
    obj.DocInfo =  docInfo;
    var jsonData = JSON.stringify(obj);

    $.ajax({
        url: 'Handlers/ApprovalHandler.ashx?MethodName=LoadSuggestedUserList',
        type: 'POST',
        data: jsonData,
        success: function (data) {           
            if(data =='logout'){
                var url = baseUrl + "/login.aspx";
                window.location.href=url;
            }
            else{
                var result = JSON.parse(data);
                if (result.length > 0) {
                    _.map(result, function (obj) {
                        obj.EmpName = obj.Name + ' (' + obj.Designation+ ')';
                    });
                    var ddlEmployee = $("#ddlSentToEmpR").data("kendoComboBox");
                    ddlEmployee.setDataSource(result);
                    $("#ddlSentToEmpR").data("kendoComboBox").value(result[0].ID);
                    var Empdata = _.filter(UserList , function(o){ return o.ID == result[0].ID})
                    if (Empdata.length > 0) {
                        $("#lblDesignationR").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                        $("#lblDepartmentR").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
                    }
                    else{
                        $("#lblDesignationR").html('<span style="color:#1919b9;">Designation: </span>' + result[0].Designation);
                        $("#lblDepartmentR").html('<span style="color:#1919b9;">Department: </span>' + result[0].Department );
                    } 
                
                }  
                else{
                    var ddlEmployee = $("#ddlSentToEmpR").data("kendoComboBox");
                    ddlEmployee.setDataSource([]);
                    $("#ddlSentToEmpR").data("kendoComboBox").value('');
                    $("#lblDesignationR").html('');
                    $("#lblDepartmentR").html('');
                }
            }           
        },
        error: function (data) {
            popupNotification.error("Error Loading Report Data")
        },
        complete: function () {
            setTimeout(function() {$('#iframeContainer').unblock()},100);
        }
    });
    //unblockUI();
    //$('#iframeContainer').unblock();
}

function ShowHideReportButton(DocID){
    $("#btnApproveR").hide();
    $("#btnRecommendR").hide();
    $("#btnDenyR").hide();
    $("#btnRecommendChangeR").hide();
    $("#btnRecommendCancelR").hide();
    $("#btnAgreeChangeR").hide();
    $("#btnDisagreeChangeR").hide();
    $("#btnRefuseCancelR").hide();
    $("#btnAllowCancelR").hide();
   
    var Data = _.filter(QueueList, function (o) { return o.ID == parseInt(DocID); });
    var buttonList = Data[0].btnList.split(',');
    for(var i = 0; i < buttonList.length; i++){
        if(buttonList[i] == "5"){
            $("#btnApproveR").show();
        }
        else if(buttonList[i] == "6"){
            $("#btnRecommendR").show();
        }
        else if(buttonList[i] == "7"){
            $("#btnDenyR").show();
        }
        else if(buttonList[i] == "92"){
            $("#btnRecommendChangeR").show();
        }
        else if(buttonList[i] == "72"){
            $("#btnRecommendCancelR").show();
        }
        else if(buttonList[i] == "9"){
            $("#btnAgreeChangeR").show();
        }
        else if(buttonList[i] == "91"){
            $("#btnDisagreeChangeR").show();
        }
        else if(buttonList[i] == "74"){
            $("#btnRefuseCancelR").show();
        }
        else if(buttonList[i] == "73"){
            $("#btnAllowCancelR").show();
        }
    }           
}

function PrintDoc(){
    $("#reportGrid").get(0).contentWindow.print();
}

function VersionCompareR(){
    var docId = $('#recomDocCode').html();
    var Data = _.filter(QueueList, function (o) { return o.ID == parseInt(docId); });
    var DocBaseID = Data[0].DocBaseID;
    var DocCode = Data[0].DocCode;
    var Version = Data[0].Version;
    OpenVirsionComparePage (DocBaseID,DocCode,Version);
}

function OpenVirsionComparePage (DocBaseID,DocCode,Version){
    var obj = {};
    obj.DocBaseID = DocBaseID;
    obj.DocID = DocCode;
    obj.DocVersion = Version;
    var jsonData = JSON.stringify(obj);
    $.ajax({
        url: 'Handlers/ApprovalHandler.ashx?MethodName=VersionCompare',
        type: 'POST',
        data: jsonData,
        success: function (data) {  
            var result = data;
            if (result == '200') {
                var baseUrl = '/ApprovalSystem';
                var url = baseUrl + "/VersionCompare.aspx";
                window.open(url, '_blank');
            }
        },
        error: function (data) {
            popupNotification.error("Error In Version Compare.")
        }
    });
}

function SearchName(e,type){
    if (e.keyCode == 13) {
        e.preventDefault();
        if (type == 1) {
            var text = $("#txtSearchRecEmp").val().trim();
            if (text != '') {
                var dataList = SearchDataGet(text);
                if(dataList.length>0){
                    _.map(dataList, function (obj) {
                        obj.EmpName = obj.Name + ' (' + obj.Designation+ ')';
                    });
                    var ddlEmployee = $("#ddlRecomToEmp").data("kendoComboBox");
                    ddlEmployee.setDataSource(dataList);
                    $("#ddlRecomToEmp").data("kendoComboBox").value(dataList[0].ID);
                    var Empdata = _.filter(UserList , function(o){ return o.ID == dataList[0].ID})
                    $("#lblDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                    $("#lblDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
                }
                else{
                    var ddlEmployee = $("#ddlRecomToEmp").data("kendoComboBox");
                    ddlEmployee.setDataSource([]);
                    $("#ddlRecomToEmp").data("kendoComboBox").value('');
                    $("#lblDesignation").html('');
                    $("#lblDepartment").html('');
                }
            }
            else{
                popupNotification.error("please Insert Name or Employee Id")
            }
        }
        else if (type == 2) {
            var text = $("#txtSearchRecEmpR").val().trim();
            if (text != '') {
                var dataList = SearchDataGet(text);
                if(dataList.length>0){
                    _.map(dataList, function (obj) {
                        obj.EmpName = obj.Name + ' (' + obj.Designation+ ')';
                    });
                    var ddlEmployee = $("#ddlSentToEmpR").data("kendoComboBox");
                    ddlEmployee.setDataSource(dataList);
                    $("#ddlSentToEmpR").data("kendoComboBox").value(dataList[0].ID);
                    var Empdata = _.filter(UserList , function(o){ return o.ID == dataList[0].ID})
                    $("#lblDesignationR").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                    $("#lblDepartmentR").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
                }
                else{
                    var ddlEmployee = $("#ddlSentToEmpR").data("kendoComboBox");
                    ddlEmployee.setDataSource([]);
                    $("#ddlSentToEmpR").data("kendoComboBox").value('');
                    $("#lblDesignationR").html('');
                    $("#lblDepartmentR").html('');
                }
            }
            else{
                popupNotification.warning("please Insert Name or Employee Id")
            }
        }
        else if (type == 3) {
            var text = $("#txtSearchRecChangeEmp").val().trim();
            if (text != '') {
                var dataList = SearchDataGet(text);
                if(dataList.length>0){
                    _.map(dataList, function (obj) {
                        obj.EmpName = obj.Name + ' (' + obj.Designation+ ')';
                    });
                    var ddlEmployee = $("#ddlSentToEmpChange").data("kendoComboBox");
                    ddlEmployee.setDataSource(dataList);
                    $("#ddlSentToEmpChange").data("kendoComboBox").value(dataList[0].ID);
                    var Empdata = _.filter(UserList , function(o){ return o.ID == dataList[0].ID})
                    $("#lblChangeDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                    $("#lblChangeDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
                }
                else{
                    var ddlEmployee = $("#ddlSentToEmpChange").data("kendoComboBox");
                    ddlEmployee.setDataSource([]);
                    $("#ddlSentToEmpChange").data("kendoComboBox").value('');
                    $("#lblChangeDesignation").html('');
                    $("#lblChangeDepartment").html('');
                }
            }
            else{
                popupNotification.warning("please Insert Name or Employee Id")
            }
        }
        else if (type == 4) {
            var text = $("#txtSearchRecCancelEmp").val().trim();
            if (text != '') {
                var dataList = SearchDataGet(text);
                if(dataList.length>0){
                    _.map(dataList, function (obj) {
                        obj.EmpName = obj.Name + ' (' + obj.Designation+ ')';
                    });
                    var ddlEmployee = $("#ddlSentToEmpCancel").data("kendoComboBox");
                    ddlEmployee.setDataSource(dataList);
                    $("#ddlSentToEmpCancel").data("kendoComboBox").value(dataList[0].ID);
                    var Empdata = _.filter(UserList , function(o){ return o.ID == dataList[0].ID})
                    $("#lblCancelDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                    $("#lblCancelDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
                }
                else{
                    var ddlEmployee = $("#ddlSentToEmpCancel").data("kendoComboBox");
                    ddlEmployee.setDataSource([]);
                    $("#ddlSentToEmpCancel").data("kendoComboBox").value('');
                    $("#lblCancelDesignation").html('');
                    $("#lblCancelDepartment").html('');
                }
            }
            else{
                popupNotification.warning("please Insert Name or Employee Id")
            }
        }
    }
}

function SearchDataGet(text) {
    var ComboUserList = [];
    if(isNaN(parseInt(text))){
        var Id=text.split('TM');
        if(Id.length == 1){
            ComboUserList = UserList.filter(function (elem) {
                return elem.Name.toLowerCase().indexOf(text) > -1;
            });
        }
        else{
            if(isNaN(parseInt(Id[1])) && Id[1] != ''){
                ComboUserList =  UserList.filter(function (elem) {
                    return elem.Name.toLowerCase().indexOf(text) > -1;
                });
            }
            else{
                ComboUserList =  UserList.filter(function (elem) {
                    return elem.EmpId.toLowerCase().indexOf(text) > -1;
                });
            }
        }
    }
    else{
        ComboUserList = UserList.filter(function (elem) {
            return elem.EmpId.toLowerCase().indexOf(text) > -1;
        });
    }
    return ComboUserList;
}

function BindDesigAnDept(type){
    if (type == 1) {
        var empId = $("#ddlRecomToEmp").data("kendoComboBox").value();
        if (empId != '') {
            var Empdata = _.filter(UserList , function(o){ return o.ID == empId})
            if (Empdata.length > 0) {
                $("#lblDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                $("#lblDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
            }
            else{
                $("#lblDesignation").html('');
                $("#lblDepartment").html('');
            }
        }
        else{
            $("#lblDesignation").html('');
            $("#lblDepartment").html('');
        }
    }

    else if (type == 2) {
        var empId = $("#ddlSentToEmpR").data("kendoComboBox").value();
        if (empId != '') {
            var Empdata = _.filter(UserList , function(o){ return o.ID == empId})
            if (Empdata.length > 0) {
                $("#lblDesignationR").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                $("#lblDepartmentR").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
            }
            else{
                $("#lblDesignationR").html('');
                $("#lblDepartmentR").html('');
            }
            
        }
        else{
            $("#lblDesignationR").html('');
            $("#lblDepartmentR").html('');
        }
    }

    else if (type == 3) {
        var empId = $("#ddlSentToEmpChange").data("kendoComboBox").value();
        if (empId != '') {
            var Empdata = _.filter(UserList , function(o){ return o.ID == empId})
            if (Empdata.length > 0) {
                $("#lblChangeDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                $("#lblChangeDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
            }
            else{
                $("#lblChangeDesignation").html('');
                $("#lblChangeDepartment").html('');
            }
            
        }
        else{
            $("#lblChangeDesignation").html('');
            $("#lblChangeDepartment").html('');
        }
    }
    
    else if (type == 4) {
        var empId = $("#ddlSentToEmpCancel").data("kendoComboBox").value();
        if (empId != '') {
            var Empdata = _.filter(UserList , function(o){ return o.ID == empId})
            if (Empdata.length > 0) {
                $("#lblCancelDesignation").html('<span style="color:#1919b9;">Designation: </span>' + Empdata[0].Designation);
                $("#lblCancelDepartment").html('<span style="color:#1919b9;">Department: </span>' + Empdata[0].Department );
            }
            else{
                $("#lblCancelDesignation").html('');
                $("#lblCancelDepartment").html('');
            }
            
        }
        else{
            $("#lblCancelDesignation").html('');
            $("#lblCancelDepartment").html('');
        }
    }
}

function SaveApprovalData(ToEmpId,ActionId,IsNotify){
    var ApprovalType = '';

    if (ActionId==5) {
        ApprovalType = 'Approve';
    }
    else if (ActionId==6) {
        ApprovalType = 'Recommend';
    }
    else if (ActionId==7) {
        ApprovalType = 'Deny';
    }
    else if (ActionId==92) {
        ApprovalType = 'Recommend Change';
    }
    else if (ActionId==72) {
        ApprovalType = 'Recommend Cancel';
    }
    else if (ActionId==9) {
        ApprovalType = 'Agree Change';
    }
    else if (ActionId==91) {
        ApprovalType = 'Disagree Change';
    }
    else if (ActionId==74) {
        ApprovalType = 'Refuse Cancel';
    }
    else if (ActionId==73) {
        ApprovalType = 'Allow Cancel';
    }
    else {
        ApprovalType = 'Save';
    }  
    
    
    if (SaveDocInfo.length == 0) {
        popupNotification.warning('No data to ' + ApprovalType +'.');
    }
    else{
        var obj = {};
        obj.ToEmpId = ToEmpId;
        obj.ApprovalActionID = ActionId;
        obj.IsNotify = IsNotify;
        obj.childDocList = SaveDocInfo;
        var jsonData = JSON.stringify(obj);
        $('#mdlReport').modal('hide');
        blockUI();
        $.ajax({
            url: 'Handlers/ApprovalHandler.ashx?MethodName=SaveMutlipleApproval',
            type: 'POST',
            data: jsonData,
            success: function (data) { 
                unblockUI();
                if(data =='logout'){
                    var baseUrl = '/ApprovalSystem';
                    var url = baseUrl + "/login.aspx";
                    window.location.href=url;
                }
                else{
                    SelectedDocNoArray = [];
                    //$('#mdlReport').modal('hide');
                    var result = JSON.parse(data);                   
                    if (result.length > 0) {
                        var SavedData = _.filter(result, function (o) { return o.isSuccess == true; });                        
                        if (SavedData.length > 0) { 
                            var SaveDocArray = [];
                            for(var i=0; i < SavedData.length; i++){
                                SaveDocArray.push(SavedData[i].document_code)
                            }
                            QueueList = _.reject(QueueList, function (itm) { return this.values.indexOf(itm.DocCode) > -1 && itm.DocBaseID == SaveDocInfo[0].document_type; }, { "values": SaveDocArray });
                        }

                        var UnsavedData = _.filter(result, function (o) { return o.isSuccess == false && o.document_type != -1;  });
                        var html= '<table class="table-responsive">'+
                                '<tr>'+
                                   '<th style="border:.1pt solid black;width:30%;">Doc Code</th>' +
                                   '<th style="border:.1pt solid black;">Message</th>' +
                                '</tr>';
                        for(var i=0; i < UnsavedData.length; i++){
                            html += '<tr>'+
                                   '<td style="border:.1pt solid black;">'+ UnsavedData[i].document_code +'</td>' +
                                   '<td style="border:.1pt solid black;">'+ UnsavedData[i].Message +'</td>' +
                                  '</tr>';
                        }
                        html += '</table>';
                        if (UnsavedData.length > 0) {                               
                            $('#notifyIcon').html('<span>&#9888; </span>Warning')
                            $('#message').html('Faild to ' + ApprovalType + ' Below Document(s)');
                            $('#UnsavedTable').html(html);                       
                            $('#notifyModal').modal('show');   
                            $('html, body').animate({scrollTop: $("#notifyModal").offset().top }, 200);
                        }
                        else if (SavedData.length > 0 && UnsavedData.length == 0){
                            popupNotification.success(SavedData[0].Message);
                        }
                        //}                        
                    }  
                    else{
                        $.alert({title: 'Warning', content: 'Data Not Saved.',});
                    }
                    //QueueList = _.sortBy(QueueList, 'ID').reverse();
                    //GridBind();
                    //$('#txtSearchData').val('').change();
                    var SortById = $("#cmbSortData").data("kendoComboBox").value();
                    onSortItemChange(SortById);
                }                
            },
            error: function (data) {
                unblockUI();
                SelectedDocNoArray = [];
                var grid = $("#gridQueue").data("kendoGrid");
                var selected = grid.selectedKeyNames();
                SelectedDocNoArray = selected;
                if (SelectedDocNoArray.length != 0) {                   
                    var Data = _.filter(QueueList, function (itm) { return this.values.indexOf(itm.ID.toString()) > -1; }, { "values": SelectedDocNoArray });
                    //var PermissionData = _.filter(ApprovalPermissionList, function (o) { return o.Doc_Base_ID == parseInt(Data[0].DocBaseID); });
                    var buttonList = Data[0].btnList.split(',');
                    var PermissionData = _.filter(buttonList, function (item) { return item == '5'; });
                    if (PermissionData.length > 0) {
                        $("#btnApprove").show();
                    }
                    else{
                        $("#btnApprove").hide();
                    }
                    $("#btnRecommend").show();
                }
                else{
                    $("#btnApprove").hide();
                    $("#btnRecommend").hide();
                }
                //$('#mdlReport').modal('hide');
                $.alert({title: 'Warning', content: 'Error Saving Approval Data.',});
            }
        });  
    }    
}
