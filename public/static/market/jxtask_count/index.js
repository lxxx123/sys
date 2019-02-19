$(function () {

    //绑定日历控件
    laydate({
        elem: '#date_before',
    });

    laydate({
        elem: '#date_after',
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

    //查询提交
    $('#query-btn').on('click', function () {
        // 主导航id，当前页，查询开始日期，查询结束日期
        var parent_id = $('.active').attr('data-parent');
        var current_page = $('input[name=current_page]').val()=='' ? 1 : $('input[name=current_page]').val();
        var date_before = $('#date_before').val()=='' ? formatDate(new Date()) : $('#date_before').val();
        var date_after = $('#date_after').val()=='' ? formatDate(new Date()) : $('#date_after').val();

        if (date_after < date_before) {
            alert('请选择正确的日期');return false;
        }
        var url = '/market/jxtaskac/count/parent_id/' + parent_id + '?date_before=' + date_before +'&date_after=' + date_after + '&page=' + current_page;
        window.location.href = url;
    });

    //导出excel
    $('#export-btn').on('click', function () {
        var date_before = $('#date_before').val()=='' ? formatDate(new Date()) : $('#date_before').val();
        var date_after = $('#date_after').val()=='' ? formatDate(new Date()) : $('#date_after').val();
        if (date_after < date_before) {
            alert('请选择正确的日期');return false;
        }
        var url = '/market/jxtaskac/export_count' + '?date_before=' + date_before +'&date_after=' + date_after;
            window.location.href = url;
    });

    //跳转到xx页
    $('#go').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
            // 主导航id，当前页，查询开始日期，查询结束日期
            var parent_id = $('.active').attr('data-parent');
            var date_before = $('#date_before').val()=='' ? formatDate(new Date()) : $('#date_before').val();
            var date_after = $('#date_after').val()=='' ? formatDate(new Date()) : $('#date_after').val();
            if (date_after < date_before) {
                alert('请选择正确的日期');return false;
            }

            var url = '/market/jxtaskac/count/parent_id/' + parent_id + '?date_before=' + date_before +'&date_after=' + date_after + '&page=' + page;
            window.location.href = url;
        }
    });
});