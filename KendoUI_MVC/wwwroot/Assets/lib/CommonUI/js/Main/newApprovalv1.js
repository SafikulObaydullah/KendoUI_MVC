var NotifyActionList = [
    { "name": "Approval", "ID": 5 },
    { "name": "Recommend Approval", "ID": 6 },
    { "name": "Deny", "ID": 7 },
    { "name": "Submit", "ID": 8 },
    { "name": "Change Request", "ID": 90 },
    { "name": "Recommend Change", "ID": 92 },
    { "name": "Disagree", "ID": 91 },
    { "name": "Agree", "ID": 9 },
    { "name": "Cancel Request", "ID": 71 },
    { "name": "Recommend Cancel", "ID": 72 },
    { "name": "Allow Cancel ", "ID": 73 },
    { "name": "Reject Cancelletion", "ID": 74 },
    { "name": "Job Create/Update", "ID": 93 }
];
var Empcounter = 0;
var Notifycounter = 0;

var dummy = [];
var AllUserList;
var NotifyEmpListData = [];
var SelectedDepartmentList = [];

$(document).ready(function () {
    //LoadTopUserListFileApp();
    LoadUserLists();
    GetFileApprovalAllDDL();
    $('#filerow').css('justify-content', 'center');
    $('#txtEditor').hide();

    var user = $('#username').val();
    $('#txtusername').html(user);

    $(".select-period").kendoButtonGroup({
        index: 0
    });
    $("input[name='ApprovalType']").click(function () {
        if ($('input:radio[name=ApprovalType]:checked').val() == 0) {
            if ($('#uploadVal').val() == 1) {
                $('#DivLtEmbed').empty();
            }

            $('#noteEditor').show();
            $('#titleDiv').hide();
            $('#fileUploader').hide();
            $('#uploadVal').val('')
            if ($('#uploadVal').val() == 1) {
                $('#uploadDoc').show();
            }
            else {
                $('#uploadDoc').hide();

            }
            $('#filerow').css('justify-content', 'center');

        }
        else if ($('input:radio[name=ApprovalType]:checked').val() == 1) {
            var editor = $("#editor").data("kendoEditor");
            if (editor.value() != '') {
                $("#editor").data("kendoEditor").value('');

            }
            $('#fileUploader').show();
            $('#titleDiv').hide();
            $('#noteEditor').hide();
            if ($('#uploadVal').val() == 1) {
                $('#uploadDoc').show();
            }
            else {
                $('#uploadDoc').hide();

            }
            $('#filerow').css('justify-content', 'left');

        }

    });



    $('#checkboxNotify').change(function () {
        if (this.checked) {
            if ($('#spanDocID').val() == "") {
                $('#recepientInfo').hide();
                popupNotification.warning('Document Not Yet Submitted!');
                return;
            }
            else {
                $('#NotifyPanel').show();
                $('#notification').show();
                $('#recepientInfo').hide();
                var docID = $('#spanDocID').val();
                $("#title").html("Notify Others About This Document (" + docID + ")");


            }
            return;
        }

        if ($('#spanDocID').val() == "") {
            $('#notification').hide();
            $('#recepientInfo').show();
            $("#title").html("Recepient Information");

        }
        else {
            $('#recepientInfo').hide();
            var docID = $('#spanDocID').val();
            $("#title").html("Notify Others About This Document (" + docID + ")");

            $('#notification').hide();

        }



    });

    $('#NotifyMe').change(function () {
        if (this.checked) {
            $('#checkedAlready').hide();
            $('#notifyBTN').css('margin-top', '0');
            $('#meTxt').hide();
            $('#empNotifyInfo').html('');
            $('#meTxt').show();
            $('#meCombo').hide();
            $('#AllmeCombo').hide();
            if (Notifycounter == 0) {
                $('#meCombo').show();
                $('#AllmeCombo').hide();
            }
            else if (Notifycounter == 1) {
                $('#meCombo').hide();
                $('#AllmeCombo').show();
            }
            $('#addOther').show();
            var EmpName = $('#TxtRecipient').val();
            var Id = $('#spanUser').val();
            var Designation = $('#spanDesignation').val();
            var Company = $('#spanCompany').val();
            var Dept = $('#spanDepertment').val();
            $('#txtEmployeeNameNotify').val(EmpName);
            $('#txtEmployeeNotify').val(Id);
            $('#empNCompany').val(Company);
            $('#empNDepertment').val(Dept);
            $('#empNDesignation').val(Designation);
            $('#NotifyAction').data('kendoDropDownList').value(5);
            $("#comboEmployeeNotify").data("kendoComboBox").text('');
            var empNotifyInfo = Designation + " (" + Dept + ")";
            $('#empNotifyInfo').html(empNotifyInfo);
            Notify();
            return;
        }
        else {
            $('#meTxt').hide();
            $('#meCombo').show();
            $('#txtEmployeeNameNotify').val("");
            $('#txtEmployeeNotify').val("");
            $('#empNCompany').val("");
            $('#empNDepertment').val("");
            $('#empNDesignation').val("");
            $('#empNotifyInfo').html('');

        }


    });

    $("#ddlFileType").change(function () {
        var value = parseInt(this.value);
        if (value != 0) {
            for (var i = 0; i < fileTypes.length; i++) {
                if (value == fileTypes[i].ID) {
                    var Check = fileTypes[i].IsVisible;
                    if (Check == true) {
                        $('#currency').show();
                        $('#amount').show();
                    }
                    else {
                        $('#currency').hide();
                        $('#amount').hide();
                    }
                }
            }
        }
        else if (value == 0) {
            $('#currency').hide();
            $('#amount').hide();
        }

    });

    $('.ddlCompany').change(function () {
        var company = $('.ddlCompany').val();
        SelectedDepartmentList = [];
        SelectedDepartmentList = _.filter(AllDepartmentList, function (obj) { return obj.CompanyCode == company });
        $(".ddlDepartment option").remove();
        if (SelectedDepartmentList.length <= 0) {
            var listItems = "";
            listItems += "<option value='0'>--No Top Employee Found!--</option>";
            $(".ddlDepartment").html(listItems);
            LoadUserList();
            return;
        }
        var listItems = "<option value='-1'>--Select--</option>";
        for (var i = 0; i < SelectedDepartmentList.length; i++) {
            listItems += "<option value='" + SelectedDepartmentList[i].DepartmentCode + "'>" + SelectedDepartmentList[i].DepartmentName + "</option>";
        }
        $(".ddlDepartment").html(listItems);

        var department = $('.ddlDepartment').val();
        $('#txtCompanyCode').val(company);
        $('#txtDepartmentCode').val(department);
    });
    $('.ddlDepartment').change(function () {
        var company = $('.ddlCompany').val();

        var department = $('.ddlDepartment').val();
        $('#txtCompanyCode').val(company);
        $('#txtDepartmentCode').val(department);
    });


    //$('#txtSubject').on('input', function (e) {
    //    var subject = $('#txtSubject').val();
    //    if (subject.indexOf("'") > -1) {
    //        subject = subject.replace("'", '');
    //        $('#txtSubject').val(subject);
    //        popupNotification.warning("You can not use apostrophe symbol(') in Subject");
    //    }
    //});
});




