$(function () {
    function query(date, more, page) {
        var data = {};

        if (more) {
            //如果more为true，则为更多查询，收集模态框的数据
            //商户姓名
            if ($.trim(window.parent.$('#entity_name2').val()) !== '') {
                data.entity_name = $.trim(window.parent.$('#entity_name2').val());
            }
            //日期
            if (date !== '') {
                data.test_date = date;
            }
            //商品类型
            if ($.trim(window.parent.$('#prod_type').val()) !== '') {
                data.prod_type = $.trim(window.parent.$('#prod_type').val());
            }
            //商品名称
            if ($.trim(window.parent.$('#prod_name').val()) !== '') {
                data.prod_name = $.trim(window.parent.$('#prod_name').val());
            }
            //检测项目
            if ($.trim(window.parent.$('#item_name').val()) !== '') {
                data.item_name = $.trim(window.parent.$('#item_name').val());
            }
            //检测结果
            if ($.trim(window.parent.$('#result').val()) !== '') {
                data.result = $.trim(window.parent.$('#result').val());
            }
        } else {
            //如果more为false，则为普通查询，但是需要保留上次更多查询的条件
            //商户姓名
            if ($.trim($('#entity_name1').val()) !== '') {
                data.entity_name = $.trim($('#entity_name1').val());
            }
            //日期
            if (date !== '') {
                data.test_date = date;
            }
            //商品类型
            if ($.trim($('#prod_type').val()) !== '') {
                data.prod_type = $.trim($('#prod_type').val());
            }
            //商品名称
            if ($.trim($('#prod_name').val()) !== '') {
                data.prod_name = $.trim($('#prod_name').val());
            }
            //检测项目
            if ($.trim($('#item_name').val()) !== '') {
                data.item_name = $.trim($('#item_name').val());
            }
            //检测结果
            if ($.trim($('#result').val()) !== '') {
                data.result = $.trim($('#result').val());
            }
            //页码
            if (page) {
                data.page = page;
            }
        }

        //序列化参数
        var param = $.param(data);
        var url = '/market/protestac/index/parent_id/' + $('.active').attr('data-parent');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }

    //绑定日历控件
    laydate({
        elem: '#test_date1',
        choose: function (date) {
            query(date);
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

            window.parent.bindLaydate('#test_date2');
            //更多查询--提交
            window.parent.$('#query-btn').on('click', function () {
                window.parent.$('.layer').fadeOut();
                query(window.parent.$('#test_date2').val(), true);
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
        var currentDay = $('#test_date1').val() === '' ? formatDate(new Date()) : $('#test_date1').val();
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
        var currentDay = $('#test_date1').val() === '' ? formatDate(new Date()) : $('#test_date1').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        //查询
        query(nextDay);
    });

    //导出excel
    $('#import-btn').on('click', function () {
        location.href = '/market/protestac/import';
    });

    //跳转到xx页
    $('#go').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
            query($('#test_date1').val(), false, page);
        }
    });
});