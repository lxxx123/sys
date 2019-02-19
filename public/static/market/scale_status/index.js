$(function(){
	function query(date, more, page) {
        var data = {};
            //日期
            if (date !== '') {
                data.check_date = date;
            }
            //摊位号
            if ($.trim($('#stall_no').val()) !== '') {
                data.stall_no = $.trim($('#stall_no').val());
            }
            //页码
            if (page) {
                data.page = page;
            }
        //序列化参数
        var param = $.param(data);
        var url = '/market/scale_statusac/index/parent_id/' + $('.active').attr('data-pid');
        if ($.param(data) !== '') {
            url = url + '?' + param;
        }
        location.href = url;
    }

	//页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/scale_statusac/index/parent_id/' + $('.active').attr('data-pid') + '?page=' + txt;
        } else {
            window.location.href = '/market/scale_statusac/index/parent_id/' + $('.active').attr('data-pid');
        }
    });

	//绑定日历控件
    laydate({
        elem: '#check_date',
        choose: function (date) {
            query(date);
        }
    });

  //查询提交
    $('#btn_search').on('click', function () {
        query($('#check_date').val());
    });

	//导出Excel
	$("#btn_export").click(function(){
		var check_date = document.getElementById("check_date").value;
		window.location.href = '/market/scale_statusac/export' + "?check_date=" + check_date;
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
        var currentDay = $('#check_date').val() === '' ? formatDate(new Date()) : $('#check_date').val();
        var date = new Date(currentDay);
        //设置为当前日期的前一天
        date.setTime(date.getTime() - 24 * 3600 * 1000);
        console.log(date);
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
        var currentDay = $('#check_date').val() === '' ? formatDate(new Date()) : $('#check_date').val();
        var date = new Date(currentDay);
        //设置为当前日期的后一天
        date.setTime(date.getTime() + 24 * 3600 * 1000);
        var nextDay = formatDate(date);
        //查询
        query(nextDay);
    });
	
	
});