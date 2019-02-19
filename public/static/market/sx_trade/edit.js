$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });
    //绑定日历
    laydate({
        elem: '#purchase_time'
    });
    
    $("#merchant_id").change(function(){
        $("#supplier_id").empty();
    	var id=$("#merchant_id").val();
		$.post('/market/sx_goods_inac/supplier_list',{id:id},function(data){         
			if(data.status==1){
            var  list=data.list
			var count = list.length;  
            for ( var i = 0; i < count; i++) {  
                $("#supplier_id").append("<option value='" + list[i]['id'] + "'>" +list[i]['user_name'] + "</option>"); 
              } 

			}
		});
    });

    //未选择商户阻止提交
    $('.submit').on('click', function () {

        if($("#merchant_id").val()==0){
            return false
        } 
  });
   
});