$(function () {

    laydate({
        elem: '#date'
    });
 
    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });


   $("#id").change(function(){

        var id=$(this).val();
        $.post('/market/destroy_logac/pro_test',{id:id},function(data){
            var data=JSON.parse(data);
            // console.log(data);
            $(".stall_number").html(data['stall_number']);
            $(".prod_type").html(data['prod_type']);
            $(".prod_name").html(data['prod_name']);
            $(".test_date").html(data['test_date']);
            $(".test_count").html(data['test_count']);
            $(".result").html(data['result']);
            $(".item_name").html(data['item_name']);
        });
    });
});