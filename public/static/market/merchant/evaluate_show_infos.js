$(function(){
	
	//页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/merchantac/achievement_show_index/parent_id/3?page=' + txt;
        } else {
            window.location.href = '/market/merchantac/achievement_show_index/parent_id/3';
        }
    });
    //返回
    $('#btn_return').on('click', function () {
        history.back();
    });
});