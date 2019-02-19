$(function () {
    //商户
    var data1 = [];
    $('.keyArr').each(function (index) {
        data1[index] = $(this).attr('data-name');
    })

    //交易额
    var data2 = [];
    $('.moneyArr').each(function (index) {
        data2[index] = $(this).attr('data-money');
    })

    //交易量
    var data3 = [];
    $('.countArr').each(function (index) {
        data3[index] = $(this).attr('data-num');
    })
    //交易量
    var data4 = [];
    $('.countArr1').each(function (index) {
        data4[index] = $(this).attr('data-num');
    })
    //交易量
    var data5 = [];
    $('.countArr2').each(function (index) {
        data5[index] = $(this).attr('data-num');
    })
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('my_chart'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '月交易明细图',
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
            data: ['交易额', '交易笔数', '交易量', '平均价']
        },
        grid:{
          y2:70
        },
        xAxis: [{
            splitLine: {show: false},
            type: 'category',
            data: data1,
            axisLabel:{
                interval:0,
                formatter:function (value) {
                    return value.split('').join('\n');
                }
            }
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
            name: '交易笔数',
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
                data: data2

            },
            {
                name: '交易笔数',
                smooth: true,
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#DA70D6',
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: data3
            }
            ,
            {
                name: '交易量',
                smooth: true,
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: 'blue',

                    }
                },
                data: data4
            }
            ,
            {
                name: '平均价',
                smooth: true,
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: 'black',

                    }
                },
                data: data5
            }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    function query(date, more, page) {
        var data = {};
        //日期
        if (date !== '') {
            data.date = date;
        }
        //序列化参数
        var param = $.param(data);
        var url = '/market/trade_totalac/totalmonth/parent_id/' + $('.active').attr('data-pid');
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

    //日统计 
    $("#btn_days").on('click',function(){
         window.location.href = '/market/trade_totalac/index/parent_id/6'
    });
    // 月统计
    $("#btn_month").on('click',function(){
         window.location.href = '/market/trade_totalac/totalmonth/parent_id/6'
    });
    // 年统计
    $("#btn_years").on('click',function(){
         window.location.href = '/market/trade_totalac/totalyear/parent_id/6'
    });
    //时间段统计 
    $("#btn_times").on('click',function(){
         window.location.href = '/market/trade_totalac/totaltimes/parent_id/6'
    });

});