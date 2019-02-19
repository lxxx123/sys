$(function () {

    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });

    //初始化富文本编辑器
    var ue = UE.getEditor('myEditor');
});