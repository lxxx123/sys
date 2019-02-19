$(function () {

    laydate({
        elem: '#date'
    });
 
    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });


    //计算水费
    $("#water_amount").blur(function(){

        if($(this).val() != '' && !isNaN($(this).val())){

            var amount = parseFloat($(this).val());
            // console.log(amount);
            amount = amount.toFixed(2);
            //$(this).val(amount);

            var single_price = parseFloat($("#water_single_price").val());
            // console.log(single_price);

            var total_price = amount * single_price;

            if(total_price){
                $("#water_price").val(total_price.toFixed(2));
            }else{
                $("#water_price").val('');
            }


        }

    });

    //计算水费
    $("#water_single_price").blur(function(){

        if($(this).val() != '' && !isNaN($(this).val())){

            var amount = parseFloat($("#water_amount").val());

            amount = amount.toFixed(2);
            // if(amount){
            //     $("#water_amount").val(amount);
            // }else{
            //     $("#water_amount").val('');
            // }


            var single_price = parseFloat($(this).val());


            var total_price = amount * single_price;

            if(total_price){
                $("#water_price").val(total_price.toFixed(2));
            }else{
                $("#water_price").val('');
            }

        }

    });


    $("#stall_id").change(function(){

        var id=$(this).val();
        $.post('/market/waterac/merchant_name',{id:id},function(data){
            var data=JSON.parse(data);
            // console.log(data);
            $(".merchant_name").html(data['merchant_name']);
        });
    });
});