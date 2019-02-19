$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    // 判断输入的摊位是否存在
    $('.stall_number').on('blur',function(){
        stall_number=$(this).val();

        $.post('/market/stall_sxac/stall_number_judge',{stall_number:stall_number},function(data){
        
            if(data.status==0){
                 $(".stall_number").val('');
                 $(".stall_number").attr('placeholder','摊位已存在');
                 
            }
        });
    });

    // 判断类别是否为空
    $('#submit').on('click',function(e){
        type=$("#type_id").val();
        stall_floor=$("#stall_floor").val();
        if(type==0 || stall_floor==null){
            e.preventDefault();
             return false;
        }
    });
});