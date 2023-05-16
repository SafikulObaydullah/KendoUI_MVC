var redirectUrl = 'Approval.aspx',
    moduleName = 'Approval System';
var host_Name = location.host;
var host_url = host_Name.split(':');
var ip_Address = window.location.hostname;
function LoadExternalModule(docType, docCode, version, Json, SubReportJson) {
    var data = {};
    data['MethodName'] = 'TokenAuthentication';
    data['RedeirectPage'] = redirectUrl;
    data['ModuleName'] = moduleName;
    data['DocType'] = docType;
    data['DocCode'] = docCode;
    data['Version'] = version;
    data['Json'] = Json;
    data['SubReportJson'] = SubReportJson;
    data['IPs'] = ip_Address;
    console.log(baseUrl)
    $.ajax({
        url: baseUrl + '/ExternalModuleCall/TokenAuthentication',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",

        success: function (data) {
            var response = JSON.parse(data);
            var url = response.result.url + '/?token=' + response.token + '&type=submit';
            window.open(url, '_blank');
        },
        error: function () {
            alert("An error has occurred while loading module.");
        }
    });
}
