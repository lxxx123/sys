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
            url: "/market/guide_priceac/import_post",
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

                if (data.status==1) {
                    location.href = '/market/guide_priceac/index?parent_id=8';
                } else {
                    $('.toast .text').text(data.msg);
                    $('.toast').fadeIn(function () {
                        setTimeout(function () {
                            $('.toast').fadeOut();
                        }, 2000);
                    });
                }
            }

        });
    });
});