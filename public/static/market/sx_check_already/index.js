$(function () {
    //查询函数
    function query(date, page) {
        var data = {};
            //日期
            if (date !== '') {
                data.bill_dt = date;
            }
        //序列化参数
        var param = $.param(data);
        var url = '/market/sx_check_alreadyac/index/parent_id/' + $('.active').attr('data-pid');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }

    //绑定日历控件
    laydate({
        elem: '#bill_dt1',
        choose: function (date) {
            //query(date);
        }
    });
    //页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/sx_check_alreadyac/index/parent_id/'+ $('.active').attr('data-pid') + '?page=' + txt;
        } else {
            window.location.href = '/market/sx_check_alreadyac/index/parent_id/'+ $('.active').attr('data-pid');
        }
    });

    //查找
    $("#btn_search").click(function () {
        var txt = $("#search_txt").val();
        var bill_dt1 = $("#bill_dt1").val();
        window.location.href = '/market/sx_check_alreadyac/index/parent_id/'+ $('.active').attr('data-pid') + '?key=' + txt+"&bill_dt="+bill_dt1;
        /*if (txt != '') {
            window.location.href = '/market/sx_check_alreadyac/index/parent_id/'+ $('.active').attr('data-pid') + '?key=' + txt+"&bill_dt="+bill_dt1;
        } else {
            window.location.href = '/market/sx_check_alreadyac/index/parent_id/'+ $('.active').attr('data-pid');
        }*/
    });

    //导出Excel
    $("#btn_export").click(function () {
        var bill_dt1 = $("#bill_dt1").val();
        var search_txt = $("#search_txt").val();
        var chk_value = [];
        $('input[name="ids"]:checked').each(function () {
            chk_value.push($(this).val());
        });
        var test_ids = chk_value.join(',');
        window.location.href = '/market/sx_check_alreadyac/export?bill_dt1='+ bill_dt1 + '&key=' + search_txt + '&test_ids=' + test_ids;
    });

     //导入xcel
    $("#btn_import").click(function () {
        window.location.href = '/market/sx_check_alreadyac/import/parent_id/'+ $('.active').attr('data-pid');
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

    //添加
    $('#btn_add').on('click', function () {
        location.href = '/market/sx_check_alreadyac/add/parent_id/'+ $('.active').attr('data-pid');
    });

    //修改
    var tipsTimer1;//在外部定义延迟函数变量名
    $("#btn_edit").click(function (ev) {

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
            window.location.href = '/market/sx_check_alreadyac/edit/page/' + $('#page').val() + "?id=" + chk_value[0]+"&parent_id="+ $('.active').attr('data-pid');
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
                    $.post('/market/sx_check_alreadyac/del',{id:chk_value.join(',')},function(data){
                        // console>log(data);
                        if(data==1){
                            window.location.href = '/market/sx_check_alreadyac/index/parent_id/'+ $('.active').attr('data-pid');
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