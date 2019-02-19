$(function () {
    //页面跳转 
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/screenac/index/parent_id/8?page=' + txt;
        } else {
            window.location.href = '/market/screenac/index/parent_id/8';
        }
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

    //批量设置次数
    var tipsTimer1;//在外部定义延迟函数变量名
    $("#btn_count").click(function (ev) {
 
        var chk_value = [];
        $('input[name="ids"]:checked').each(function () {
            chk_value.push($(this).val());
        });
        // alert(chk_value);
        if (chk_value.length == 0) {
            var tips = $(this).children('.tips');
            clearTimeout(tipsTimer1);
            $('.tips').hide();//所有tips隐藏
            tips.slideDown(200, function () {
                tipsTimer1 = setTimeout(function () {
                    tips.fadeOut();
                }, 3000);
            });
        } else if($('#batch-count').val()==''){
                    //删除失败提示框
                    $('.toasts').fadeIn(function () {
                        toastTimer = setTimeout(function () {
                            $('.toasts').fadeOut();
                        }, 2000);
                    });
        }else{
            //批量设置次数请求
            $.post('/market/screenac/setcount',{id:chk_value.join(','),count:$('#batch-count').val()},function(data){

                if(data==1){
                    window.location.href = '/market/screenac/index/parent_id/8';
                }else{

                    //删除失败提示框
                    $('.toast').fadeIn(function () {
                        toastTimer = setTimeout(function () {
                            $('.toast').fadeOut();
                        }, 2000);
                    });
                }
            });
        }
    });

    //单个设置次数，失去焦点时触发
    $('.single-count').on('blur',function () {
        //设置次数发送请求
        var count = $(this).val();
        var id = $(this).attr('data-id');
        if(count==''){
            //删除失败提示框
            $('.toasts').fadeIn(function () {
                toastTimer = setTimeout(function () {
                    $('.toasts').fadeOut();
                }, 2000);
            });
        }else{
            //批量设置次数请求
            $.post('/market/screenac/setcount',{id:id,count:count},function(data){

                if(data==1){
                    window.location.href = '/market/screenac/index/parent_id/8';
                }else{
                //设置失败提示框
                $('.toasts').fadeIn(function () {
                    toastTimer = setTimeout(function () {
                        $('.toasts').fadeOut();
                    }, 2000);
                });
                }
            });
        }




    });



});