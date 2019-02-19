$(function () {
    //修改
    var tipsTimer1;//在外部定义延迟函数变量名
    $("#btn_edit").click(function () {

        var chk_value = [];
        $('input[name="id"]:checked').each(function () {
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
            window.location.href = '/market/wsc_merchant_goodsac/goods_edit/page/' + $('#page').val() +'/parent_id/'+$('#parent_id').val() +'?id=' + chk_value[0];
        }
    });

    //全选，全不选
    $('#check-all').on('change', function () {
        var checked = $(this)[0].checked;
        $('input[name="id"]').each(function () {
            $(this)[0].checked = checked;
        });
    });

    //删除
    var tipsTimer2;//在外部定义延迟函数变量名
    var toastTimer;//在外部定义延迟函数变量名
    $("#btn_del").click(function () {
        var chk_value = [];
        $('input[name="id"]:checked').each(function () {
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
                    $.post('/market/wsc_merchant_goodsac/del', {ids: chk_value.join(',')}, function (data) {

                        if (data.status == 1) {
                            // window.location.href = '/market/wsc_merchant_goodsac/goods_show/parent_id/'+$('#parent_id').val();
                            location.reload();
                        } else {
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
    //查找
    $("#btn_search").on('click', function () {
        var txt = $("#search_txt").val();
        if (txt != '') {
            window.location.href = '/market/wsc_merchant_goodsac/goods_show/parent_id/'+$('#parent_id').val() + "?key1=" + txt+"&id="+$("#mer_id").val();
        } else {
            window.location.href = '/market/wsc_merchant_goodsac/goods_show/parent_id/'+$('#parent_id').val();
        }
    });

    //返回
    $('#btn_back').on('click', function () {
        window.location.href = '/market/wsc_merchant_goodsac/index/parent_id/'+$('#parent_id').val();
    });
});