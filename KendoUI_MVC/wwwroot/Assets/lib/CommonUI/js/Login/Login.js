    $(document).ready(function () {
        'use strict';
        $('#UserName').val('');
        $('span[data-valmsg-for="UserName"]').text('');
        $('#Password').val('');
        $('span[data-valmsg-for="Password"]').text('');
        $('.form-control').on('input', function () {
            var $field = $(this).closest('.form-group');
            if (this.value) {
                $field.addClass('field--not-empty');
            } else {
                $field.removeClass('field--not-empty');
            }
        });
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });
    $("#UserName").blur(function () {
        if ($('#UserName').val() == '') {
            $('span[data-valmsg-for="UserName"]').text('User Name is required!');
            return;
        }
        else {
            $('span[data-valmsg-for="UserName"]').text('');
            $('#alertName').html('');
        }
    });
    $("#Password").blur(function () {
        if ($('#Password').val() == '') {
            $('span[data-valmsg-for="Password"]').text('Password is required!');
            return;
        }
        else {
            $('span[data-valmsg-for="Password"]').text('');
        }
    });

});
