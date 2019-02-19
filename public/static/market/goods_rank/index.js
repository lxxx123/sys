$(function () {
// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('my_chart'));
    myChart.showLoading();
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['2018年8月']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'value',
                boundaryGap: [0, 0.01],
                name: '元'
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: [''],
                name: '类别'
            }
        ],
        series: [
            {
                name: '元',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (seriesIndex, series, dataIndex, data) {
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD'
                            ];
                            colorList = colorList.reverse();
                            return colorList[series];
                        }
                    }
                },

                data: [0]
            }
        ]
    };

    var month = $('#month').val();
    var prevMonth = '';
    var nextMonth = '';

    $('#prev-btn').on('click', function () {
        $.get('/market/goods_rankac/data?date=' + prevMonth, callback);
    });

    $('#today-btn').on('click', function () {
        $.get('/market/goods_rankac/data?date=' + month, callback);
    });

    $('#next-btn').on('click', function () {
        $.get('/market/goods_rankac/data?date=' + nextMonth, callback);
    });

    $.get('/market/goods_rankac/data?date=' + $('#month').val(), callback);

    function callback(data) {
        data = JSON.parse(data);
        $('#month').val(data.month);
        prevMonth = data.prev_month;
        nextMonth = data.next_month;
        var x = [];
        var y = [];

        $.each(data.data, function (index, item) {
            x.push(item.goods_name);
            y.push(item.amount);
        });
        if (data.data.length == 0) {
            x = [''];
            y = [0];
        }
        option.legend.data = [data.month];
        option.yAxis[0].data = x.reverse();
        option.series[0].data = y.reverse();

        // 使用刚指定的配置项和数据显示图表。
        myChart.hideLoading();
        myChart.setOption(option, true);
    }
});