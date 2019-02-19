$(function () {
    // 返回
    $(".back-btn").click(function () {
        window.history.go(-1);
    });
    // 接收值
    var before_date = $("#before_date").val();
    var after_date = $("#after_date").val();
    var order_rule = $("#order_rule").val();
    var time_flag = $("#time_flag").val();

    var myChart = echarts.init(document.getElementById('my_chart'));
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['交易金额']
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
                data: [],
                name: '商户'
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

                data: []
            }
        ]
    };

    // ajax 请求访问
    $.ajax({
        type: 'POST',
        url: '/market/merchant_rankac/ajax_mer_static',
        data: {before_date: before_date, after_date: after_date, order_rule: order_rule, time_flag: time_flag},
        dataType: 'json',
        success: function (msg) {
            var data = eval('('+msg+')');
            for(var i=0; i<data.length; i++) {
                option.yAxis[0].data.push(data[i]['entity_name']);
                option.series[0].data.push(data[i]['total_amount']);
            };
            //console.log(option.yAxis[0].data);
            myChart.setOption(option, true);
        },
        error: function () {
            alert('请刷新页面~');
            window.location.go(-1);
        }
    });
    // 使用刚指定的配置项和数据显示图表。

});