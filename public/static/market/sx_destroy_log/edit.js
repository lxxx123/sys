$(function () {

    laydate({
        elem: '#date'
    });
 
    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });


    $("#ids").change(function(){

        // alert(123);
        var id=$(this).val();
        $.post('/market/sx_destroy_logac/pro_test',{id:id},function(data){
            var data=JSON.parse(data);
            
            $("#merchant_name").val(data['merchant_name']);
            $("#stall_number").val(data['stall_number']);
            $(".stall_number").html(data['stall_number']);
            $(".goods_name").html(data['goods_name']);
            $(".check_proj").html(data['check_proj']);
            $(".check_date").html(data['check_date']);
            $(".test_count").html(data['test_count']);
            $(".check_name").html(data['check_name']);
            $(".batch").html(data['batch']);
            $(".standard").html(data['standard']);
            $(".check_result").html(data['check_result']);


        });
    });

});