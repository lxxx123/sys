$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    // 判断输入的摊位是否存在
    $('.stall_number').on('blur',function(){
        stall_number=$('.stall_number').val();

        $.post('/market/sx_stallac/stall_number_judge',{stall_number:stall_number},function(data){
        
                // alert(data.status);
            if(data.status==0){
                 $(".stall_number").val('');

                    layer.msg('摊位号已存在！请核实', {
                        icon: 2,
                        time: 3000 //2秒关闭（如果不配置，默认是3秒）
                    });
                  return false; 
                 
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