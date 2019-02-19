$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
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
    $(".stall_id").on('blur',function(){
        var stall_number=$(this).val();
        $.post('/market/complaintsac/check_stall',{stall_number:stall_number},function(data){
             var data=JSON.parse(data);
            // console.log(data);
            if(data.status==0){

        
                $(".stall_ids").val();
                $(".stall_id").val();
                $(".merchant_id").val();

                 $(".stall_id").attr('placeholder','摊位不存在');
                 
            }else{
                list=data.list;
                $(".stall_ids").val();
                $(".merchant_id").val();

                $(".merchant_name").html(list.merchant_name);
                $(".stall_ids").val(list.stall_id);
                $(".merchant_id").val(list.id);
            }
        });
    });

});