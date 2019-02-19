$(function () {

    laydate({
        elem: '#start'
    });
    laydate({
        elem: '#end'
    });
    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });



    $("#stall_id").change(function(){

        var id=$(this).val();
        $.post('/market/rent_manageac/merchant_name',{id:id},function(data){
            var data=JSON.parse(data);
            // console.log(data);
            $(".merchant_name").html(data['merchant_name']);
        });
    });
});