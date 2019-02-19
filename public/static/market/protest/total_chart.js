$(function(){
    //分类查询
    $('#query_category').on('click', function () {
        location.href = '/market/protestac/category_chart/parent_id/6';
    });
    //x轴
    var data1 = [];
    $('.keyArr').each(function (index) {
        data1[index] = $(this).attr('data-name');
    })

    //y轴
    var data2 = [];
    $('.valArr').each(function (index) {
        data2[index] = $(this).attr('data-num');
    })

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('my_chart'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '商品检测统计图',
            textStyle: {
                color: '#ccc',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                fontSize: 18
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{a0}:{c0}%'
        },
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: false
                },
                dataView: {
                    show: false,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        legend: {
            textStyle: {
                fontSize: 16
            },
            data: ['合格率']
        },
        xAxis: [{
            splitLine: {show: false},
            type: 'category',
            name:'日期',
            data: data1
        }],
        yAxis: [{
            type: 'value',
            name: '合格率',
            axisLabel: {
                formatter: '{value} %'
            }
        }],
        series: [
            {
                name: '合格率',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#FF7F50'
                    }
                },
                data: data2
            }]
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
        var url = '/market/protestac/total_chart/parent_id/' + $('.active').attr('data-pid');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }



    //绑定日历控件
    laydate({
        elem: '#date',
        format: 'YYYY-MM',
        choose: function (date) {
            query(date);
        }
    });

    //格式化日期:YYYY-mm
    function formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        return y + '-' + m;
    }

    //查询上一月
    $('#prev-btn').on('click', function () {
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
    $('#today-btn').on('click', function () {
        //查询
        query(formatDate(new Date()));
    });

    //查询下一月
    $('#next-btn').on('click', function () {
        //获取当前input框内日期，没有则为当月
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一月
        date.setMonth(date.getMonth() + 1);
        var nextMonth = formatDate(date);
        //查询
        query(nextMonth);
    });

});