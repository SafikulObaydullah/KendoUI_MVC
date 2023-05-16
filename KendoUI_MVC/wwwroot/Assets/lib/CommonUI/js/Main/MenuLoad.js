var bUrl = '';
$(function () {
    LoadMenu();
});
function LoadMenu() {
    var urlpost = bUrl + '/Home/GetUserMenuHtmlK';
    var getUrl = window.location;
    var baseUrl = getUrl.pathname.split('/')[1];
    var formData = new FormData();
    formData.append("ModuleName", baseUrl);


    $.ajax({
        url: urlpost,
        type: "POST",
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);

            var menu = generateMenuDOM(response);
            console.log(menu);
            $('#menuList').html(menu);


        },
        error: function (xhr) {

        }
    });
}

var generateMenuDOM = function (list) {
    var listContainerEl = document.createElement('DIV');
    listContainerEl.classList.add('k-animation-container');
    listContainerEl.style.width = '98px';
    listContainerEl.style.height = '114px';
    listContainerEl.style.overflow = 'hidden';
    listContainerEl.style.zIndex = '1002';
    listContainerEl.style.top = '32px';
    listContainerEl.style.left = '0px';
    listContainerEl.style.boxSizing = 'content-box';
    listContainerEl.style.display = 'none';
    listContainerEl.style.position = 'absolute';
    listContainerEl.setAttribute('aria-hidden', 'true');

    var listEl = document.createElement('UL');
    listEl.classList.add('k-group', 'k-menu-group', 'k-popup', 'k-reset');
    listEl.style.position = 'absolute';
    listEl.style.fontSize = '14px';
    listEl.style.fontFamily = 'Arial, Helvetica, sans-serif';
    listEl.style.fontStretch = '100%';
    listEl.style.fontStyle = 'normal';
    listEl.style.fontWeight = '400';
    listEl.style.lineHeight = '20px';
    listEl.style.display = 'none';
    listEl.style.transform = 'translateY(-114px)';
    listEl.setAttribute('aria-hidden', 'true');

    var listContainer = listContainerEl.cloneNode(true);
    var parentUl = listEl.cloneNode(true);

    listContainer.appendChild(parentUl);

    list.forEach(function (item) {
        var menuSuperEl = generateMenuSuperLiDOM(item, listContainerEl, listEl);
        parentUl.appendChild(menuSuperEl);
    });

    return listContainer;
}

var generateMenuSuperLiDOM = function (item, listContainerEl, listEl) {
    var menuSuperEl = document.createElement('LI');
    menuSuperEl.setAttribute('aria-haspopup', 'true');
    menuSuperEl.setAttribute('role', 'menuitem');
    menuSuperEl.classList.add('k-item', 'k-menu-item', 'k-state-default', 'k-first');
    menuSuperEl.style.zIndex = 'auto';

    var spanEl = document.createElement('SPAN');
    spanEl.classList.add('k-link', 'k-menu-link');
    spanEl.textContent = item.ScreenMenuName;
    menuSuperEl.appendChild(spanEl);

    var spanSpanEl = document.createElement('SPAN');
    spanSpanEl.classList.add('k-menu-expand-arrow', 'k-icon', 'k-i-arrow-60-right');
    spanEl.appendChild(spanSpanEl);

    var listContainer = listContainerEl.cloneNode(true);
    menuSuperEl.appendChild(listContainer);

    var parentUl = listEl.cloneNode(true);
    menuSuperEl.appendChild(parentUl);

    item.SubMenuList.forEach(function (sub) {
        var subMenuEl = generateSubMenuDOM(sub);
        parentUl.appendChild(subMenuEl);
    });

    return menuSuperEl;
}

var generateSubMenuDOM = function (sub) {
    var menuEl = document.createElement('LI');
    menuEl.classList.add('k-item', 'k-menu-item', 'k-state-default', 'k-first');
    menuEl.setAttribute('role', 'menuitem');
    menuEl.addEventListener('click', function (e) {
        location.assign(sub.ScreenFormName);
    })
    spanEl = document.createElement('SPAN');
    spanEl.classList.add('k-link', 'k-menu-link');
    spanEl.textContent = sub.ScreenMenuName;
    menuEl.appendChild(spanEl);

    return menuEl;
}
