$(function () {

    //绑定日历控件
    laydate({
        elem: '#date-start',
        format: 'YYYY-MM-DD'
    });
    laydate({
        elem: '#date-end',
        format: 'YYYY-MM-DD'
    });

    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });

    //初始化富文本编辑器
    var ue = UE.getEditor('myEditor');

});