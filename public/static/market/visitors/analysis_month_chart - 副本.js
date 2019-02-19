$(function () {
    //时间
    var data1 = [];
    $('.keyArr').each(function (index) {
        data1[index] = $(this).attr('data-name');
    })

    //进人数
    var data2 = [];
    $('.valArr').each(function (index) {
        data2[index] = $(this).attr('data-num');
    });
    data2 = data2.map(function (value) {
        value = value === "" ? "0" : value;
        return parseInt(value);
    });

    //出人数
    var data3 = [];
    $('.valArr2').each(function (index) {
        data3[index] = $(this).attr('data-num');
    });
    data3 = data3.map(function (value) {
        value = value === "" ? "0" : value;
        return parseInt(value);
    });


    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('my_chart'));
    // 指定图表的配置项和数据
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['进人数','出人数','平均人数']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '人数',
            min: 0,
            max: 300,
            interval: 50,
            axisLabel: {
                formatter: '{value} '
            }
        },
        {
            type: 'value',
            name: '平均人数',
            min: 0,
            max: 300,
            interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'进人数',
            type:'bar',
            data:[120, 140, 180, 220]
        },
        {
            name:'出人数',
            type:'bar',
            data:[120, 140, 180, 220]
        },
        {
            name:'平均人数',
            type:'line',
            yAxisIndex: 1,
            data:[20, 22, 24, 26]
        }
    ]
};
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    function query(date) {
        var data = {};
        //日期
        if (date !== '') {
            data.date = date;
        }

        //序列化参数
        var param = $.param(data);
        var url = '/market/visitorsac/analysis_month/parent_id/' + $('.active').attr('data-pid');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }



    //绑定日历控件
    laydate({
        elem: '#date',
        choose: function (date) {
            query(date);
        }
    });
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

    //查询上一月
    $('#prev_month').on('click', function () {
        //获取当前input框内日期，没有则为当月
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一月
        date.setMonth(date.getMonth() - 1);
        var  prevMonth= formatDate(date);
        //查询
        query(prevMonth);
    });

    //查询当月
    $('#today_month').on('click', function () {
        //查询
        query(formatDate(new Date()));
    });

    //查询下一月
    $('#next_month').on('click', function () {
        //获取当前input框内日期，没有则为当月
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一月
        date.setMonth(date.getMonth() + 1);
        var nextMonth = formatDate(date);
        //查询
        query(nextMonth);
    });

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
});