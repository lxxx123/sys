$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    var searchTimer;

    function cbSearch() {
        searchTimer = setTimeout(function () {
            $.get('/market/guide_priceac/search?value=' + $('input[name="goods_name"]').val().trim(), function (data) {
                data = JSON.parse(data);
                var html = template('template', data);
                document.getElementById('search').innerHTML = html;
                //有匹配项才显示,没有匹配项就隐藏
                if (data.status) {
                    $('#search').show();
                    $('#search').scrollTop(0);
                } else {
                    document.getElementById('search').innerHTML = '';
                    $('#search').hide();
                }

                //hover事件
                $('#search li').hover(function () {
                    $(this).addClass('active');
                }, function () {
                    $(this).removeClass('active');
                });
                //点击事件
                $('#search li').on('click', function () {
                    //input失去焦点的同时如果是在选择菜名的话不能立刻隐藏选择框
                    realBlur = false;
                    $('input[name="goods_name"]').val($(this).text());
                    document.getElementById('search').innerHTML = '';
                    $('#search').hide();
                    realBlur = true;
                });
            });
        }, 500);
    }

    //自动匹配商品
    $('input[name="goods_name"]').on('keyup', function () {
        if ($(this).val().trim() == '') {
            document.getElementById('search').innerHTML = '';
            $('#search').hide();
            return;
        }
        clearTimeout(searchTimer);
        cbSearch();
    });

    //flag,判断选择框是否需要隐藏
    var realBlur = true;
    $('input[name="goods_name"]').on('blur', function () {
        setTimeout(function () {
            if (realBlur) {
                document.getElementById('search').innerHTML = '';
                $('#search').hide();
            }
        }, 100);
    });

    //打开头像裁剪模态框
    $('.input-photo').on('click', function () {
        $('.modal').fadeIn();
    });
    //关闭模态框
    $('.modal .close-btn').on('click', function () {
        $('.modal').fadeOut();
    });

    $('#select-photo-btn').on('click', function () {
        //触发input点击事件
        $('#modal-photo').click();
    });

    //监听头像input的change事件
    $('#modal-photo').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload .name').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image').hasClass('cropper-hidden')) {
            $('#clip-image').attr('src', src);
            $('#clip-image').cropper({
                aspectRatio: 1 / 1,
                preview: '.preview',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image').cropper('replace', src, false);
        }
    });

    //向左旋转
    $('#rotate-left-btn').on('click', function () {
        if ($('#clip-image').attr('src') === '') {
            return;
        } else {
            $('#clip-image').cropper('rotate', -90);
        }
    });
    //向右旋转
    $('#rotate-right-btn').on('click', function () {
        if ($('#clip-image').attr('src') === '') {
            return;
        } else {
            $('#clip-image').cropper('rotate', 90);
        }
    });
    //放大
    $('#zoom-big-btn').on('click', function () {
        if ($('#clip-image').attr('src') === '') {
            return;
        } else {
            $('#clip-image').cropper('zoom', 0.1);
        }
    });
    //缩小
    $('#zoom-small-btn').on('click', function () {
        if ($('#clip-image').attr('src') === '') {
            return;
        } else {
            $('#clip-image').cropper('rotate', -0.1);
        }
    });
    //刷新
    $('#reset-btn').on('click', function () {
        if ($('#clip-image').attr('src') === '') {
            return;
        } else {
            $('#clip-image').cropper('reset');
        }
    });
    //保存
    $('#save-btn').on('click', function () {
        if ($('#clip-image').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image').cropper('getCroppedCanvas', {fillColor: '#fff'});
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#photo').val(base64url);
            //设置预览头像路径
            $('#preview-photo').attr('src', base64url);
            $('#preview-photo').fadeIn();
            //显示头像上的删除按钮
            $('.input-photo .del-btn').fadeIn();
            //关闭模态框
            $('.modal').fadeOut();
        }
    });

    //头像模块删除图片
    $('.input-photo .del-btn').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        //清空隐藏头像input的值
        $('#photo').val('');
        //清空预览头像路径并隐藏
        $('#preview-photo').fadeOut(function () {
            $('#preview-photo').attr('src', '');
        });
        //隐藏删除按钮
        $(this).fadeOut();
    });


    //模拟事件
    $('.image-row .column .image').on('click', function () {
        $(this).parent('.column').children('.img-upload').click();
    });

    //证件照选择过图片后改变背景图（删除图片会用删除input dom节点再创建相同节点的方法达到清空input file的效果，所以这里用事件代理）
    $('.image-row').delegate('.img-upload', 'change', function () {
        var src = URL.createObjectURL($(this)[0].files[0]);
        //设置预览图片路径
        $(this).siblings('.image').children('img').attr('src', src);
        //显示删除按钮
        $(this).siblings('.image').children('.del-btn').fadeIn();
    });

    //证件模块删除图片
    $('.image-row .column .image .del-btn').on('click', function (ev) {
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