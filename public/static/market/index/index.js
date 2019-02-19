$(function () {
    //根据iframe内嵌网页的高度，动态设置iframe的高度
    $('#iframe').on('load', function () {
        // console.log($(this)[0].contentWindow.$('body').height());
        $(this).attr('height', $(this)[0].contentWindow.$('body').height());
    });

    //导航active状态
    $('.nav-wrapper .nav').delegate('.not-more a', 'click', function () {
        $('.nav-wrapper .nav .active').removeClass('active');
        $(this).addClass('active');
    });

    //更多功能弹出框
    $('.nav-wrapper .nav .more').hover(function () {
        $(this).children('.more-list').slideDown(100);
    }, function () {
        $(this).children('.more-list').slideUp(100);
    });

    //更多功能选择后给.more添加active
    $('.nav-wrapper .nav').delegate('.more-list a', 'click', function () {
        $('.nav-wrapper .nav .active').removeClass('active');
        $('.nav-wrapper .nav .more>a').addClass('active');
        $('.more-list').slideUp(200);
    });

    //模态框打开，插入dom后绑定日历控件，在子页面调用
    window.bindLaydate = function (id, format = 'YYYY-MM-DD', istime = false) {
        laydate({
            elem: id,
            format: format,
            istime: istime
        });
    }

    //模态框关闭
    $('.close-btn').on('click', function () {
        $('.layer').fadeOut();
    });
});