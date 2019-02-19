$(function () {
    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    //绑定日历
    laydate({
        elem: '#test_date'
    });

    $(".merchant_name").blur(function(){
        var merchant=$(this).val();

        $.post('/market/projec_testac/merchant',{name:merchant},function(data){
            if(data==1){
                // alert(123);
                $('.merchant_name').val('');
                $('.merchant_name').attr('placeholder','该商户不存在');
            }else{
                $('.merchant_id').val(data); 
            }
        });

    });

});