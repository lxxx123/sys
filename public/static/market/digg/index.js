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
        var url = '/market/diggac/index/parent_id/' + $('.active').attr('data-parent');
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

    //Excel导出
    $("#btn_export").click(function () {
        window.location.href = '/market/diggac/export';
    });

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
});