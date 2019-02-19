$(function () {
    $('#excel_file').on('change', function () {
        $(this).siblings('.right').text($(this)[0].files[0].name);
    });

    //返回按钮
    $('.back-btn').on('click', function () {
        history.back();
    });

    //ajax提交
    $('#form').submit(function (ev) {
        ev.preventDefault();

        $.ajax({
            url: "/market/news_goods_inac/import_post",
            type: 'POST',
            cache: false,
            data: new FormData($('#form')[0]),
            processData: false, 
            contentType: false,
            dataType: "json",
            beforeSend: function () {
                uploading = true;
            },
            success: function (data) {
                data = JSON.parse(data);
                // console.log(123);
                if (data.status) {
                    location.href = '/market/news_goods_inac/index?parent_id=4';
                } else {
                    $('.toast .text').text(data.msg);
                    $('.toast').fadeIn(function () {
                        setTimeout(function () {
                            $('.toast').fadeOut();
                        }, 2000);
                    });
                }
            }
            // error:function (data){
            //     data = JSON.parse(data);
            //      // console.log(123);

            // }
        });
    });
});