function ShowNotifyPopup() {

    if ($('#spanDocID').val() == "") {
        $('#NotifyPanel').hide();
        popupNotification.warning('Document Not Yet Submitted!');
        return;
    }
    else {
        $('#NotifyPanel').show();
        var dID = $('#spanDocID').val();
        $("#title").html("Notify Others About This Document -" + dID);
        $('#addOther').hide();
        $("#MyPopup").modal("toggle");
    }


}

$(document).on("keypress", "#BuyerOrderVal", function (e) {
    if (e.which == 13) {
        var code = $('#BuyerOrderVal').val();
        if (code == "") {
            kendo.alert('Enter Buyer Order');
            return;
        }
        else {
            GetBuyerOrderData();
        }
    }
    
})
$(document).on("change", "#ddlFileType", function (e) {
    
    var filetypevalue = $('#ddlFileType').val();
    if (filetypevalue == '5' || filetypevalue == '11') {
        $('.buyerorderrow').show();
    }
    else {
        $('.buyerorderrow').hide();
    }
})
function BuyerOrderShow()
{
    var filetypevalue = $('#ddlFileType').val();
    if (filetypevalue == '5' || filetypevalue == '11') {
        $('.buyerorderrow').show();
    }
    else {
        $('.buyerorderrow').hide();
    }
}
function GetBuyerOrderData() {
    blockUI();
    var obj = {};
    var obj = {};
    obj.code = $('#BuyerOrderVal').val();
    var jsonData = JSON.stringify(obj);

    $.ajax({
        type: "POST",
        url: "Handlers/FileApprovalNotify.ashx?MethodName=GetBuyerOrderData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            unblockUI();
            console.log(data);

            $('#txtbuyerordervalue').val(data[0].code)
            $('#BuyerOrderVal').val(data[0].code)
            $('#txtShipmentDate').val(data[0].shipmentDate)
            $('#txtQty').val(data[0].QTY)
            $('#txtBuyer').val(data[0].Buyer)
            $('#txtCompany').val(data[0].Company)
        },
        error: function (data) {
            unblockUI();
            popupNotification.error('Failed Loading BuyerOrderData Data!.');

        }
    });
}

