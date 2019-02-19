$(function () {

    //绑定日历控件
    laydate({
        elem: '#date1',
    });
    laydate({
        elem: '#date2',
    });

    //日查询
    $('#days_query').on('click', function () {

            window.location.href = '/market/visitorsac/analysis_chart/parent_id/6';
    });
    
    // 时段查询
    $('#times_query').on('click', function () { 
        //window.location.href = '/market/visitorsac/period_time/parent_id/6';
        window.location.href = '/market/visitorsac/period_chart/parent_id/6';
    });

    //时间段查询
    $("#pie_search_btn").click(function(){
        var date1 = $("#date1").val();
        var date2 = $("#date2").val();
        window.location.href = '/market/visitorsac/period_chart/parent_id/6/date1/'+date1+'/date2/'+date2;
    });

});