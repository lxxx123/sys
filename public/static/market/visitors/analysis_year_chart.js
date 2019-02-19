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
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
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
            data:[0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            name:'出人数',
            type:'bar',
            data:[0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            name:'平均人数',
            type:'line',
            yAxisIndex: 1,
            data:[0,0,0,0,0,0,0,0,0,0,0,0]
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
        var url = '/market/visitorsac/analysis_years/parent_id/' + $('.active').attr('data-pid');
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

    // //格式化日期:YYYY
    // function formatDate(date) {
    //     var y = date.getFullYear();
    //     return y ;
    // }

    //查询上一年
    $('#prev_year').on('click', function () {
        //获取当前input框内日期，没有则为当年
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一年
        date.setFullYear(date.getFullYear() - 1);
        var  prevYear= formatDate(date);
        //查询
        query(prevYear);
    });

    //查询当年
    $('#today_year').on('click', function () {
        //查询
        query(formatDate(new Date()));
    });

    //查询下一年
    $('#next_year').on('click', function () {
        //获取当前input框内日期，没有则为当年
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一年
        date.setFullYear(date.getFullYear() + 1);
        var nextYear = formatDate(date);
        //查询
        query(nextYear);
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
    // 时段查询
    $('#times_query').on('click', function () { 
        window.location.href = '/market/visitorsac/period_time/parent_id/6';
    });
});