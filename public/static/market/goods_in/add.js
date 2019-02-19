$(function () {

    //绑定日历
    laydate({
        elem: '#purchase'
    });

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

});