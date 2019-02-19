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
            text: '时段交易明细图',
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


    //绑定日历控件
    laydate({
        elem: '#start_date',
    });
    laydate({
        elem: '#end_date',
    });

  $("#btn_query").on('click',function(){
       var start_date=$('#start_date').val();
       var end_date=$('#end_date').val();
       if(!start_date){
        return false;
       }
       if(!end_date){
        return false;
       }
       window.location.href = '/market/trade_totalac/totaltimes/parent_id/6?start_date='+start_date+'&end_date='+end_date;
  });
  // 返回
  $("#btn_back").on('click',function(){
       window.location.href = '/market/trade_totalac/index/parent_id/6';
  });

});