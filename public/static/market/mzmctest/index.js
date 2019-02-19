$(function () {


    //绑定日历控件
    laydate({
        elem: '#test_date1',
        choose: function (date) {
             window.location.href = '/market/mzmc_testac/index/parent_id/4?test_date=' + date;
        }
    });

    //查询提交
    $('#query-btn').on('click', function () {
        // query($('#bill_dt1').val());
         window.location.href = '/market/mzmc_testac/index/parent_id/4?bill_dt1=' +$('#bill_dt1').val();
    });



    //格式化日期:YYYY-mm-dd
    function formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }

    //查询上一天
    $('#prev-btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#test_date1').val() === '' ? formatDate(new Date()) : $('#test_date1').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一天
        date.setTime(date.getTime() - 24 * 3600 * 1000);
        var prevDay = formatDate(date);

        //查询
        window.location.href = '/market/mzmc_testac/index/parent_id/4?test_date=' +prevDay;
    });

    //查询当天
    $('#today-btn').on('click', function () {
        //查询

         window.location.href = '/market/mzmc_testac/index/parent_id/4?test_date=' +formatDate(new Date());
    });

    //查询下一天
    $('#next-btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#test_date1').val() === '' ? formatDate(new Date()) : $('#test_date1').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        //查询
        window.location.href = '/market/mzmc_testac/index/parent_id/4?test_date=' +nextDay;
    });

    // //导出excel
    // $('#import-btn').on('click', function () {
    //     location.href = '/market/protestac/import';
    // });

    //跳转到xx页
    $('#go').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
           window.location.href = '/market/mzmc_testac/index/parent_id/4?page=' +page;
        }
    });

    //导入
    $('#btn_import').on('click',function () {
        location.href = '/market/mzmc_testac/import';
    });
    //全选，全不选
    $('#check-all').on('change', function () {
        var checked = $(this)[0].checked;
        $('input[name="ids"]').each(function () {
            $(this)[0].checked = checked;
        });
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
                    //发送删除数据ajax请求
                    // console.log(chk_value);
                    $.ajax({
                        //几个参数需要注意一下
                        type: "POST",//方法类型
                        dataType: "json",//预期服务器返回的数据类型
                        url: "/market/mzmc_testac/del" ,//url
                        data: {ids:chk_value.join(',')},//需要传输的数据
                        success: function (result) {
                            console.log(result);
                            if (result.status == 1) {
                                window.location.reload();
                            }
                        },
                        error : function() {
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