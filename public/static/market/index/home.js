$(function () {
    //展开，收起
    $('#trade-toggle').on('click', function () {
        var dataToggle = $(this).attr('data-toggle');
        if (dataToggle === 'true') {
            $('.trade').animate({height: '116px'}, function () {
                $('#trade-toggle .text').text('展开');
                $('#trade-toggle .icon').css({transform: 'rotate(0)'});
                $('#trade-toggle').attr('data-toggle', 'false');
            });
        } else {
            $('.trade').animate({height: '232px'}, function () {
                $('#trade-toggle .text').text('收起');
                $('#trade-toggle .icon').css({transform: 'rotate(180deg)'});
                $('#trade-toggle').attr('data-toggle', 'true');
            });
        }
    });

    $('#todo-toggle').on('click', function () {
        var dataToggle = $(this).attr('data-toggle');
        if (dataToggle === 'true') {
            $('.todo').animate({height: '116px'}, function () {
                $('#todo-toggle .text').text('展开');
                $('#todo-toggle .icon').css({transform: 'rotate(0)'});
                $('#todo-toggle').attr('data-toggle', 'false');
            });
        } else {
            $('.todo').animate({height: '154px'}, function () {
                $('#todo-toggle .text').text('收起');
                $('#todo-toggle .icon').css({transform: 'rotate(180deg)'});
                $('#todo-toggle').attr('data-toggle', 'true');
            });
        }
    });

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 使用刚指定的配置项和数据显示图表。

    $.get('/stat/chart', function (data) {
        // data = JSON.parse(data);
        // alert(data);
        // console.log(data);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '交易明细图',
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
            calculable: true,
            legend: {
                textStyle: {
                    fontSize: 16
                },
                data: ['交易额', '交易量']
            },
            xAxis: [{
                splitLine: {show: false},
                type: 'category',
                data: data.date_arr
            }],
            yAxis: [{
                type: 'value',
                name: '交易额',
                axisLabel: {
                    formatter: '{value} 元'
                }
            }, {
                splitLine: {show: false},
                type: 'value',
                name: '交易量',
                axisLabel: {
                    formatter: '{value} 笔'
                }
            }],
            series: [
                {
                    name: '交易额',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#2DC295'
                        }
                    },
                    data: data.amount_arr

                },
                {
                    name: '交易量',
                    smooth: true,
                    type: 'line',
                    symbol: 'none',
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: '#646B9A',
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: data.number_arr
                }]
        };

        myChart.setOption(option);
    });

    //提示框开关
    $('#modal').on('click', function () {
        $('#modal .info').slideToggle();
    });

    setTimeout(function () {
        $('#modal .info').slideUp();
    }, 5000);
});