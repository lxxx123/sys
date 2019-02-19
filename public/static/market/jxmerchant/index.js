$(function () {
    function query(date, page) {
        var data = {};

        //商户姓名
        if ($.trim($('#vc_place').val()) !== '') {
            data.vc_place = $.trim($('#vc_place').val());
        }

        //日期
        if (date != '') {
            data.d_date = date;
        }

        //页码
        if (page) {
            data.page = page;
        }

        //序列化参数
        var param = $.param(data);
        var url = '/market/jxmerchantac/count/parent_id/' + $('.active').attr('data-parent');

        if ($.param(data) !== '') {
            url = url + '?' + param;


        }

        location.href = url;
    }


    //跳转到xx页
    $('#go').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
        } else {
            query($('#d_date').val(), page);
        }
    });
});