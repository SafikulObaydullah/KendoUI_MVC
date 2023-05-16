var result = [];
var popupNotification;

$(document).ready(function () {
    FinancialYears();
    popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    loadAlerts();
    $(".primaryTextButton").kendoButton();

});

function FinancialYears() {
    var FinancialYearList = [
        { FinancialYearID: 1, FinancialYear: "2019/2020" }, { FinancialYearID: 2, FinancialYear: "2020/2021" }, { FinancialYearID: 3, FinancialYear: "2021/2022" },
        { FinancialYearID: 4, FinancialYear: "2022/2023" },
    ];

    //FinancialYearList
    var FY = $("#ddlyear").kendoDropDownList({
        dataSource: FinancialYearList,
        optionLabel: "Select Delivered...",
        dataTextField: "FinancialYear",
        dataValueField: "FinancialYearID",
        height: 310
    }).data("kendoDropDownList");

}

var TinData = function () {
    $('#ddlyear').data("kendoDropDownList").value(0);
    $('#txtTaxesCircle').val('');
    $('#txtZone').val('');
    $('#txtDateofReturnIncome').val('');
    $('#txtSerialByAuthority').val('');

    $.ajax({
        type: 'GET',
        url: bUrl + '/Home/GetTinData',
        success: function (data) {

            result = JSON.parse(data);
            for (var i = 0; i < result.length; i++) {
                result[i].ReturnDate = (new Date(result[i].ReturnDate).toLocaleDateString());
            }
            LoadTinData();

        },
        error: function (data) {
            popupNotification.show('Error Occured While Loading TIN Data', "error")

        }
    });

}

function LoadTinData() {

    $("#txtEmpId").prop("readonly", true);
    $("#txtEmpName").prop("readonly", true);
    $("#txtDesignation").prop("readonly", true);
    $("#txtCompany").prop("readonly", true);
    $("#txtDepartment").prop("readonly", true);

    //databind
    $('#txtEmpId').val(result[0].empId);
    $('#txtEmpName').val(result[0].empName);
    $('#txtDesignation').val(result[0].designation);
    $('#txtCompany').val(result[0].company);
    $('#txtDepartment').val(result[0].department);
    $('#txtSection').val(result[0].section);
    $('#txtTINNo').val(result[0].tinId);

    if (result[0].FinancialYear == null || result[0].TaxesCircle == null || result[0].TaxesZone == null || result[0].ReturnDate == null || result[0].SerialNo == null) {
        $("#tinInfo").hide();

    }
    else {


        //tabledatabind
        $("#tinInfo").show();

        $("#Tingrid").kendoGrid({
            dataSource: result,
            columns: [
            {
                field: "FinancialYear",
                title: "Financial Year"
            }, {
                field: "TaxesCircle",
                title: "Taxes Circle"
            }, {
                field: "TaxesZone",
                title: "Taxes Zone"
            },
            {
                field: "ReturnDate",
                format: "{0: dd-MM-yyyy }",
                title: "Return Date"
            },
            {
                field: "SerialNo",
                title: "Serial No"
            },
            {
                template: "<button onclick='EditTin(\"#: tinId #\",\"#: SerialNo #\",\"#: FinancialYear #\")' class='k-primary primaryTextButton'>Edit</button>",
                field: "tinId",
                title: " ",
                width: 55
            }, ]
        });
    }
}

function SaveTin() {
    var data1 = new Object();
    data1.empId = ($('#txtEmpId').val() == '' ? popupNotification.show('Please Provide Employee ID', "warning")  : $('#txtEmpId').val());
    data1.tinId = ($('#txtTINNo').val() == '' ? popupNotification.show('Please Provide TIN No', "warning")  : $('#txtTINNo').val());
    data1.note = ($('#txtRemarks').val() == '' ? 0 : $('#txtRemarks').val());
    if ($('#ddlyear').data("kendoDropDownList").text() == 'Select Delivered...') {
        popupNotification.show('Enter Assesment Year', "warning");
        return;
    }
    else {
        data1.year = $('#ddlyear').data("kendoDropDownList").text();
        var newChild = new Object();
        if ($('#txtTaxesCircle').val() == '') {
            popupNotification.show('Please Provide Taxes Circle', "warning");
            return;
        }
        else {
            newChild.TaxesCircle = $('#txtTaxesCircle').val();
        }
        if ($('#txtZone').val() == '') {
            popupNotification.show('PPlease Provide Taxes Zone', "warning");
            return;
        }
        else {
            newChild.TaxesZone = $('#txtZone').val();
        }
        if ($('#txtDateofReturnIncome').val() == '') {
            popupNotification.show('Please Provide Date of Return Submission', "warning");
            return;
        }
        else {
            newChild.ReturnDate = $('#txtDateofReturnIncome').val();
        }
        if ($('#txtSerialByAuthority').val() == '') {
            popupNotification.show('Please Provide Return Serial', "warning");
            return;
        }
        else {
            newChild.SerialNo = $('#txtSerialByAuthority').val();
        }

        var Year = $('#ddlyear').data("kendoDropDownList").text();
        newChild.FinancialYear = Year;
        var ChildInformation = [];

        ChildInformation.push(newChild);
        data1.lstOfChildData = ChildInformation;

        submit(data1);
    }
}

function submit(data) {
    //var serviceURL = ;

    $.ajax({
        type: "POST",
        url: bUrl +'/Home/InsertUpdateTin',
        data: data,
        dataType: "json",
        success: successfunc,
        error: errorfunc
    });
    function successfunc(data) {
        var result = JSON.parse(data);
        //console.log(result);
        popupNotification.show('Employee Tax Information Saved Successfully', "success")
        $('#tbodyTin').empty();
        TinData();


    }
    function errorfunc(data) {
        popupNotification.show('Employee Tax Information Save Failed', "error")
    }
}

function EditTin(tinId, SerialNo, FinancialYear) {
    for (var i = 0; i < result.length; i++) {
        if (tinId == result[i].tinId && SerialNo == result[i].SerialNo && FinancialYear == result[i].FinancialYear) {
            var spantinId = result[i].tinId;
            var taxcircle = result[i].TaxesCircle;
            var taxzone = result[i].TaxesZone;
            var returndate = result[i].ReturnDate;
            var serial = result[i].SerialNo;
            var financialyear = result[i].FinancialYear;

            $('#txtTINNo').val(spantinId);
            $('#txtTaxesCircle').val(taxcircle);
            $('#txtZone').val(taxzone);
            $('#txtDateofReturnIncome').val(returndate);
            $('#txtSerialByAuthority').val(serial);

            $("#ddlyear").data("kendoDropDownList").text(financialyear);
        }
    }
}

function loadAlerts() {
    //var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    $(".msgSuccess").click(function () {
        popupNotification.show('Successfull', "success");
    });
    $(".msgError").click(function () {
        popupNotification.show('Error! Try Again', "error");
    });
    $(".msgWarning").click(function () {
        popupNotification.show('Warning! Check Again', "warning");
    });
}
