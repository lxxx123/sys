$(function () {

    $('#btn_edit').click(function () {

        type = $('input[name="type"]:checked').val();
        $.post('/market/yjy_adv_typeac/save', {type: type}, function (data) {
            if (data == 1) {
                window.location.reload();
            }
        });

    });
});