$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
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
            $('#clip-image').cropper('zoom', -0.1);
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
            var canvas = $('#clip-image').cropper('getCroppedCanvas');
            var base64url = canvas.toDataURL('image/png');
            // str=str.substring(22);
            img_len = base64url.length;
            size_c = (img_len - (img_len / 8) * 2) / 1024;
            size1 = size_c.toFixed(2);

            if (size1< 1024) {
                $('.pic_size').fadeOut();
                // console.log(size);
                //设置隐藏头像input的value
                $('#photo').val(base64url);
                //设置预览头像路径
                $('#preview-photo').attr('src', base64url);
                //显示头像上的删除按钮
                $('.input-photo .del-btn').fadeIn();
                //关闭模态框
                $('.modal').fadeOut();
 

            } else {
                layer.msg('图片太大,请先处理图片大小再上传！', {
                    icon: 2,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //do something
                });
            }
        }
    });

    $('.del_pic').on('click', function () {
        $('.pic_size').fadeOut();
    });
    //头像模块删除图片
    $('.input-photo .del-btn').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        //清空隐藏头像input的值
        $('#photo').val('');
        //清空预览头像路径 
        $('#preview-photo').attr('src', '/static/image/input-image.png');
        //隐藏删除按钮
        $(this).fadeOut();
    });

    //绑定日历
    laydate({
        elem: '#check_in_date'
    });
    // -------------------------------身份证
    //打开头像裁剪模态框
    $('.image_id_number').on('click', function () {

        $('.modal_id_number').fadeIn();
    });
    //关闭模态框
    $('.modal_id_number .close-btn').on('click', function () {
        $('.modal_id_number').fadeOut();
    });

    $('#select-photo-btn-id-number').on('click', function () {
        //触发input点击事件
        $('#modal-photo-id-number').click();
    });

    //监听头像input的change事件
    $('#modal-photo-id-number').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload_id_number .name').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image-id-number').hasClass('cropper-hidden')) {
            $('#clip-image-id-number').attr('src', src);
            $('#clip-image-id-number').cropper({
                // aspectRatio: 1 / 1,
                preview: '.preview_id_number',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image-id-number').cropper('replace', src, false);
        }
    });

    //向左旋转
    $('#rotate-left-btn1').on('click', function () {
        if ($('#clip-image-id-number').attr('src') === '') {
            return;
        } else {
  
            $('#clip-image-id-number').cropper('rotate', -90);
        }
    });
    //向右旋转
    $('#rotate-right-btns').on('click', function () {
        if ($('#clip-image-id-number').attr('src') === '') {
            return;
        } else {
          
            $('#clip-image-id-number').cropper('rotate', 90);
        }
    });
    //放大
    $('#zoom-big-btn1').on('click', function () {
        if ($('#clip-image-id-number').attr('src') === '') {
            return;
        } else {
            $('#clip-image-id-number').cropper('zoom', 0.1);
        }
    });
    //缩小
    $('#zoom-small-btn1').on('click', function () {
        if ($('#clip-image-id-number').attr('src') === '') {
            return;
        } else {
            $('#clip-image-id-number').cropper('zoom', -0.1);
        }
    });
    //刷新
    $('#reset-btn1').on('click', function () {
        if ($('#clip-image-id-number').attr('src') === '') {
            return;
        } else {
            $('#clip-image-id-number').cropper('reset');
        }
    });
    //保存
    $('#save-btn-id-number').on('click', function () {
        if ($('#clip-image-id-number').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image-id-number').cropper('getCroppedCanvas');
            var base64urls = canvas.toDataURL('image/png');
            img_lens = base64urls.length;
            size_b = (img_lens - (img_lens / 8) * 2) / 1024;
            size2 = size_b.toFixed(2);
            if (size2 < 1024) {

                //设置隐藏头像input的value
                $('#id_number_photo').val(base64urls);
                //设置预览头像路径
                $('#preview-id-number-photo').attr('src', base64urls);
                //显示头像上的删除按钮
                $('.image_id_number .del-btn').fadeIn();
                //关闭模态框
                $('.modal_id_number').fadeOut();
            } else {
                layer.msg('图片太大,请先处理图片大小再上传！', {
                    icon: 2,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //do something
                });
            }

        }
    });

    //头像模块删除图片
    $('.image_id_number .del-btn').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        //清空隐藏头像input的值
        $('#id_number_photo').val('');
        //清空预览头像路径
        $('#preview-id-number-photo').attr('src', '/static/image/input-image.png');
        //隐藏删除按钮
        $(this).fadeOut();
    });
// -------------------------其他照片
    //打开头像裁剪模态框
    $('.imgage_other_timg').on('click', function () {
        $('.modal_other_img').fadeIn();
    });
    //关闭模态框
    $('.modal_other_img .close-btn').on('click', function () {
        $('.modal_other_img').fadeOut();
    });

    $('#select-other-btn').on('click', function () {
        //触发input点击事件
        $('#modal-other-photo').click();
    });

    //监听头像input的change事件
    $('#modal-other-photo').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload .name').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image-other').hasClass('cropper-hidden')) {
            $('#clip-image-other').attr('src', src);
            $('#clip-image-other').cropper({
                // aspectRatio: 1 / 1,
                preview: '.preview-other',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image-other').cropper('replace', src, false);
        }
    });

    //向左旋转
    $('#rotate-left-btn3').on('click', function () {
        if ($('#clip-image-other').attr('src') === '') {
            return;
        } else {
            $('#clip-image-other').cropper('rotate', -90);
        }
    });
    //向右旋转
    $('#rotate-right-btn3').on('click', function () {
        if ($('#clip-image-other').attr('src') === '') {
            return;
        } else {
            $('#clip-image-other').cropper('rotate', 90);
        }
    });
    //放大
    $('#zoom-big-btn3').on('click', function () {
        if ($('#clip-image-other').attr('src') === '') {
            return;
        } else {
            $('#clip-image-other').cropper('zoom', 0.1);
        }
    });
    //缩小
    $('#zoom-small-btn3').on('click', function () {
        if ($('#clip-image-other').attr('src') === '') {
            return;
        } else {
            $('#clip-image-other').cropper('zoom', -0.1);
        }
    });
    //刷新
    $('#reset-btn3').on('click', function () {
        if ($('#clip-image-other').attr('src') === '') {
            return;
        } else {
            $('#clip-image-other').cropper('reset');
        }
    });
    //保存
    $('#save-btn-other').on('click', function () {
        if ($('#clip-image-other').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image-other').cropper('getCroppedCanvas');
            var base64url = canvas.toDataURL('image/png');
            img_lena = base64url.length;
            size_a = (img_lena - (img_lena / 8) * 2) / 1024;
            size3 = size_a.toFixed(2);
            if (size3 < 1024) {
            //设置隐藏头像input的value
            $('#other_img_photo').val(base64url);
            //设置预览头像路径
            $('#other-photo').attr('src', base64url);
            //显示头像上的删除按钮
            $('.imgage_other_timg .del-btn').fadeIn();
            //关闭模态框
            $('.modal_other_img').fadeOut();
            } else {
                layer.msg('图片太大,请先处理图片大小再上传！', {
                    icon: 2,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //do something
                });
            }
        }

    });

    //头像模块删除图片
    $('.imgage_other_timg .del-btn').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        //清空隐藏头像input的值
        $('#other_img_photo').val('');
        //清空预览头像路径 
        $('#other-photo').attr('src', '/static/image/input-image.png');
        //隐藏删除按钮
        $(this).fadeOut();
    });
});