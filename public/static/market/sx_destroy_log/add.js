$(function () {
    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });
 
    laydate({
        elem: '#date'
    });




    $("#ids").change(function(){

        // alert(123);
        var id=$(this).val();
        $.post('/market/sx_destroy_logac/pro_test',{id:id},function(data){
            var data=JSON.parse(data);
            // console.log(data);
            $("#merchant_name").val(data['merchant_name']);
            $("#batch").val(data['batch']);
            $("#stall_number").val(data['stall_number']);
            $("#merchant_id").val(data['merchant_id']);
            $("#goods_name").val(data['goods_name']);
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