function LoadTopUserListFileApp() {

    blockUI();
    var DocBaseID = 84;
    var ApprovalActionID = 8;
    var param = { "DocBaseID": DocBaseID, "actionID": ApprovalActionID };

    var obj = {};
    obj.DocBaseID = DocBaseID;
    obj.ApprovalActionID = ApprovalActionID;
    var jsonData = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "Handlers/ApprovalHandler.ashx?MethodName=LoadTopUserList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            unblockUI();


        },
        error: function (data) {
            unblockUI();
            popupNotification.error('Failed Loading UserList Data!.');

        }
    });
}

function LoadTopUserListFileAppInitial(data) {
    var result = data;
    console.log(result);
    var indexChk = 0;
    var Place = "Search Recepient...";
    if (result <= 0) {
        indexChk = -1;
        Place = "No Top Employee Found";
    }
    $("#comboEmployee").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        placeholder: Place,
        dataSource: result,
        filter: "contains",
        select: onChange,
        index: indexChk
    });

    $('#EmpId').val($("#comboEmployee").data("kendoComboBox").value());


    $("#comboEmployeeNotify").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        placeholder: Place,
        dataSource: result,
        filter: "contains",
        select: onChangeEmpNotify,
        index: indexChk
    });

    $('#txtEmployeeNotify').val($("#comboEmployeeNotify").data("kendoComboBox").value());
    $("#NotifyAction").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "ID",
        index: 0,
        dataSource: NotifyActionList
    });
}

function GetAllUser() {
    $('#Allemp').show();
    $('#Topemp').hide();
    $('#empInfo').html('');
    Empcounter = 1;
    $("#comboAllEmployee").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        placeholder: "Search Recepient...",
        dataSource: UserListData,
        filter: "contains",
        select: onChange
    });
}

function GetAllUserNotify() {
    $('#NotifyMe').prop('')
    $('#AllmeCombo').show();
    $('#meCombo').hide();
    $('#meTxt').hide();
    $('#empNotifyInfo').html('')

    Notifycounter = 1;
    $("#comboAllEmployeeNotify").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        placeholder: "Search Recepient...",
        dataSource: UserListData,
        filter: "contains",
        select: onChangeEmpNotify
    });
}

