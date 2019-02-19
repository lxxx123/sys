$(function () {
    var myDate = new Date;
    var time_type = $('#time_type').val();
    var format = 'YYYY-MM-DD';
    if (time_type == 2) {
        format = 'YYYY-MM';
    }
    if (time_type == 3) {
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
// 验证输入的页码
    $('#go').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
            query();
        }
    });

//查询
    function query() {
        var url = '/market/transaction_surveyac/index/parent_id/' + $('.active').attr('data-parent') + '/type/' + $('#time_type').val() + '/before_date/' + $('#before_date').val() + '/after_date/' + $('#after_date').val() + '?page=' + $('#page').val();
        location.href = url;
    }

    $("#query-btn").click(function () {
        $('#page').val(1);
        query();
    });

//显示交易图
    $("#day_count").click(function () {
        window.location.href = "/market/transaction_surveyac/chart_day.html";
    });
    $("#month_count").click(function () {
        window.location.href = "/market/transaction_surveyac/chart_month.html";
    });
    $("#year_count").click(function () {
        window.location.href = "/market/transaction_surveyac/chart_year.html";
    });

//日月年查询
    $("#by_day").click(function () {
        var now_year = myDate.getFullYear();//获取当前年
        var now_month = myDate.getMonth()+1;//获取当前月
        var now_day = myDate.getDate();//获取当前日
        var date_day = now_year +'-'+ now_month +'-'+ now_day;
        $('#before_date').val(date_day);
        $('#after_date').val(date_day);
        $('#time_type').val(1);
        query();
    });
    $("#by_month").click(function () {
        var now_year = myDate.getFullYear();//获取当前年
        var now_month = myDate.getMonth()+1;//获取当前月
        var date_month = now_year + '-' +now_month;
        $('#before_date').val(date_month);
        $('#after_date').val(date_month);
        $('#time_type').val(2);
        query();
        $(".laydate_ym laydate_m").css('display', 'none');
        $(".laydate_table").css('display', 'none');
    });
    $("#by_year").click(function () {
        var now_year = myDate.getFullYear();//获取当前年
        $('#before_date').val(now_year);
        $('#after_date').val(now_year);
        $('#time_type').val(3);
        query();
    });

//数据导出
    $("#export-btn").click(function () {
        var url = '/market/transaction_surveyac/export/type/' + $('#time_type').val() + '/before_date/' + $('#before_date').val() + '/after_date/' + $('#after_date').val();
        location.href = url;
    });

})