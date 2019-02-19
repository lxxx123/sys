$(function () {
    // 加载提示(该功能预留)
    document.onreadystatechange = function () {
        //alert('正在加载中...'); //
        if (document.readyState == "complete") {
            //alert('加载完成');
        }
    }

    var myDate = new Date;
    var time_flag = $('#time_flag').val();
    var format = 'YYYY-MM-DD';
    if (time_flag == 2) {
        format = 'YYYY-MM';
    }
    if (time_flag == 3) {
        format = 'YYYY';
    }
    //绑定日历控件
    laydate({
        elem: '#before_date',
        format: format,
    });
    laydate({
        elem: '#after_date',
        format: format,
    });

    //查询
    function query() {
        var url = '/market/merchant_rankac/index?parent_id=' + $('.active').attr('data-parent') + '&time_flag=' + $('#time_flag').val() + '&before_date=' + $('#before_date').val() + '&after_date=' + $('#after_date').val() + '&order_rule=' + $('#order_rule').val();
        //alert(url);return false;
        location.href = url;
    }

    $("#query-btn").click(function () {
        query();
    });

    //跳转到xx页
    $('#go').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
            var url = '/market/merchant_rankac/index?parent_id=' + $('.active').attr('data-parent') + '&time_flag=' + $('#time_flag').val() + '&before_date=' + $('#before_date').val() + '&after_date=' + $('#after_date').val() + '&order_rule=' + $('#order_rule').val() + '&page=' + page;
            //alert(url);return false;
            location.href = url;
        }
    });

    // 点击页码查询
    $(".pagination").find('li').click(function () {
        var page = $(this).find('a').html();
        var turn_url = '/market/merchant_rankac/index?parent_id=' + $('.active').attr('data-parent') + '&time_flag=' + $('#time_flag').val() + '&before_date=' + $('#before_date').val() + '&after_date=' + $('#after_date').val() + '&order_rule=' + $('#order_rule').val() + '&page=' + page;
        $(this).find('a').attr('href', turn_url);
    });

    //显示交易图
    $("#chart").click(function () {
        var url = '/market/merchant_rankac/chart?parent_id=' + $('.active').attr('data-parent') + '&time_flag=' + $('#time_flag').val() + '&before_date=' + $('#before_date').val() + '&after_date=' + $('#after_date').val() + '&order_rule=' + $('#order_rule').val();
        location.href = url;
    });
    //日月年查询
    $("#by_day").click(function () {
        var now_year = myDate.getFullYear();//获取当前年
        var now_month = myDate.getMonth() + 1;//获取当前月
        var now_day = myDate.getDate();//获取当前日
        var date_day = now_year + '-' + now_month + '-' + now_day;
        $('#before_date').val(date_day);
        $('#after_date').val(date_day);
        $('#time_flag').val(1);
        query();
    });
    $("#by_month").click(function () {
        var now_year = myDate.getFullYear();//获取当前年
        var now_month = myDate.getMonth() + 1;//获取当前月
        var date_month = now_year + '-' + now_month;
        $('#before_date').val(date_month);
        $('#after_date').val(date_month);
        $('#time_flag').val(2);
        query();
        $(".laydate_ym laydate_m").css('display', 'none');
        $(".laydate_table").css('display', 'none');
    });
    $("#by_year").click(function () {
        var now_year = myDate.getFullYear();//获取当前年
        $('#before_date').val(now_year);
        $('#after_date').val(now_year);
        $('#time_flag').val(3);
        query();
    });

    //排序查询
    $("#count").click(function () {
        if ($('#order_rule').val() != 'count ASC') {
            $('#order_rule').val('count ASC');
        } else {
            $('#order_rule').val('count DESC');
        }
        query();
    });
    $("#prod_count").click(function () {
        if ($('#order_rule').val() != 'total_prod_count ASC') {
            $('#order_rule').val('total_prod_count ASC');
        } else {
            $('#order_rule').val('total_prod_count DESC');
        }
        query();
    });
    $("#amount").click(function () {
        if ($('#order_rule').val() != 'total_amount ASC') {
            $('#order_rule').val('total_amount ASC');
        } else {
            $('#order_rule').val('total_amount DESC');
        }
        query();
    });
    //数据导出
    $("#export-btn").click(function () {
        var url = '/market/merchant_rankac/export?time_flag=' + $('#time_flag').val() + '&before_date=' + $('#before_date').val() + '&after_date=' + $('#after_date').val() + '&order_rule=' + $('#order_rule').val();
        location.href = url;
    });

})