function LoadUserLists() {
    //blockUI();
    //$.ajax({
    //    type: "GET",
    //    url: "Handlers/ApprovalHandler.ashx",
    //    data: { 'MethodName': 'LoadUserList' },
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        unblockUI();
    //        AllUserList = data;
    //        console.log(AllUserList);

    //    },
    //    error: function (data) {
    //        unblockUI();
    //        popupNotification.error('Failed Loading UserList Data!.');

    //    }
    //});
    AllUserList = UserListData;
    console.log(AllUserList);
}

function FileTypes(data) {
    fileTypes = data;

}

function GetFileApprovalAllDDL() {
    blockUI();
    var DocBaseID = 84;
    var ApprovalActionID = 8;
    var param = { "DocBaseID": DocBaseID, "actionID": ApprovalActionID };

    var obj = {};
    obj.DocBaseID = DocBaseID;
    obj.ApprovalActionID = ApprovalActionID;
    var jsonData = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "Handlers/FileApprovalNotify.ashx?MethodName=FileApprovalAllDDL",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            unblockUI();
            var Result = data;
            console.log(Result)
            FileTypes(Result.FileList)
            GetCompany(Result.CompanyList)
            GetDepartment(Result.DepartmentList)
            LoadTopUserListFileAppInitial(Result.TopUser)
        },
        error: function (data) {
            unblockUI();
            popupNotification.error('Failed All DDL Data!.');

        }
    });
}

function GetCompany(result) {
    AllCompanyList = result;
    $(".ddlCompany option").remove();
    if (result.length <= 0) {
        var listItems = "";
        listItems += "<option value='0'>--Select--</option>";
        $(".ddlCompany").html(listItems);
        LoadUserList();
        return;
    }
    var listItems = "";
    for (var i = 0; i < result.length; i++) {

        listItems += "<option value='" + result[i].CompanyCode + "'>" + result[i].CompanyName + "</option>";
    }
    $(".ddlCompany").html(listItems);
  
}

function GetDepartment(result) {
    AllDepartmentList = result;
    var company = $('.ddlCompany').val();
    SelectedDepartmentList = [];
    SelectedDepartmentList = _.filter(AllDepartmentList, function (obj) { return obj.CompanyCode == company });
    $(".ddlDepartment option").remove();
    if (SelectedDepartmentList.length <= 0) {
        var listItems = "";
        listItems += "<option value='-1'>--Select--</option>";
        $(".ddlDepartment").html(listItems);
        LoadUserList();
        return;
    }
    var listItems = "<option value='-1'>--Select--</option>";
    for (var i = 0; i < SelectedDepartmentList.length; i++) {
        listItems += "<option value='" + SelectedDepartmentList[i].DepartmentCode + "'>" + SelectedDepartmentList[i].DepartmentName + "</option>";
    }
    $(".ddlDepartment").html(listItems);

    $('.ddlCompany').val($('#company').val());
    $('.ddlDepartment').val($('#department').val());

    $('#txtCompanyCode').val($('.ddlCompany').val());
    $('#txtDepartmentCode').val($('.ddlDepartment').val());

}

function onChange(e) {
    var dataItem = e.dataItem;
    $('#EmpId').val(dataItem.ID);
    $('#EmpCompany').val(dataItem.Company);
    $('#EmpDepartment').val(dataItem.Department);
    $('#EmpDesignation').val(dataItem.Designation);
    $('#EmpSection').val(dataItem.Section);

    var empInfo = dataItem.Designation + " (" + dataItem.Department + ")";
    $('#empInfo').html(empInfo);

}

function Empinfo(dataItem) {
    $('#EmpId').val(dataItem.ID);
    $('#EmpCompany').val(dataItem.Company);
    $('#EmpDepartment').val(dataItem.Department);
    $('#EmpDesignation').val(dataItem.Designation);
    $('#EmpSection').val(dataItem.Section);

    var empInfo = dataItem.Designation + " (" + dataItem.Department + ")";
    $('#empInfo').html(empInfo);

}

