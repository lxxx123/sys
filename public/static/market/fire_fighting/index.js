$(function () {
    //编辑图片
    $("#btn_edit").click(function () {
        window.location.href = '/market/fire_fightingac/edit/id/' + $('#id').val();
    });
});