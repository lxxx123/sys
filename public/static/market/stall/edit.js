$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    // 判断输入的摊位是否存在
    $('.stall_number').on('blur',function(){

        stall_number=$(this).val();

        $.post('/market/stallac/stall_number_judge',{stall_number:stall_number},function(data){
        
            if(data.status==0){
                 $(".stall_number").val('');
                 $(".stall_number").attr('placeholder','摊位已存在');
                 
            }
        });
    });

});