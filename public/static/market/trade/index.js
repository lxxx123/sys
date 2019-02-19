$(function () {

    //查询函数
    function query(date, more, page) {
        var data = {};

        // 排序规则
        if ($.trim($('#order_rule').val()) !== '') {
            data.order_rule = $.trim($("#order_rule").val());
        }

        if (more) {
            //如果more为true，则为更多查询，收集模态框的数据
            //商户姓名
            if ($.trim(window.parent.$('#entity_name').val()) !== '') {
                data.entity_name = $.trim(window.parent.$('#entity_name').val());
            }

            //开始日期
            if ($.trim(window.parent.$('#bill_dt2').val()) !== '') {
                data.bill_dt2 = $.trim(window.parent.$("#bill_dt2").val());
            }
            //结束日期
            if ($.trim(window.parent.$('#bill_dt3').val()) !== '') {
                data.bill_dt3 = $.trim(window.parent.$("#bill_dt3").val());
            }
            //交易单号
            if ($.trim(window.parent.$('#trade_no').val()) !== '') {
                data.trade_no = $.trim(window.parent.$('#trade_no').val());
            }
            //摊位号
            if ($.trim(window.parent.$('#stall_no2').val()) !== '') {
                data.stall_no = $.trim(window.parent.$('#stall_no2').val());
            }
            //交易方式
            if ($.trim(window.parent.$('#obj_bank_no').val()) !== '') {
                data.obj_bank_no = $.trim(window.parent.$('#obj_bank_no').val());
            }
            //商品名称
            if ($.trim(window.parent.$('#goods_name').val()) !== '') {
                data.goods_name = $.trim(window.parent.$('#goods_name').val());
            }
            //单价
            if ($.trim(window.parent.$('#price').val()) !== '') {
                data.price = $.trim(window.parent.$('#price').val());
            }
       
        } else {
            //如果more为false，则为普通查询，但是需要保留上次其它的更多查询的条件
            //摊位号
       
            //日期
            if (date !== '') {
                data.date = date;
            }
            if (page) {
                data.page = page;
            }
            //搜索框
            if ($.trim($('#key').val()) !== '') {

                data.key = $.trim($('#key').val());
            }



        }

        //序列化参数
        var marketId=$('#marketId').val();
        var typeParentId=$('#typeParentId').val();
        var fieldTypeId=$('#fieldTypeId').val();

        var param = $.param(data);
        var url = '/market/tradeac?marketId=' +marketId+"&typeParentId="+ typeParentId+"&fieldTypeId="+fieldTypeId;
        if ($.param(data) !== '') {
            url = url + '&' + param;
        }
        location.href = url;
    }

    //绑定日历控件
    laydate({
        elem: '#bill_dt1',
       
        choose: function (date) {
            query($('#bill_dt1').val());
        }
    });
    //查询提交
    $('#query-btn').on('click', function () {

        query($('#bill_dt1').val());
    });

    //更多查询遮罩层
    $('#more-btn').on('click', function () {
        window.parent.$('.input-wrapper').html($('.query-input').html());
        //动态添加，否则ie不兼容
        window.parent.$('.btn-wrapper').html('<button id="query-btn">查询</button><button id="reset-btn">清空</button>');
        //模态框弹出，插入dom后调用父页面绑定日历函数
        window.parent.$('.layer').fadeIn(function () {
            //遮罩层弹出后再绑定各种事件
            //日历
            window.parent.bindLaydate('#bill_dt2', 'YYYY-MM-DD hh:mm:ss', true);
            window.parent.bindLaydate('#bill_dt3', 'YYYY-MM-DD hh:mm:ss', true);
            //更多查询--提交
            window.parent.$('#query-btn').on('click', function () {
                query(window.parent.$('#bill_dt').val(), true);
                window.parent.$('.layer').fadeOut();
            });
            //更多查询--清空
            window.parent.$('#reset-btn').on('click', function () {
                window.parent.$('input').each(function () {
                    $(this).val('');
                });
            });
        });
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
        var currentDay = $('#bill_dt1').val() === '' ? formatDate(new Date()) : $('#bill_dt1').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一天
        date.setTime(date.getTime() - 24 * 3600 * 1000);
        var prevDay = formatDate(date);
        //查询
        query(prevDay);
    });

    //查询当天
    $('#today-btn').on('click', function () {
        //查询
        query(formatDate(new Date()));
    });

    //查询下一天
    $('#next-btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#bill_dt1').val() === '' ? formatDate(new Date()) : $('#bill_dt1').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        //查询
        query(nextDay);
    });

    //导出excel
    $('#export-btn').on('click', function () {

        location.href = '/market/trade_export?marketId='+$('#marketId').val()+'&time_now='+$('#bill_dt1').val();
    });

    //跳转到xx页
    $('#sure').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
            query($('#bill_dt1').val(), false, page);
        }
    });

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });


});