
var hostfromUrl = window.location.host;

var baseUrl = '/AccountingSystem';      // required after publish
//var baseUrl = '..';

var baseUrlImg = '/AccountingSystem';      // required for img after publish
//var baseUrlImg = '../..';
//var baseLinkForApproval = 'http://182.160.113.236/ApprovalSystem/htmlReport/';
//var baseLinkForApproval = 'http://182.160.113.237/ApprovalSystem/htmlReport/';
var baseLinkForApproval = 'http://localhost:59780/ApprovalSystem/htmlReport/';
var baseLinkForPDReport = 'http://182.160.113.236:8080/ApprovalSystem/';

var comImageLinkForExportExcel1 = "http://" + hostfromUrl + "/Commercial/Resources/Images/imgLogo1.png";
var comImageLinkForExportExcel2 = "http://" + hostfromUrl + "/Commercial/Resources/Images/imagL2.png";
var comImageLinkForExportExcel3 = "http://" + hostfromUrl + "/Commercial/Resources/Images/imgL3.jpg";

var time = 3000;


/// transfer parameter from one page to another
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
var FormateDateTime = function (date) {
    //---newdate formate: "MM/dd/yyyy"

    var newDate = '';
    if (date != '') {
        var oldDate = date.split('/');
        newDate = [oldDate[1], oldDate[0], oldDate[2]].join('/');
    }
    return newDate;
}

var getCode = function (nameWithCode) {

    init = nameWithCode.indexOf('(');
    fin = nameWithCode.indexOf(')');
    var Code = (nameWithCode.substr(init + 1, fin - init - 1));
    return Code;
}
const getShortCode = (bankName) => {
    let splitArry = bankName.split(' ');
    let shortCode = '';
    for (var i = 0; i < splitArry.length; i++) {
        if (i == 0)
            shortCode = splitArry[i].substring(0, 1);
        else
            shortCode = shortCode + splitArry[i].substring(0, 1);
    }
    return shortCode;
}
var ApprovalStatus = function (status, docName, approval_code) {
    var StatusText = '';
    console.log(approval_code);
    if (approval_code == '005')
        StatusText = docName + ' is ' + status.name + ' by ' + status.from_Name + ' at ' + status.inTime;
    else if (approval_code == '008')
        StatusText = docName + ' is ' + status.name + ' by ' + status.from_Name + ' and waiting in ' + status.to_Name + ' desk at ' + status.inTime;

    else if (approval_code == '006')
        StatusText = docName + ' is ' + status.name + ' by ' + status.from_Name + ' and waiting in ' + status.to_Name + ' desk at ' + status.inTime;

    else if (approval_code == '007')
        StatusText = docName + ' is ' + status.name + ' by ' + status.from_Name + ' at ' + status.inTime;

    else if (approval_code == '090')
        StatusText = docName + status.name + ' is waiting in ' + status.to_Name + ' desk at ' + status.inTime;

    else if (approval_code == '091')
        StatusText = docName + ' ' + status.name + ' by ' + status.from_Name + ' at ' + status.out_Date_Time;

    else if (approval_code == '009')
        StatusText = docName + ' ' + status.name + ' by ' + status.from_Name + ' at ' + status.out_Date_Time;

    else
        StatusText = 'Not yet send for approval.';


    $("#spnApprovalStatus").css({ "font-size": "100%", "font-weight": "bold", "align": "center", "color": "blue" });
    $('#divAppStatus').show();
    $('#spnApprovalStatus').text(StatusText);

}

var btnEnable = function (approvalCode) {
    if (approvalCode == 'null' || approvalCode == 0 || approvalCode == '007' || approvalCode == null)
        $('#btnApproval').show();
    else
        $('#btnApproval').hide();

    if (approvalCode == '005' || approvalCode == '007' || approvalCode == 'null' || approvalCode == null)
        $("#btnSave").show();
    else
        $("#btnSave").hide();
}

