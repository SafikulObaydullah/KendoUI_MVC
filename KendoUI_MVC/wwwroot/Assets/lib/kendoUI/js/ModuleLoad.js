var ip = location.host;
var url = ip.split(':');
console.log(ip);

//var TMSUrl = "http://172.16.1.3:1155/DTMS/user/externallogin?";
var TMSUrl = "http://" + url[0] + ":1155/DTMS/user/externallogin?";

$(function () {
    
    //var url = window.location.href;
    //var lastLetter = url.charAt(url.length - 1)
    //if (lastLetter == "/") {
    //    var newUrl = url.slice(0, -1)
    //    window.location.href = newUrl;

    //}

    loadLinks();
});

function loadLinks() {

    var queryStr = getCookie('LogInInfo');
    var ui = "UI/";

    //Planning,Dashboard,DIRDKPI
    $("#dirdkpi").attr("href", "/DIRDKPI/" + queryStr);
    $("#batchPlanning").attr("href", "/Planning/" + queryStr);
    $("#dashboard").attr("href", "/Dashboard/" + queryStr);

    //Production
    $("#production").attr("href", "/Production/" + ui + queryStr);

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function CallTMSModule() {
    var queryStr = getCookie('LogInInfo');
    var querySplit = queryStr.split("true&");
    var TMSUrlnew = TMSUrl + querySplit[1];
    window.open(
  TMSUrlnew,
  '_blank' // <- This is what makes it open in a new window.
);

}


