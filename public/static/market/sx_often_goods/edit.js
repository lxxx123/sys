$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

       //选择主分类显示商品
       $("#cate_name").change(function(){
        var first_cate_id = $("#cate_name").val();
        $.ajax({
          type: 'POST',
          url: '/market/sx_often_goodsac/show_goods',
          data: {first_cate_id: first_cate_id},
          dataType: 'json',
          success: function(data){
            if( data == 1){
                alert('网络异常,请刷新页面重试~');
                window.location.go(-1);
                return false;
            }
            
            var str = '<span class="text">商品名称：</span><select class="form-control"  name="goods_no" id="goods_name">';
            var bottom = '</select>';
                for(var i=0; i<data.length; i++){
                    str += '<option value="'+data[i]['goods_no']+'">'+data[i]['goods_name']+'</option>';
                }
                $("#goods_div").html(str+bottom);
          },
          error: function(){
            alert('请刷新页面~');
            window.location.go(-1);
          }
        });
        
    });

});