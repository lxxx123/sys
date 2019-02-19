$(function () {
    //页面跳转 
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/spot_checkac/stay_check/parent_id/4?page=' + txt;
        } else {
            window.location.href = '/market/spot_checkac/stay_check/parent_id/4';
        }
    });
    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });    //阻止tips提示框点击事件冒泡
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

    //编辑
    var tipsTimer1;//在外部定义延迟函数变量名
    $("#btn_check").click(function () {
       
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
                }, 3000);
            });
        } else {
            // alert($('#page').val());
            window.location.href = '/market/spot_checkac/edit/page/' + $('#page').val() + "?id=" + chk_value[0];
        }
    });

 //删除
    var tipsTimer2;//在外部定义延迟函数变量名
    var toastTimer;//在外部定义延迟函数变量名
    $("#btn_del").click(function () {
        var chk_value = [];
        $('input[name="ids"]:checked').each(function () {
            chk_value.push($(this).val());
        });

        if (chk_value.length == 0) {
            var tips = $(this).children('.tips');
            clearTimeout(tipsTimer2);
            $('.tips').hide();//所有tips隐藏
            tips.slideDown(200, function () {
                tipsTimer2 = setTimeout(function () {
                    tips.fadeOut();
                }, 3000);
            });
        } else {
            //关闭删除失败提示框
            clearTimeout(toastTimer);
            $('.toast').fadeOut();
            //打开删除确认框
            $('.confirm').fadeIn(function () {
                //点击确认事件
                $('#del-confirm').on('click', function () {
                    $.post('/market/spot_checkac/del',{id:chk_value.join(',')},function(data){

                        if(data==1){
                            window.location.href = '/market/spot_checkac/stay_check/parent_id/4';
                        }else{

                            //删除失败提示框
                            $('.toast').fadeIn(function () {
                                toastTimer = setTimeout(function () {
                                    $('.toast').fadeOut();
                                }, 2000);
                            });
                        }
                    });


                    //关闭确认框
                    $('.confirm').fadeOut(function () {
                        //解绑确认取消点击事件，避免重复添加
                        $('#del-confirm').off('click');
                        $('#del-cancel').off('click');
                    });


                });
                //点击取消事件
                $('#del-cancel').on('click', function () {
                    //关闭确认框
                    $('.confirm').fadeOut(function () {
                        //解绑确认取消点击事件，避免重复添加
                        $('#del-confirm').off('click');
                        $('#del-cancel').off('click');
                    });
                });
            });
        }
    });
});