function onChangeEmpNotify(e) {
    var dataItem = e.dataItem;
    $('#txtEmployeeNotify').val(dataItem.ID);
    $('#txtEmployeeNameNotify').val(dataItem.Name);
    $('#empNCompany').val(dataItem.Company);
    $('#empNDepertment').val(dataItem.Department);
    $('#empNDesignation').val(dataItem.Designation);

    var empNotifyInfo = dataItem.Designation + " (" + dataItem.Department + ")";
    $('#empNotifyInfo').html(empNotifyInfo);
}

function EmpNinfo(dataItem) {
    $('#txtEmployeeNotify').val(dataItem.ID);
    $('#txtEmployeeNameNotify').val(dataItem.Name);
    $('#empNCompany').val(dataItem.Company);
    $('#empNDepertment').val(dataItem.Department);
    $('#empNDesignation').val(dataItem.Designation);

    var empNotifyInfo = dataItem.Designation + " (" + dataItem.Department + ")";
    $('#empNotifyInfo').html(empNotifyInfo);
}

function EmployeeList() {
    var len = NotifyEmpListData.length;
    var data = new Object();
    data.id = len;
    data.empID = $('#txtEmployeeNotify').val();
    data.empName = $('#txtEmployeeNameNotify').val();
    var designation = $('#empNDesignation').val();
    var dept = $('#empNDepertment').val();
    data.empInfos = designation + " (" + dept + ")";
    data.company = $('#empNCompany').val();
    data.notifyOn = $("#NotifyAction").data("kendoDropDownList").value();
    data.notify = $("#NotifyAction").data("kendoDropDownList").text();


    NotifyEmpListData.push(data);


    $("#gridNotify").kendoGrid({
        dataSource: NotifyEmpListData,

        height: 200,
        scrollable: true,
        columns: [{
            field: "empID",
            title: "Employee ID",
            hidden: true,
        }, {
            field: "empName",
            title: "Employee Name"
        }, {
            field: "empInfos",
            title: "Employee Info",
        }, {
            field: "notify",
            title: "Notify On"
        },]
    });
}

function clearNEmployeeList() {
    $('#gridNotify').empty();
    NotifyEmpListData = [];
}

function Notify() {
    //DocBaseID, DocID, DocVersion, EmployeeId, ApprovalActionID, User, IsAdd
    var DocBaseID = 84;
    var DocID = $('#spanDocID').val();
    var DocVersion = 0;

    if ($("#NotifyMe").is(':checked')) {
        var EmployeeId = $('#txtEmployeeNotify').val();
        var ApprovalActionID = $('#NotifyAction').data('kendoDropDownList').value();
    }
    else {
        if (Notifycounter == 0) {
            var EmployeeId = $("#comboEmployeeNotify").data("kendoComboBox")._old;
        }
        else if (Notifycounter == 1) {
            var EmployeeId = $("#comboAllEmployeeNotify").data("kendoComboBox")._old;
        }
        var ApprovalActionID = $('#NotifyAction').data('kendoDropDownList').value();

    }

    var User = $('#spanUser').val();
    var IsAdd = true;
    var param = { "DocBaseID": DocBaseID, "DocID": DocID, "DocVersion": DocVersion, "EmployeeId": EmployeeId, "ApprovalActionID": ApprovalActionID, "User": User, "IsAdd": IsAdd, };

    var obj = {};
    obj.DocBaseID = DocBaseID;
    obj.DocID = DocID;
    obj.DocVersion = DocVersion;
    obj.EmployeeId = EmployeeId;
    obj.ApprovalActionID = ApprovalActionID;
    obj.Creator = User;
    obj.IsAdd = IsAdd;
    //In order to proper pass a json string, you have to use function JSON.stringfy
    var jsonData = JSON.stringify(obj);
    blockUI();
    $.ajax({
        url: 'Handlers/FileApprovalNotify.ashx?MethodName=NotifyFileApproval',
        type: 'POST',
        data: jsonData,
        success: function (data) {
            unblockUI();
            var result = JSON.parse(data);
            //console.log(result);
            if (result.msg == "Add Success") {

                popupNotification.success('Employee Added to Notification List Successfull!');
                EmployeeList();
                return;
            }
            else if (result.msg == "Duplicate Data") {
                popupNotification.warning('Employee Already Added to Notification List!')
                return;

            }
            else if (result.msg == "Delete Success") {
                popupNotification.error('Employee Deleted Successfully')
                return;

            }
            else if (result.msg == "Fail") {
                popupNotification.error('Failed to Add Employee!')
                return;

            }
        },
        error: function (errorText) {
            popupNotification.error('Employee Added to Notification List Failed!')

            unblockUI();
        }
    });


}

