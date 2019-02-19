$(function(){
    //页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/merchant_purchaseac/years/parent_id/'+ $('.active').attr('data-parent')+'?page=' + txt;
        } else {
            window.location.href = '/market/merchant_purchaseac/years/parent_id/'+ $('.active').attr('data-parent');
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
        var url = '/market/merchant_purchaseac/years/parent_id/'+ $('.active').attr('data-parent');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }
    laydate({
        elem: '#date',
        choose: function (date) {
            query(date);
        }
    });
   //格式化日期:YYYY
    function formatDate(date) {
        var y = date.getFullYear();
        return y ;
    }

    //查询上一年
    $('#prev-btn').on('click', function () {
        //获取当前input框内日期，没有则为当年
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一年
        date.setFullYear(date.getFullYear() - 1);
        var  prevYear= formatDate(date);

        var txt = $("#search").val();
        var b = 1;
        //查询
        query(prevYear,txt,b);
    });

    //查询当年
    $('#today-btn').on('click', function () {
        var txt = $("#search").val();
        var b = 1;
        //查询
        query(formatDate(new Date()),txt,b);
    });

    //查询下一年
    $('#next-btn').on('click', function () {
        //获取当前input框内日期，没有则为当年
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一年
        date.setFullYear(date.getFullYear() + 1);
        var nextYear = formatDate(date);
        var txt = $("#search").val();
        var b = 1;
        //查询
        query(nextYear,txt,b);
    });

    //查找
    $("#query_search").click(function(){
        var txt = $("#search").val();
        var date=$("#date").val();
        if(txt != ''){
            window.location.href = '/market/merchant_purchaseac/years/b/1/parent_id/'+ $('.active').attr('data-parent')+"?user_name="+txt+"&date="+date;
        }else{
            window.location.href = '/market/merchant_purchaseac/years/parent_id/'+ $('.active').attr('data-parent');
        }   
    });	


    //查找
    $("#query_day").click(function(){    

            window.location.href = '/market/merchant_purchaseac/index/parent_id/'+ $('.active').attr('data-parent');
    });
    $("#query_months").click(function(){    

            window.location.href = '/market/merchant_purchaseac/month/parent_id/'+ $('.active').attr('data-parent');
    });
});