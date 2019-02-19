$(function () {
    function query(date, page) {
        var data = {};

        //商户姓名
        if ($.trim($('#vc_place').val()) !== '') {
            data.vc_place = $.trim($('#vc_place').val());
        }

        //日期
        if (date !== '') {
            data.d_date = date;
        }

        //页码
        if (page) {
            data.page = page;
        }

        //序列化参数
        var param = $.param(data);
        var url = '/market/visitorsac/index/parent_id/' + $('.active').attr('data-parent');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }

    //绑定日历控件
    laydate({
        elem: '#d_date',
        choose: function (date) {
            query(date);
        }
    });

    //查询提交
    $('#query-btn').on('click', function () {
        query($('#d_date').val());
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
        var currentDay = $('#d_date').val() === '' ? formatDate(new Date()) : $('#d_date').val();
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
        var currentDay = $('#d_date').val() === '' ? formatDate(new Date()) : $('#d_date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        //查询
        query(nextDay);
    });

});