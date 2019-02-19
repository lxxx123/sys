$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    //有头像就显示删除按钮
    if ($('#preview-photo').attr('src') !== '/static/image/input-image.png') {
        $('.input-photo .del-btn').fadeIn();
    }
    //有头像就显示删除按钮
    if ($('#preview-photo1').attr('src') !== '/static/image/input-image.png') {
        $('.input-photo .del-btn1').fadeIn();
    }

    if ($('#preview-photo2').attr('src') !== '/static/image/input-image.png') {
        $('.input-photo2 .del-btn2').fadeIn();
    }
    if ($('#preview-photo3').attr('src') !== '/static/image/input-image.png') {
        $('.input-photo3 .del-btn3').fadeIn();
    }
    if ($('#preview-photo4').attr('src') !== '/static/image/input-image.png') {
        $('.input-photo4 .del-btn4').fadeIn();
    }
    if ($('#preview-photo5').attr('src') !== '/static/image/input-image.png') {
        $('.input-photo5 .del-btn5').fadeIn();
    }
    if ($('#preview-photo6').attr('src') !== '/static/image/input-image.png') {
        $('.input-photo6 .del-btn6').fadeIn();
    }
    if ($('#preview-photo7').attr('src') !== '/static/image/input-image.png') {
        $('.input-photo7 .del-btn7').fadeIn();
    }
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
            var canvas = $('#clip-image').cropper('getCroppedCanvas');
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#photo').val(base64url);
            //将对应的隐藏删除该头像input的value设置为0
            $('#photo_delete').val('0');
            //设置预览头像路径
            $('#preview-photo').attr('src', base64url);
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
        //将对应的隐藏删除该头像input的value设置为1，表示删除该图片
        $('#photo_delete').val('1');
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

 // ----------------------------
   //打开头像裁剪模态框
    $('.input-photo').on('click', function () {

        $('.modal1').fadeIn();
    });
    //关闭模态框
    $('.modal1 .close-btn').on('click', function () {
        $('.modal1').fadeOut();
    });

    $('#select-photo-btn1').on('click', function () {
        // alert(1);
        //触发input点击事件
        $('#modal_photo1').click();
    });
 
    //监听头像input的change事件
    $('#modal_photo1').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload1 .name1').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image1').hasClass('cropper-hidden')) {
            $('#clip-image1').attr('src', src);
            $('#clip-image1').cropper({
                aspectRatio: 1 / 1,
                preview: '.preview1',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image1').cropper('replace', src, false);
        }
    });
    //保存
    $('#save-btn1').on('click', function () {
        if ($('#clip-image1').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image1').cropper('getCroppedCanvas', {fillColor: '#fff'});
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#zhifubao_img_photo').val(base64url);
            $('#zhifubao_img_delete').val('0');
            //设置预览头像路径
            $('#preview-photo1').attr('src', base64url);
            $('#preview-photo1').fadeIn();
            //显示头像上的删除按钮
            $('.input-photo .del-btn1').fadeIn();
            //关闭模态框
            $('.modal1').fadeOut();
        }
    });
    //头像模块删除图片
    $('.input-photo .del-btn1').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        $('#zhifubao_img_delete').val('1');

        //清空隐藏头像input的值
        $('#zhifubao_img_photo').val('');
        //清空预览头像路径并隐藏
        $('#preview-photo1').fadeOut(function () {
            $('#preview-photo1').attr('src', '');
        });
        //隐藏删除按钮
        $(this).fadeOut();
    });
    // ----------------------------------------
   //打开头像裁剪模态框
    $('.input-photo2').on('click', function () {
        // alert(1);
        $('.modal2').fadeIn();
    });
    //关闭模态框
    $('.modal2 .close-btn').on('click', function () {
        $('.modal2').fadeOut();
    });

    $('#select-photo-btn2').on('click', function () {
        // alert(1);
        //触发input点击事件
        $('#modal_photo2').click();
    });

    //监听头像input的change事件
    $('#modal_photo2').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload2 .name2').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image2').hasClass('cropper-hidden')) {
            $('#clip-image2').attr('src', src);
            $('#clip-image2').cropper({
                aspectRatio: 1 / 1,
                preview: '.preview2',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image2').cropper('replace', src, false);
        }
    });
    //保存
    $('#save-btn2').on('click', function () {
        if ($('#clip-image2').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image2').cropper('getCroppedCanvas', {fillColor: '#fff'});
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#weixin_img_photo').val(base64url);
            $('#weixin_img_delete').val('0');
            //设置预览头像路径
            $('#preview-photo2').attr('src', base64url);
            $('#preview-photo2').fadeIn();
            //显示头像上的删除按钮
            $('.input-photo2 .del-btn2').fadeIn();
            //关闭模态框
            $('.modal2').fadeOut();
        }
    });

    //头像模块删除图片
    $('.input-photo2 .del-btn2').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        $('#weixin_img_delete').val('1');
        //清空隐藏头像input的值
        $('#weixin_img_photo').val('');
        //清空预览头像路径并隐藏
        $('#preview-photo2').fadeOut(function () {
            $('#preview-photo2').attr('src', '');
        });
        //隐藏删除按钮
        $(this).fadeOut();
    });
