$(function () {

    //x轴
    var data1 = [];
    $('.keyArr').each(function (index) {
        data1[index] = $(this).attr('data-name');
    });

    //y轴
    var data2 = [];
    $('.valArr').each(function (index) {
        data2[index] = $(this).attr('data-num');
    });
    data2 = data2.map(function (value) {
        value = value === "" ? "0" : value;
        return parseInt(value);
    });

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('my_chart'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '客流量峰值图',
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
            data: ['人数']
        },
        xAxis: [{
            splitLine: {show: false},
            type: 'category',
            name: '时间',
            data: data1
        }],
        yAxis: [{
            type: 'value',
            name: '人数',
            axisLabel: {
                formatter: '{value}'
            }
        }],
        series: [
            {
                name: '人数',
                smooth: true,
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#FF7F50'
                    }
                },
                data: data2,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
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
        var url = '/market/visitorsac/peak_chart/parent_id/' + $('.active').attr('data-pid');
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

    $(".btn").click(function () {
        var url = '/market/visitorsac/peak_chart/parent_id/' + $('.active').attr('data-pid');
        url += '?type=' + $(this).attr('seltype') + '&date=' + $("#date").val();
        window.location.href = url;
    });

});