function compareDate(dateFrom, dateTo) {
    var startDate = dateFrom.split('/');
    var endDate = dateTo.split('/');

    startDate = [startDate[1], startDate[0], startDate[2]].join('/');
    endDate = [endDate[1], endDate[0], endDate[2]].join('/');

    startDate = moment(startDate);
    endDate = moment(endDate);
    if (endDate < startDate) {
        return '-1';
    }
}
function CleanWordHTML(str) {
    str = str.replace(/<o:p>\s*<\/o:p>/g, "");
    str = str.replace(/<o:p>.*?<\/o:p>/g, "");
    str = str.replace(/\s*mso-[^:]+:[^;"]+;?/gi, "");
    str = str.replace(/\s*MARGIN: 0cm 0cm 0pt\s*;/gi, "");
    str = str.replace(/\s*MARGIN: 0cm 0cm 0pt\s*"/gi, "\"");
    str = str.replace(/\s*TEXT-INDENT: 0cm\s*;/gi, "");
    str = str.replace(/\s*TEXT-INDENT: 0cm\s*"/gi, "\"");
    str = str.replace(/\s*TEXT-ALIGN: [^\s;]+;?"/gi, "\"");
    str = str.replace(/\s*PAGE-BREAK-BEFORE: [^\s;]+;?"/gi, "\"");
    str = str.replace(/\s*FONT-VARIANT: [^\s;]+;?"/gi, "\"");
    str = str.replace(/\s*tab-stops:[^;"]*;?/gi, "");
    str = str.replace(/\s*tab-stops:[^"]*/gi, "");
    //str = str.replace(/\s*face="[^"]*"/gi, "");
    //str = str.replace(/\s*face=[^ >]*/gi, "");
    //str = str.replace(/\s*FONT-FAMILY:[^;"]*;?/gi, "");
    str = str.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");
    str = str.replace(/<(\w[^>]*) style="([^\"]*)"([^>]*)/gi, "<$1$3");
    str = str.replace(/\s*style="\s*"/gi, '');
    str = str.replace(/<SPAN\s*[^>]*>\s*&nbsp;\s*<\/SPAN>/gi, '');
    str = str.replace(/<SPAN\s*[^>]*><\/SPAN>/gi, '');
    str = str.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
    str = str.replace(/<SPAN\s*>(.*?)<\/SPAN>/gi, '$1');
    str = str.replace(/<FONT\s*>(.*?)<\/FONT>/gi, '$1');
    str = str.replace(/<\\?\?xml[^>]*>/gi, "");
    str = str.replace(/<\/?\w+:[^>]*>/gi, "");
    str = str.replace(/<H\d>\s*<\/H\d>/gi, '');
    str = str.replace(/<H1([^>]*)>/gi, '');
    str = str.replace(/<H2([^>]*)>/gi, '');
    str = str.replace(/<H3([^>]*)>/gi, '');
    str = str.replace(/<H4([^>]*)>/gi, '');
    str = str.replace(/<H5([^>]*)>/gi, '');
    str = str.replace(/<H6([^>]*)>/gi, '');
    //  str = str.replace(/<\/H\d>/gi, '<br>'); //remove this to take out breaks where Heading tags were 
    str = str.replace(/<(U|I|STRIKE)>&nbsp;<\/\1>/g, '');
    str = str.replace(/<(B|b)>&nbsp;<\/\b|B>/g, '');
    str = str.replace(/<([^\s>]+)[^>]*>\s*<\/\1>/g, '');
    str = str.replace(/<([^\s>]+)[^>]*>\s*<\/\1>/g, '');
    str = str.replace(/<([^\s>]+)[^>]*>\s*<\/\1>/g, '');
    //some RegEx code for the picky browsers
    //  var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)", "");
    //  str = str.replace(re, "<div$2</div>");
    //var re2 = new RegExp("(<font|<FONT)([^*>]*>.*?)(<\/FONT>|<\/font>)", "");
    //str = str.replace(re2, "<div$2</div>");
    //  str = str.replace(/size|SIZE = ([\d]{1})/g, '');
    return str;
}
const num2text = {
    ones: ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'],
    tens: ['', '', 'TWENTY', 'THIRTY', 'FOURTH', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'],
    sep: ['', ' THOUSAND ', ' MILLION ', ' BILLION ', ' TRILLION ', ' QUADRILLION ', ' QUINTILLION ', ' SEXTILLION ']
};
const convert = function (val) {
    if (val.length === 0) {
        return '';
    }

    val = val.replace(/,/g, '');
    if (isNaN(val)) {
        return 'Invalid input.';
    }


    let [val1, val2] = val.split(".")
    let str2 = "";
    if (val2 != null && val2 != '') {
        //convert the decimals here
        var digits = (val2 + "0").slice(0, 2).split("");
        str2 = num2text.tens[+digits[0]] + " " + num2text.ones[+digits[1]]
    }
    let arr = [];
    while (val1) {
        arr.push(val1 % 1000);
        val1 = parseInt(val1 / 1000, 10);
    }
    let i = 0;
    let str = "";
    while (arr.length) {
        str = (function (a) {
            var x = Math.floor(a / 100),
                y = Math.floor(a / 10) % 10,
                z = a % 10;

            return (x > 0 ? num2text.ones[x] + ' HUNDRED ' : '') +
                (y >= 2 ? num2text.tens[y] + ' ' + num2text.ones[z] : num2text.ones[10 * y + z]);
        })(arr.shift()) + num2text.sep[i++] + str;
    }

    return 'US DOLLAR ' + str +
        (str2 ? ' AND ' + str2 + ' CENTS' : '') +
        ' ONLY';
};