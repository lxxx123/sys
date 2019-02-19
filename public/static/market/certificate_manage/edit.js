$(function () {

    laydate({
        elem: '#date'
    });

    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });


});