$(function () {

    //页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/spot_checkac/index/parent_id/4'  + '?page=' + txt;
        } else {
            window.location.href = '/market/spot_checkac/index/parent_id/4' ;
        }
    });

    //查找
    $("#btn_search").click(function () {
        var txt = $("#search_txt").val();
        if (txt != '') {
            window.location.href = '/market/spot_checkac/index/parent_id/4' + '?key=' + txt;
        } else {
            window.location.href = '/market/spot_checkac/index/parent_id/4';
        }
    });

    //待检测
    $('#btn_stay_check').on('click', function () {
        window.location.href = '/market/spot_checkac/stay_check/parent_id/4';
    });

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

    //抽检
    var tipsTimer1;//在外部定义延迟函数变量名
    $("#btn_check").click(function (ev) {

        var chk_value = [];
        $('input[name="ids"]:checked').each(function () {
            chk_value.push($(this).val());
        });
        
        if (chk_value.length == 0) {
            var tips = $(this).children('.tips');
            clearTimeout(tipsTimer1);
            $('.tips').hide();//所有tips隐藏
            tips.slideDown(200, function () {
                tipsTimer1 = setTimeout(function () {
                    tips.fadeOut();
                }, 1000);
            });
        } else {
            $.post('/market/spot_checkac/check',{id:chk_value.join(',')},function(data){
                   
                if(data==1){
                    window.location.href = '/market/spot_checkac/index/parent_id/4';
                }
            });
        }
    });
});