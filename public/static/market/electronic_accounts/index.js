$(function () {
    //查询函数
    function query(date, page) {
        var data = {};
            //日期
            if (date !== '') {
                data.bill_dt = date;
            }

            //页码
            if (page) {
                data.page = page;
            }
        

        //序列化参数
        var param = $.param(data);
        var url = '/market/electronic_accountsac/index/parent_id/' + $('.active').attr('data-parent');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }

    //绑定日历控件
    laydate({
        elem: '#bill_dt1',
        choose: function (date) {
            query(date);
        }
    });

    //查找
    $("#query_btn").click(function(){
        var txt = $("#stall_no1").val();
        var date = $("#bill_dt1").val();
        // alert(1);
        if(txt != ''){
            // alert(2);
            window.location.href = '/market/electronic_accountsac/index/parent_id/'+ $('.active').attr('data-parent')+"?key="+txt;
        }else{
            window.location.href = '/market/electronic_accountsac/index/parent_id/'+ $('.active').attr('data-parent');
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
    $('#prev-btn').on('click', function () {
        //获取当前input框内日期，没有则为今天
        var currentDay = $('#bill_dt1').val() === '' ? formatDate(new Date()) : $('#bill_dt1').val();
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
        var currentDay = $('#bill_dt1').val() === '' ? formatDate(new Date()) : $('#bill_dt1').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        //查询
        query(nextDay);
    });

    //跳转到xx页
    $('#go').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
            query($('#bill_dt1').val(),  page);
        }
    });

});