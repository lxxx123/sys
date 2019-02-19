$(function(){
    //页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/merchant_purchaseac/index/parent_id/'+ $('.active').attr('data-parent')+'?page=' + txt;
        } else {
            window.location.href = '/market/merchant_purchaseac/index/parent_id/'+ $('.active').attr('data-parent');
        }
    });

    function query(date, txt, b) {
        var data = {};
        //日期
        if (date !== '') {
            data.date = date;
        }
        if (txt !== '') {
            data.user_name = txt;
        }
        if (b !== '') {
            data.b = b;
        }
        //序列化参数
        var param = $.param(data);
        var url = '/market/merchant_purchaseac/index/parent_id/'+ $('.active').attr('data-parent');

        if ($.param(data) !== '') {
            url = url + '?' + param;
            
        }
        location.href = url;
    }

    //查询上一天
    $('#prev-btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一天
        date.setTime(date.getTime() - 24 * 3600 * 1000);
        var prevDay = formatDate(date);
        var txt = $("#search").val();
        var b = 1;
        //查询
        query(prevDay,txt,b);
    });

    //查询当天
    $('#today-btn').on('click', function () {
        var txt = $("#search").val();
        var b = 1;
        //查询
        query(formatDate(new Date()),txt,b);

    });

    //查询下一天
    $('#next-btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        var txt = $("#search").val();
        var b = 1;
        //查询
        query(nextDay,txt,b);
         });
    //绑定日历控件
    laydate({
        elem: '#date',
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
    //查找
    $("#query_search").click(function(){
        var txt = $("#search").val();
        var date=$("#date").val();
        if(txt != ''){
            window.location.href = '/market/merchant_purchaseac/index/b/1/parent_id/'+ $('.active').attr('data-parent')+"?user_name="+txt+"&date="+date;
        }else{
            window.location.href = '/market/merchant_purchaseac/index/parent_id/'+ $('.active').attr('data-parent');
        }   
    });	
    //日查询
    $('#query_day').on('click', function () {

        query(formatDate(new Date()));
    });
    
    // 月查询

    $("#query_months").click(function(){    

            window.location.href = '/market/merchant_purchaseac/month/parent_id/'+ $('.active').attr('data-parent');
    }); 

    // 年查询
    $("#query_years").click(function(){    

            window.location.href = '/market/merchant_purchaseac/years/parent_id/'+ $('.active').attr('data-parent');
    }); 
});