// -----------------------------------
   //打开头像裁剪模态框
    $('.input-photo3').on('click', function () {
        // alert(1);
        $('.modal3').fadeIn();
    });
    //关闭模态框
    $('.modal3 .close-btn').on('click', function () {
        $('.modal3').fadeOut();
    });

    $('#select-photo-btn3').on('click', function () {
        // alert(1);
        //触发input点击事件
        $('#modal_photo3').click();
    });

    //监听头像input的change事件
    $('#modal_photo3').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload3 .name3').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image3').hasClass('cropper-hidden')) {
            $('#clip-image3').attr('src', src);
            $('#clip-image3').cropper({
                // aspectRatio: 1 / 1,//自由裁剪
                preview: '.preview3',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image3').cropper('replace', src, false);
        }
    });
    //保存
    $('#save-btn3').on('click', function () {
        if ($('#clip-image3').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image3').cropper('getCroppedCanvas', {fillColor: '#fff'});
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#business_img_photo').val(base64url);
            $('#business_img_delete').val('0');
            //设置预览头像路径
            $('#preview-photo3').attr('src', base64url);
            $('#preview-photo3').fadeIn();
            //显示头像上的删除按钮
            $('.input-photo3 .del-btn3').fadeIn();
            //关闭模态框
            $('.modal3').fadeOut();
        }
    });

    //头像模块删除图片
    $('.input-photo3 .del-btn3').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        $('#business_img_delete').val('1');
        //清空隐藏头像input的值
        $('#business_img_photo').val('');
        //清空预览头像路径并隐藏
        $('#preview-photo3').fadeOut(function () {
            $('#preview-photo3').attr('src', '');
        });
        //隐藏删除按钮
        $(this).fadeOut();
    });
// --------------------------------
 //打开头像裁剪模态框
    $('.input-photo4').on('click', function () {
  
        $('.modal4').fadeIn();
    });
    //关闭模态框
    $('.modal4 .close-btn').on('click', function () {
        $('.modal4').fadeOut();
    });

    $('#select-photo-btn4').on('click', function () {
        // alert(1);
        //触发input点击事件
        $('#modal_photo4').click();
    });

    //监听头像input的change事件
    $('#modal_photo4').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload4 .name4').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image4').hasClass('cropper-hidden')) {
            $('#clip-image4').attr('src', src);
            $('#clip-image4').cropper({
                // aspectRatio: 1 / 1,//自由裁剪
                preview: '.preview4',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image4').cropper('replace', src, false);
        }
    });
    //保存
    $('#save-btn4').on('click', function () {
        if ($('#clip-image4').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image4').cropper('getCroppedCanvas', {fillColor: '#fff'});
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#health_img_photo').val(base64url);
            $('#health_img_delete').val('0');
            //设置预览头像路径
            $('#preview-photo4').attr('src', base64url);
            $('#preview-photo4').fadeIn();
            //显示头像上的删除按钮
            $('.input-photo4 .del-btn4').fadeIn();
            //关闭模态框
            $('.modal4').fadeOut();
        }
    });

    //头像模块删除图片
    $('.input-photo4 .del-btn4').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        //将对应的隐藏删除该头像input的value设置为1，表示删除该图片
        $('#health_img_delete').val('1');
        //清空隐藏头像input的值
        $('#health_img_photo').val('');
        //清空预览头像路径并隐藏
        $('#preview-photo4').fadeOut(function () {
            $('#preview-photo4').attr('src', '');
        });
        //隐藏删除按钮
        $(this).fadeOut();
    });
// --------------------------------
 //打开头像裁剪模态框
    $('.input-photo5').on('click', function () {
        // alert(1);
        $('.modal5').fadeIn();
    });
    //关闭模态框
    $('.modal5 .close-btn').on('click', function () {
        $('.modal5').fadeOut();
    });

    $('#select-photo-btn5').on('click', function () {
        // alert(1);
        //触发input点击事件
        $('#modal_photo5').click();
    });

    //监听头像input的change事件
    $('#modal_photo5').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload5 .name5').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image5').hasClass('cropper-hidden')) {
            $('#clip-image5').attr('src', src);
            $('#clip-image5').cropper({
                // aspectRatio: 1 / 1,//自由裁剪
                preview: '.preview5',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image5').cropper('replace', src, false);
        }
    });
    //保存
    $('#save-btn5').on('click', function () {
        if ($('#clip-image5').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image5').cropper('getCroppedCanvas', {fillColor: '#fff'});
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#id_number_img_photo').val(base64url);
            $('#id_number_img_delete').val('0');
            //设置预览头像路径
            $('#preview-photo5').attr('src', base64url);
            $('#preview-photo5').fadeIn();
            //显示头像上的删除按钮
            $('.input-photo5 .del-btn5').fadeIn();
            //关闭模态框
            $('.modal5').fadeOut();
        }
    });

    //头像模块删除图片
    $('.input-photo5 .del-btn5').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        //将对应的隐藏删除该头像input的value设置为1，表示删除该图片
        $('#id_number_img_delete').val('1');
        //清空隐藏头像input的值
        $('#id_number_img_photo').val('');
        //清空预览头像路径并隐藏
        $('#preview-photo5').fadeOut(function () {
            $('#preview-photo5').attr('src', '');
        });
        //隐藏删除按钮
        $(this).fadeOut();
    });

