$(function(){
	
	//页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/merchant_sxac/evaluate_show/parent_id/3?page=' + txt;
        } else {
            window.location.href = '/market/merchant_sxac/evaluate_show/parent_id/3';
        }
    });
    //返回
    $('#btn_return').on('click', function () {
        history.back();
    });
});