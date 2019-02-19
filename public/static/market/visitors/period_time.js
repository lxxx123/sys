$(function () {

   


    // //绑定日历控件
    // laydate({
    //     elem: '#date1',
    //     choose: function (date) {

    //     }
    // });
    // //绑定日历控件
    // laydate({
    //     elem: '#date2',
    //     choose: function (date) {

    //     }
    // });
    // //格式化日期:YYYY-mm
    // function formatDate(date) {
    //     var y = date.getFullYear();
    //     return y ;
    // }


    //日查询
    $('#days_query').on('click', function () {
        window.location.href = '/market/visitorsac/analysis_chart/parent_id/6';
    });
    // 月查询
    $('#month_query').on('click', function () {
        window.location.href = '/market/visitorsac/analysis_month/parent_id/6';
    });

    // 年查询
    $('#month_year').on('click', function () {
        window.location.href = '/market/visitorsac/analysis_years/parent_id/6';
    });
    // 时段查询
    $('#times_query').on('click', function () {
        window.location.href = '/market/visitorsac/period_time/parent_id/6';
    });
});