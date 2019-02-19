$(function(){
	
	//页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/merchant_goodsac/index/parent_id/8?page=' + txt;
        } else {
            window.location.href = '/market/merchant_goodsac/index/parent_id/8';
        }
    });

	//查找
	$("#query_btn").click(function(){
		var txt = $("#stall_number").val();
		if(txt != ''){
			window.location.href = 'market/merchant_goodsac/index/parent_id/8'+"?key="+txt;
		}else{
			window.location.href = 'market/merchant_goodsac/index/parent_id/8';
		}
    });

    $('.list').on('click',".adopt",function(){

        id=$(this).attr('data_id');

        merchant_name=$(this).attr('data_merchant_name');

        stall_number=$(this).attr('data_stall_number');

        $.post('/market/merchant_goodsac/merchant',{id:id},function(data){

            if(data==0){
                layer.msg('该商户没有菜价，请先添加！', {
                    icon: 2,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                });
            }else{

                window.location.href = '/market/merchant_goodsac/export?id='+id+"&merchant_name="+merchant_name+"&stall_number="+stall_number;


            }

        }); 
    });


    $('.price_del').on('click',function(){

        id=$(this).attr('data_del_id');

        layer.msg('请稍等，正在清空！', {
                    icon: 2,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                });


        $.post('/market/merchant_goodsac/price_del',{id:id},function(data){
   
            if(data==0){
                layer.msg('该商户没有菜价，请先添加！', {
                    icon: 2,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                });
            }else{

                layer.msg('清空完成！！！', {
                    icon: 2,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                });                


            }

        }); 
    });
});