// --------------------------------
 //打开头像裁剪模态框
    $('.input-photo6').on('click', function () {
        // alert(1);
        $('.modal6').fadeIn();
    });
    //关闭模态框
    $('.modal6 .close-btn').on('click', function () {
        $('.modal6').fadeOut();
    });

    $('#select-photo-btn6').on('click', function () {
        // alert(1);
        //触发input点击事件
        $('#modal_photo6').click();
    });

    //监听头像input的change事件
    $('#modal_photo6').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload6 .name6').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image6').hasClass('cropper-hidden')) {
            $('#clip-image6').attr('src', src);
            $('#clip-image6').cropper({
                // aspectRatio: 1 / 1,//自由裁剪
                preview: '.preview6',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image6').cropper('replace', src, false);
        }
    });
    //保存
    $('#save-btn6').on('click', function () {
        if ($('#clip-image6').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image6').cropper('getCroppedCanvas', {fillColor: '#fff'});
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#other_img_photo').val(base64url);
            $('#other_img_delete').val('0');
            //设置预览头像路径
            $('#preview-photo6').attr('src', base64url);
            $('#preview-photo6').fadeIn();
            //显示头像上的删除按钮
            $('.input-photo6 .del-btn6').fadeIn();
            //关闭模态框
            $('.modal6').fadeOut();
        }
    });

    //头像模块删除图片
    $('.input-photo6 .del-btn6').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        //将对应的隐藏删除该头像input的value设置为1，表示删除该图片
        $('#other_img_delete').val('1');
        //清空隐藏头像input的值
        $('#other_img_photo').val('');
        //清空预览头像路径并隐藏
        $('#preview-photo6').fadeOut(function () {
            $('#preview-photo6').attr('src', '');
        });
        //隐藏删除按钮
        $(this).fadeOut();
    });
    // ----------------------------------------
   //打开头像裁剪模态框
    $('.input-photo7').on('click', function () {
        // alert(1);
        $('.modal7').fadeIn();
    });
    //关闭模态框
    $('.modal7 .close-btn').on('click', function () {
        $('.modal7').fadeOut();
    });

    $('#select-photo-btn7').on('click', function () {
        // alert(1);
        //触发input点击事件
        $('#modal_photo7').click();
    });

    //监听头像input的change事件
    $('#modal_photo7').on('change', function () {
        var name = $(this)[0].files[0].name;
        $('.upload7 .name7').text(name);
        var src = URL.createObjectURL($(this)[0].files[0]);
        if (!$('#clip-image7').hasClass('cropper-hidden')) {
            $('#clip-image7').attr('src', src);
            $('#clip-image7').cropper({
                // aspectRatio: 1 / 1,
                preview: '.preview7',
                crop: function (data) {
                    // Output the result data for cropping image.
                }
            });
        } else {
            $('#clip-image7').cropper('replace', src, false);
        }
    });
    //保存
    $('#save-btn7').on('click', function () {
        if ($('#clip-image7').attr('src') === '') {
            return;
        } else {
            var canvas = $('#clip-image7').cropper('getCroppedCanvas', {fillColor: '#fff'});
            var base64url = canvas.toDataURL('image/png');
            //设置隐藏头像input的value
            $('#zjnx_img_photo').val(base64url);
            $('#zjnx_img_delete').val('0');
            //设置预览头像路径
            $('#preview-photo7').attr('src', base64url);
            $('#preview-photo7').fadeIn();
            //显示头像上的删除按钮
            $('.input-photo7 .del-btn7').fadeIn();
            //关闭模态框
            $('.modal7').fadeOut();
        }
    });

    //头像模块删除图片
    $('.input-photo7 .del-btn7').on('click', function (ev) {
        //阻止冒泡
        ev.stopPropagation();
        //将对应的隐藏删除该头像input的value设置为1，表示删除该图片
        $('#zjnx_img_delete').val('1');
        //清空隐藏头像input的值
        $('#zjnx_img_photo').val('');
        //清空预览头像路径并隐藏
        $('#preview-photo7').fadeOut(function () {
            $('#preview-photo7').attr('src', '');
        });
        //隐藏删除按钮
        $(this).fadeOut();
    });



});