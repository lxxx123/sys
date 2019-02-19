$(function(){
    //页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/merchant_purchaseac/month/parent_id/6?page=' + txt;
        } else {
            window.location.href = '/market/merchant_purchaseac/month/parent_id/6';
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
        var url = '/market/merchant_purchaseac/month/parent_id/6' ;
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }

    //格式化日期:YYYY-mm
    function formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        return y + '-' + m;
    }
    laydate({
        elem: '#date',
        choose: function (date) {
            query(date);
        }
    });
    //查询上一月
    $('#prev-btn').on('click', function () {
        //获取当前input框内日期，没有则为当月
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一月
        date.setMonth(date.getMonth() - 1);
        var  prevMonth= formatDate(date);
        var txt = $("#search").val();
        var b = 1;
        //查询
        query(prevMonth,txt,b);
    });

    //查询当月
    $('#today-btn').on('click', function () {
        var txt = $("#search").val();
        var b = 1;
        //查询
        query(formatDate(new Date()),txt,b);
    });

    //查询下一月
    $('#next-btn').on('click', function () {
        //获取当前input框内日期，没有则为当月
        var currentDay = $('#date').val() === '' ? formatDate(new Date()) : $('#date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一月
        date.setMonth(date.getMonth() + 1);
        var nextMonth = formatDate(date);

        var txt = $("#search").val();
        var b = 1;
        //查询
        query(nextMonth,txt,b);    });

    //查找
    $("#query_search").click(function(){
        var txt = $("#search").val();
        var date=$("#date").val();
        if(txt != ''){
            window.location.href = '/market/merchant_purchaseac/month/b/1/parent_id/'+ $('.active').attr('data-parent')+"?user_name="+txt+"&date="+date;
        }else{
            window.location.href = '/market/merchant_purchaseac/month/parent_id/'+ $('.active').attr('data-parent');
        }   
    }); 

    //全选，全不选
    $('#check-all').on('change', function () {
        var checked = $(this)[0].checked;
        $('input[name="id"]').each(function () {
            $(this)[0].checked = checked;
        });
    });
    //查找
    $("#query_day").click(function(){    

            window.location.href = '/market/merchant_purchaseac/index/parent_id/6';
    });
    $("#query_years").click(function(){    

            window.location.href = '/market/merchant_purchaseac/years/parent_id/6';
    });
    
});