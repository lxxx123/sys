$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    //模拟事件
    $('.video-row .column .image').on('click', function () {
        $(this).parent('.column').children('.img-upload').click();
    });

    //视频选择后改变背景图（删除图片会用删除input dom节点再创建相同节点的方法达到清空input file的效果，所以这里用事件代理）
    $('.video-row').delegate('.img-upload', 'change', function () {
        var src = URL.createObjectURL($(this)[0].files[0]);
        $(this).siblings('.video').attr('src',src);
        //在外部接受$(this)
        var that = $(this);
        //监听视频canplay事件
        $(this).siblings('.video').on('canplay',function () {
            //获取video标签信息
            var video = $(this)[0];
            var imgWidth = video.videoWidth;
            var imgHeight = video.videoHeight;
            //创建画布
            var canvas = document.createElement('canvas');
            //设置画布的宽高和当前video标签一样，保证截到全图
            canvas.width=video.videoWidth;
            canvas.height=video.videoHeight;
            //转化base64
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video,0,0,imgWidth,imgHeight);
            var imgSrc = canvas.toDataURL('image/png');
            //设置预览图片路径，即视频缩略图
            that.siblings('.image').children('img').attr('src',imgSrc);
            that.siblings('.video').off('canplay');
        });

        //显示删除按钮
        $(this).siblings('.image').children('.del-btn').fadeIn();
    });

    //视频模块删除
    $('.video-row .column .image .del-btn').on('click', function (ev) {
        //阻止冒泡;
        ev.stopPropagation();
        //清空对应的input值
        var file = $(this).parent('.image').siblings('.img-upload')[0];
        if (file.outerHTML) {
            file.outerHTML = file.outerHTML;
        } else {
            file.value = '';
        }
        //设置预览图为默认图
        $(this).siblings('img').attr('src', '/static/image/input-image.png');
        //隐藏删除按钮
        $(this).fadeOut();
    });

});