function showAddNotify() {
    $('#addOther').show();
    $('#NotifyMe').prop('checked', false);
    $('#meTxt').hide();
    $('#meCombo').show();
    $('#empNotifyInfo').html('');
}

function DoneNotify() {
    $('#MyPopup').modal('hide')
}
function ShowPopup() {
    var editor = $("#editor").data("kendoEditor").value();
    var filetype = $('#ddlFileType').val();
    var title = $('#txtFileTitle').val();
    var BuyerOrder = $('#BuyerOrderVal').val();  
    if (filetype == '5' || filetype == '11') {
        if(BuyerOrder=="")
        {
            popupNotification.warning("Please enter buyer order code.");
            return;
        }
       
    }
    if ($('input:radio[name=ApprovalType]:checked').val() == 0) {
        if (filetype == "0") {
            popupNotification.warning("Please select file type!");
            return;
        }
        if (editor == "") {
            popupNotification.warning("Please Write Note, Ok!");
            return;
        }

    }
    else if ($('input:radio[name=ApprovalType]:checked').val() == 1) {
        if (filetype == "0") {
            popupNotification.warning("Please select file type!");
            return;
        }
       
        if ($('#uploadVal').val() == "0" || $('#uploadVal').val() == "") {
            popupNotification.warning("Please Upload a File!");
            return;
        }

    }
    if ($('#txtSubject').val().trim() == "") {
        popupNotification.warning("Please Insert Subject.");
        return;
    }
    //else if ($('#txtSubject').val().indexOf("'") > -1) {
    //    popupNotification.warning("You can not use apostrophe symbol(') in Subject");
    //    return;
    //}

    if ($('#spanDocID').val() == "") {
        $('#NotifyPanel').hide()

    }
    else {
        $('#NotifyPanel').show();
        var dID = $('#spanDocID').val();
        $("#title").html("Notify Others About This Document -" + dID);
        $('#addOther').hide()


    }

    var value = parseInt($('#ddlFileType option:selected').val());
    for (var i = 0; i < fileTypes.length; i++) {
        if (value == fileTypes[i].ID) {
            var Check = fileTypes[i].IsVisible;
            if (Check == true) {
                var amnt = $("#txtAmount").val();
                var Fvalue = $('#ddlcurrency option:selected').val();
                if (amnt == '') {
                    popupNotification.warning('Enter amount');
                    return;
                }
                else if (parseFloat(amnt) <= 0) {
                    popupNotification.warning('Enter amount greater than 0');
                    return;
                }
                else if (Fvalue == '0') {
                    popupNotification.warning('Enter Currency');
                    return;
                }
            }
        }
    }



    $("#MyPopup").modal("toggle");
    var DuplicateEmp = _.filter(UserListData, function (obj) { return obj.ID == parseInt($("#comboEmployee").data("kendoComboBox").value()); });
    if (DuplicateEmp.length > 0) {
        Empinfo(DuplicateEmp[0]);
        EmpNinfo(DuplicateEmp[0]);
    }


}
