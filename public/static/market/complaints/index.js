$(function () {
    //查询函数
    function query(date, page) {
        var data = {};

        //商户姓名
        if ($.trim($('#merchant_name').val()) !== '') {
            data.merchant_name = $.trim($('#merchant_name').val());
        }
        //日期
        if (date !== '') {
            data.create_time = date;
        }

        //页码
        if (page) {
            data.page = page;
        }

        //序列化参数
        var param = $.param(data);
        var url = '/market/complaintsac/index/parent_id/' + $('.active').attr('data-parent');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }

    //绑定日历控件
    laydate({
        elem: '#create_time',
        choose: function (date) {
            query(date);
        }
    });

    //查询提交
    $('#query-btn').on('click', function () {
        query($('#create_time').val());
    });

//添加
    $('#btn_add').on('click', function () {
        location.href = '/market/complaintsac/add/parent_id/'+ $('.active').attr('data-parent');
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
            window.location.href = '/market/complaintsac/edit/page/' + $('#page').val() + "?id=" + chk_value[0];
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
                    //发送删除数据ajax请求
                    $.ajax({
                        //几个参数需要注意一下
                        type: "POST",//方法类型
                        dataType: "json",//预期服务器返回的数据类型
                        url: "/market/complaintsac/del" ,//url
                        data: {ids:chk_value.join(',')},//需要传输的数据
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status == 1) {
                                window.location.reload();
                            }else{
                                //删除失败提示框
                                $('.toast').fadeIn(function () {
                                    toastTimer = setTimeout(function () {
                                        $('.toast').fadeOut();
                                    }, 2000);
                                });
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

    // //Excel导出
    // $("#btn_export").click(function () {
    //     window.location.href = '/market/complaintsac/export';
    // });

    //跳转到xx页
    $('#go').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
            query($('#create_time').val(), page);
        }
    });


    $('.pass').click(function(){
         var  id = $(this).attr('data-id');
         var  parent_id=$('.active').attr('data-parent');
         var  page=$(this).attr('data-page');
           location.href = '/market/complaintsac/solve/parent_id/'+ $('.active').attr('data-parent')+"?page="+page+"&id="+id;
    });

    // $('.pass').click(function(){
    //     alert('确定通过？');
    //     var id = $(this).attr('data-id');
    //      $.post('/market/complaintsac/check',{id:id,status:1},function (data) {
    //          data = JSON.parse(data);

    //          if(data.status == 1){
    //              location.reload();
    //          }else{
    //              alert('保存失败！');
    //          }
    //      });
    // });

    $('.no_pass').click(function(){
        var ifback = window.confirm("确定撤销？");
        if (ifback) {
            var id = $(this).attr('data-id');
            $.post('/market/complaintsac/check',{id:id,status:2},function (data) {
                data = JSON.parse(data);

                if(data.status == 1){
                    location.reload();
                }else{
                    alert('保存失败！');
                }
            });
            return true;
        } else {
            return false;
        }
    });
});