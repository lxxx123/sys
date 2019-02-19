$(function () {
    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    laydate({
        elem: '#date'
    });

    //全选，全不选
    $('#check-all').on('change', function () {
        var checked = $(this)[0].checked;
        $('.check-one').each(function () {
            $(this)[0].checked = checked;
        });
    });
});