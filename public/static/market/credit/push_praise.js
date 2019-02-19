$(function () {
    //从dom中获取图表数据
    var result = JSON.parse($('#chart-data').text());

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('my_chart'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '点评分析',
            textStyle: {
                color: '#ccc',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                fontSize: 18
            }
        },
        tooltip: {
            trigger: 'axis'
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
            data: ['点评次数']
        },
        grid:{
            y2:70
        },
        xAxis: [{
            splitLine: {show: false},
            type: 'category',
            data: result.merchant_arr,
            axisLabel:{
                interval:0,
                formatter:function (value) {
                    return value.split('').join('\n');
                }
            }
        }],
        yAxis: [{
            type: 'value',
            name: '点评次数',
            axisLabel: {
                formatter: '{value} 次'
            }
        }],
        series: [
            {
                name: '点评次数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#2DC295'
                    }
                },
                data: result.count_arr
            }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

});