$(function () {
    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    //绑定日历
    laydate({
        elem: '#test_date'
    });

    $("#comp_id").blur(function(){

        var stall=$(this).val();

        $.post('/market/projec_test_sdjac/stall',{stall:stall},function(data){

            if(data==1){
      
                $('#comp_id').val('');

                $('#comp_id').attr('placeholder','该摊位不存在');
            }
        });

    });

});