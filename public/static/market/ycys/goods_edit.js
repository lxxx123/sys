$(function () {
    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    //添加商品
    $('#btn_add').on('click',function (ev) {
        ev.preventDefault();
        if(!$('#goods_name').val() || !$('#price').val()){
            return;
        }
        var data = {
            merchant_id:$('#merchant_id').val(),
            goods_name:$.trim($('#goods_name').val()),
            price:$.trim($('#price').val()),
            goods_code:$.trim($('#goods_code').val()),
            unit_id:$('#unit_id').val()
        }
        $.post('/market/ycysac/goodsadd_post',data,function (data) {
            data = JSON.parse(data);
            if(data.status){
                location.reload();
            }
        });
    });

    //修改商品
    $('.operate').delegate('.btn_edit','click',function (ev) {
       ev.preventDefault();
       var data = {
           id:$(this).parents('.edit').find('.id').val(),
           goods_name:$.trim($(this).parents('.edit').find('.goods_name').val()),
           price:$.trim($(this).parents('.edit').find('.price').val()),
           goods_code:$.trim($(this).parents('.edit').find('.goods_code').val()),
           unit_id:$(this).parents('.edit').find('.unit_id').val()
       }
        $.post('/market/ycysac/goodsedit_post',data,function (data) {
            data = JSON.parse(data);
            if(data.status){
                location.reload();
            }
        });
    });

    //删除商品
    $('.operate').delegate('.btn_del','click',function (ev) {
        ev.preventDefault();
        var that = $(this);
        //打开删除确认框
        window.parent.$('.confirm').fadeIn(function () {
            //点击确认事件
            window.parent.$('#del-confirm').on('click', function () {
                var data = {
                    id:that.parents('.edit').find('.id').val()
                }
                $.post('/market/ycysac/goodsdel',data,function (data) {
                    data = JSON.parse(data);
                    if(data.status){
                        location.reload();
                    }
                });

                //关闭确认框
                window.parent.$('.confirm').fadeOut(function () {
                    //解绑确认取消点击事件，避免重复添加
                    window.parent.$('#del-confirm').off('click');
                    window.parent.$('#del-cancel').off('click');
                });

            });
            //点击取消事件
            window.parent.$('#del-cancel').on('click', function () {
                //关闭确认框
                window.parent.$('.confirm').fadeOut(function () {
                    //解绑确认取消点击事件，避免重复添加
                    window.parent.$('#del-confirm').off('click');
                    window.parent.$('#del-cancel').off('click');
                });
            });
        });
    });
});