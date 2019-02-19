$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });
    //绑定日历
    laydate({
        elem: '#purchase_time'
    });

   
});