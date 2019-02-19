$(function () {
//     //时间 
//     var data1 = [];
//     $('.keyArr').each(function (index) {
//         data1[index] = $(this).attr('data-name');
//     })

//     //进人数
//     var data2 = [];
//     $('.valArr').each(function (index) {
//         data2[index] = $(this).attr('data-num');
//     });
//     data2 = data2.map(function (value) {
//         value = value === "" ? "0" : value;
//         return parseInt(value);
//     });

//     //出人数
//     var data3 = [];
//     $('.valArr2').each(function (index) {
//         data3[index] = $(this).attr('data-out');
//     });
//     data3 = data3.map(function (value) {
//         value = value === "" ? "0" : value;
//         return parseInt(value);
//     });


//     // 基于准备好的dom，初始化echarts实例
//     var myChart = echarts.init(document.getElementById('my_chart'));
//     // 指定图表的配置项和数据
// option = {
//     tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//             type: 'cross',
//             crossStyle: {
//                 color: '#999'
//             }
//         }
//     },
//     toolbox: {
//         feature: {
//             dataView: {show: true, readOnly: false},
//             magicType: {show: true, type: ['line', 'bar']},
//             restore: {show: true},
//             saveAsImage: {show: true}
//         }
//     },
//     legend: {
//         data:['进人数','出人数','滞留人数']
//     },
//     xAxis: [
//         {
//             type: 'category',
//             data: data1,
//             axisPointer: {
//                 type: 'shadow'
//             }
//         }
//     ],
//     yAxis: [
//         {
//             type: 'value',
//             name: '人数',
//             min: 0,
//             max: 500,
//             interval: 50,
//             axisLabel: {
//                 formatter: '{value} '
//             }
//         },
//         {
//             type: 'value',
//             name: '平均人数',
//             min: 0,
//             max: 500,
//             interval: 5,
//             axisLabel: {
//                 formatter: '{value}'
//             }
//         }
//     ],
//     series: [
//         {
//             name:'进人数',
//             type:'bar',
//             data:data2
//         },
//         {
//             name:'出人数',
//             type:'bar',
//             data:data3
//         },
//         {
//             name:'平均人数',
//             type:'line',
//             yAxisIndex: 1,
//             data:[0,0,0,0,0,0,0,0,0,0,0,0]
//         }
//     ]
// };
//     // 使用刚指定的配置项和数据显示图表。
//     myChart.setOption(option);

    function query(date) {
        var data = {};
        //日期
        if (date !== '') {
            data.date = date;
        }
        //序列化参数
        var param = $.param(data);
        var url = '/market/visitorsac/analysis_chart/parent_id/' + $('.active').attr('data-pid');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }



    //绑定日历控件
    laydate({
        elem: '#date',
        // choose: function (date) {
        //     query(date);
        // }
    });

    // //绑定日历控件
    // laydate({
    //     elem: '#start_date',
    // });
    //     //绑定日历控件
    // laydate({
    //     elem: '#end_date',
    
    // });
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
    $('#prev-btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一天
        date.setTime(date.getTime() - 24 * 3600 * 1000);
        var prevDay = formatDate(date);
        //查询
        query(prevDay);
    });

    //查询当天
    $('#today-btn').on('click', function () {
        //查询
        query(formatDate(new Date()));
    });

    //查询下一天
    $('#next-btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        //查询
        query(nextDay);
    });
    //日查询
    $('#days_query').on('click', function () {

            window.location.href = '/market/visitorsac/analysis_chart/parent_id/6';
    });
    // // 月查询
    // $('#month_query').on('click', function () { 
    //  // alert(123);
    //     window.location.href = '/market/visitorsac/analysis_month/parent_id/6';
    // });

    // // 年查询
    // $('#month_year').on('click', function () { 
    //     window.location.href = '/market/visitorsac/analysis_years/parent_id/6';
    // });
    // 时段查询
    $('#times_query').on('click', function () { 
        //window.location.href = '/market/visitorsac/period_time/parent_id/6';
        window.location.href = '/market/visitorsac/period_chart/parent_id/6';
    });
  // $("#btn_query").on('click',function(){
  //      var start_date=$('#start_date').val();
  //      var end_date=$('#end_date').val();
  //      if(!start_date){
  //       return false;
  //      }
  //      if(!end_date){
  //       return false;
  //      }
  //      window.location.href = '/market/visitorsac/period_time/parent_id/6?start_date='+start_date+'&end_date='+end_date;
  // });

});