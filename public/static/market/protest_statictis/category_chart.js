$(function(){
    //分类查询
    $('#query_category').on('click', function () {
        location.href = '/market/protest_statisticac/total_chart/parent_id/6';
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
    var myChart = echarts.init(document.getElementById('my_charts'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '商品合格率统计图',
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
     //     grid: { // 控制图的大小，调整下面这些值就可以，
     //          x: 40,
     //          x2: 100,

     //          y2: 150// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
     // }, 

        calculable: true,
        legend: {
            textStyle: {
                fontSize: 16
            },
            data: ['合格率']
        },
        xAxis: [{
             axisLabel:{
                     interval:0,
                     rotate:45,
                     // margin:4,
                     textStyle:{
                              color:"#222"
                     }},

            splitLine: {show: false},
            type: 'category',
            name:'商品分类',
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
        var url = '/market/protest_statisticac/category_chart/parent_id/6';
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }



    //绑定日历控件
    laydate({
        elem: '#dates',
        choose: function (date) {
            query(date);
        }
    });

    //格式化日期:YYYY-mm-dd
    function formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    } 

    //查询上一天
    $('#prev_btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#dates').val() === '' ? formatDate(new Date()) : $('#dates').val();
        
        var date = new Date(currentDay);
        //设置为当前日期的前一天
        date.setTime(date.getTime() - 24 * 3600 * 1000);
        var prevDay = formatDate(date);
        //查询
        query(prevDay);
    });

    //查询当天
    $('#today_btn').on('click', function () {
        //查询
        query(formatDate(new Date()));
    });

    //查询下一天
    $('#next_btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        //查询
        query(nextDay);
    });

});