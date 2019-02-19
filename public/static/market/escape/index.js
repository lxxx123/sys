$(function () {
    //编辑图片
    $("#btn_edit").click(function () {
        window.location.href = '/market/escapeac/edit/id/' + $('#id').val();
    });
});