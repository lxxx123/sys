$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    //绑定日历
    laydate({
        elem: '#check_in_date'
    });




     $(".stall_id").blur(function(){
     	
        var stall_number=$(this).val();
        $.post('/market/sx_check_alreadyac/infos',{stall_number:stall_number},function(data){
            var data=JSON.parse(data);
            if(data.status==0){
            	$(".merchant_names").html('');
	            $(".merchant_id").val(data.list['id']);
	            $(".merchant_names").html(data.list['merchant_name']);
	            $(".merchant_name").val(data.list['merchant_name']);
            }else{
            	 $(".stall_id").val('');
            	 $(".merchant_names").html('');
            	 $(".stall_id").attr('placeholder','没有该摊位！！！');

            }
        });
    });
  

});