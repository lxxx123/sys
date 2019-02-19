$(function () {
    //阻止tips提示框点击事件冒泡
    $('.operate button').delegate('.tips', 'click', function (ev) {
        ev.stopPropagation();
    });

    //全选，全不选
    $('#check-all').on('change', function () {
        var checked = $(this)[0].checked;
        $('input[name="ids"]').each(function () {
            $(this)[0].checked = checked;
        });
    });

    // 分配检测人员
    var tipsTimer3;//在外部定义延迟函数变量名
    $("#btn_people").click(function (ev) {

        var chk_value = [];
        $('input[name="ids"]:checked').each(function () {
            chk_value.push($(this).val());
        });

        if (chk_value.length == 0) {
            var tips = $(this).children('.tips');
            clearTimeout(tipsTimer3);
            $('.tips').hide();//所有tips隐藏
            tips.slideDown(200, function () {
                tipsTimer3 = setTimeout(function () {
                    tips.fadeOut();
                }, 3000);
            });
            return false;
        } 
        var ids = chk_value.join(',');
        var position_id = $("#position_id").val();
        window.location.href = '/market/jxtaskac/set_inspector?id=' +ids+ '&position_id='+position_id;
    });

   
});