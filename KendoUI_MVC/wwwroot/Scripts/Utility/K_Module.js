var bUrl = '';
$(function () {

    LoadMenu();
});

function LoadMenu() {
    var urlpost = bUrl + '/Home/GetUserMenuHtmlK';
    var getUrl = window.location;
    console.log(getUrl);
    var baseUrl = getUrl.pathname.split('/')[1];
    console.log(baseUrl);
    var formData = new FormData();
    formData.append("ModuleName", baseUrl);


    $.ajax({
        url: urlpost,
        type: "POST",
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (responses) {
            //var html = '';
            //if (response != null) {
            //    for (i = 0; i < response.length; i++)
            //    {
            //        var appendhtml = '<input type="button" value="+">' + response[i].ScreenId + '">'
            //                       + '<img title="' + response[i].ScreenMenuName +  '</a>';
            //        html += appendhtml; 
            //    }
            //}
            console.log(responses);

            $('.mainnav').empty();
            $('.mainnav').append(responses);
            //------------- Navigation -------------//

            //mainNav = $('.mainnav>ul>li');
            //// mainNav.find('ul').siblings().addClass('hasUl').append('<span class="hasDrop icon16 icomoon-icon-arrow-down-2"></span>');
            //mainNavLink = mainNav.find('a').not('.sub a');
            //mainNavLinkAll = mainNav.find('a');
            //mainNavSubLink = mainNav.find('.sub a').not('.sub li');
            //mainNavCurrent = mainNav.find('a.current');

            ////add hasSub to first element
            //if (mainNavLink.hasClass('hasUl')) {
            //    $(this).closest('li').addClass('hasSub');
            //}

            ///*Auto current system in main navigation */
            //var domain = document.domain;
            //var folder = '';//if you put site in folder not in main domain you need to specify it. example http://www.host.com/folder/site
            //var absoluteUrl = 0; //put value of 1 if use absolute path links. example http://www.host.com/dashboard instead of /dashboard

            //function setCurrentClass(mainNavLinkAll, url) {
            //    mainNavLinkAll.each(function (index) {
            //        convert href to array and get last element
            //        var href = $(this).attr('href');

            //        if (href == url) {
            //            set new current class
            //            $(this).addClass('current');

            //            parents = $(this).parentsUntil('li.hasSub');
            //            parents.each(function () {
            //                if ($(this).hasClass('sub')) {
            //                    its a part of sub menu need to expand this menu
            //                     $(this).siblings().css('display', 'block')

            //                    $(this).prev('a.hasUl').addClass('drop');
            //                    $(this).addClass('expand');
            //                    $(this).siblings().css('display', 'block');
            //                    $(this).css('display', 'block');
            //                }
            //            });
            //        }
            //    });
            //}


            //if (domain === '') {
            //    domain not found looks like is in testing phase
            //    var pageUrl = window.location.pathname.split('/');
            //    var winLoc = pageUrl.pop(); // get last item
            //    setCurrentClass(mainNavLinkAll, winLoc);

            //} else {
            //    if (absoluteUrl === 0) {
            //        absolute url is disabled
            //        var afterDomain = window.location.pathname;
            //        if (folder != '') {
            //            afterDomain = afterDomain.replace(folder + '/', '');
            //        } else {
            //            afterDomain = afterDomain.replace('/', '');
            //        }
            //        setCurrentClass(mainNavLinkAll, afterDomain);
            //    } else {
            //        absolute url is enabled
            //        var newDomain = 'http://' + domain + window.location.pathname;
            //        setCurrentClass(mainNavLinkAll, newDomain);
            //    }
            //}

            //hover magic add blue color to icons when hover - remove or change the class if not you like.
            //mainNavLinkAll.hover(
            //    function () {
            //        $(this).find('span.icon16').addClass('blue');
            //    },
            //    function () {
            //        $(this).find('span.icon16').removeClass('blue');
            //    }
            //);

            //click magic
            //mainNavLink.click(function (event) {
            //    $this = $(this);
            //    if ($this.hasClass('hasUl')) {
            //        event.preventDefault();
            //        if ($this.hasClass('drop')) {
            //            $(this).siblings('ul.sub').slideUp(250).siblings().toggleClass('drop');
            //        } else {
            //            $(this).siblings('ul.sub').slideDown(250).siblings().toggleClass('drop');
            //        }
            //    }
            //});
            //mainNavSubLink.click(function (event) {
            //    $this = $(this);
            //    if ($this.hasClass('hasUl')) {
            //        event.preventDefault();
            //        if ($this.hasClass('drop')) {
            //            $(this).siblings('ul.sub').slideUp(250).siblings().toggleClass('drop');
            //        } else {
            //            $(this).siblings('ul.sub').slideDown(250).siblings().toggleClass('drop');
            //        }
            //    }
            //});

            //responsive buttons
            //$('.resBtn>a').click(function (event) {
            //    $this = $(this);
            //    if ($this.hasClass('drop')) {
            //        $this.removeClass('drop');
            //    } else {
            //        $this.addClass('drop');
            //    }
            //    if ($('#sidebar').length) {
            //        $('#sidebar').toggleClass('offCanvas');
            //        $('#sidebarbg').toggleClass('offCanvas');
            //        if ($('#sidebar-right').length) {
            //            $('#sidebar-right').toggleClass('offCanvas');
            //        }
            //    }
            //    if ($('#sidebar-right').length) {
            //        $('#sidebar-right').toggleClass('offCanvas');
            //        $('#sidebarbg-right').toggleClass('offCanvas');
            //    }
            //    $('#content').toggleClass('offCanvas');
            //    if ($('#content-one').length) {
            //        $('#content-one').toggleClass('offCanvas');
            //    }
            //    if ($('#content-two').length) {
            //        $('#content-two').toggleClass('offCanvas');
            //        $('#sidebar-right').removeClass('offCanvas');
            //        $('#sidebarbg-right').removeClass('offCanvas');
            //    }
            //});

            //$('.resBtnSearch>a').click(function (event) {
            //    $this = $(this);
            //    if ($this.hasClass('drop')) {
            //        $('.search').slideUp(250);
            //    } else {
            //        $('.search').slideDown(250);
            //    }
            //    $this.toggleClass('drop');
            //});

        },
        error: function (xhr) {
            //toastr.options.timeOut = 1500;
            //toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}