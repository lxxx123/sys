$(function () {
    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });

    laydate({
        elem: '#date'
    });

});