$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    //选择主分类显示商品
       $("#cate_name").change(function(){
        var first_cate_id = $("#cate_name").val();
        // alert(first_cate_id);
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
            
            var str = '';
                for(var i=0; i<data.length; i++){
                    str += '<div style="height:30px"><input type="checkbox" class="goods_check"  value='+data[i]['id']+'>'+data[i]['goods_name']+'</div>';
                }
                $("#goods_div").html(str);
          },
          error: function(){
            alert('请刷新页面~');
            window.location.go(-1);
          }
        });
        
    });

    //全选
    $(".check-all-mer").click(function(){
        if(this.checked){
            $(".mer_check:checkbox").prop("checked",true);
        }else{
            $(".mer_check:checkbox").prop("checked",false);
        }
    })

    $(".check-all-goods").click(function(){
        if(this.checked){
            $(".goods_check:checkbox").prop("checked",true);
        }else{
            $(".goods_check:checkbox").prop("checked",false);
        }
    })

    //添加数据
    $("#submit_btn").click(function(){
        var first_cate_id = $("#cate_name").val();
        var mer_arr = [];
        $('.mer_check:checked').each(function(){
            mer_arr.push($(this).val());
        });
        var mer_id = mer_arr.join(",");

        var goods_arr = [];
        $('.goods_check:checked').each(function(){
            goods_arr.push($(this).val());
        });
        var goods_id = goods_arr.join(",");

        // 表单校验
        if (mer_id == '') {
            alert('请选择要添加的商户');
            return false;
        }

        if (goods_id == '') {
            alert('请选择要添加的商品');
            return false;
        }

        if (first_cate_id == '') {
            alert('请选择商品主类型');
            return false;
        }

        $.ajax({
          type: 'POST',
          url: '/market/sx_often_goodsac/add_post',
          data: {first_cate_id: first_cate_id, mer_id: mer_id, goods_id: goods_id},
          //dataType: 'json',
          success: function(data){
            if( data == 'success'){
                alert('添加成功');
                window.location.go(-1);
                return true;
            } else {
                alert(data);
                window.location.go(-1);
                return false;
            }

          },
          error: function(){
            alert('添加成功');
            window.location.go(-1);
          }
        });
        
    })
   
});