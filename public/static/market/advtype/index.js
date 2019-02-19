$(function () {

    $('#btn_edit').click(function () {

        type = $('input[name="type"]:checked').val();
        //批量设置次数请求
        $.post('/market/adv_typeac/save', {type: type}, function (data) {
            if (data == 1) {
                window.location.href = '/market/adv_typeac/index/parent_id/8';
            }
        });

    });
});