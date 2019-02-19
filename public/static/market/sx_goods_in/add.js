$(function () {

        //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });

    //模拟事件
    $('.image-row .column .image').on('click', function () {
        $(this).parent('.column').children('.img-upload').click();
    });

    //证件照选择过图片后改变背景图（删除图片会用删除input dom节点再创建相同节点的方法达到清空input file的效果，所以这里用事件代理）
    $('.image-row').delegate('.img-upload', 'change', function () {
        var src = URL.createObjectURL($(this)[0].files[0]);
        //设置预览图片路径
        $(this).siblings('.image').children('img').attr('src', src);
        //显示删除按钮
        $(this).siblings('.image').children('.del-btn').fadeIn();
    });

    //证件模块删除图片
    $('.image-row .column .image .del-btn').on('click', function (ev) {
        //阻止冒泡;
        ev.stopPropagation();
        //清空对应的input值
        var file = $(this).parent('.image').siblings('.img-upload')[0];
        if (file.outerHTML) {
            file.outerHTML = file.outerHTML;
        } else {
            file.value = '';
        }
        //设置预览图为默认图
        $(this).siblings('img').attr('src', '/static/image/input-image.png');
        //隐藏删除按钮
        $(this).fadeOut();
    });
    
    //绑定日历
    laydate({
        elem: '#purchase'
    });

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

  //   $("#merchant_id").change(function(){
  //       $("#supplier_id").empty();
  //   	var id=$("#merchant_id").val();
		// $.post('/market/sx_goods_inac/supplier_list',{id:id},function(data){         
		// 	if(data.status==1){
  //           var  list=data.list
		// 	var count = list.length;  
  //           for ( var i = 0; i < count; i++) {  
  //               $("#supplier_id").append("<option value='" + list[i]['id'] + "'>" +list[i]['user_name'] + "</option>"); 
  //             } 

		// 	}
		// });
  //   });

    //未选择商户阻止提交
  //   $('.submit').on('click', function () {

  //       if($("#merchant_id").val()==0){
  //           return false
  //       } 
  // });
     var searchTimer;
    function cbSearch() {
        searchTimer = setTimeout(function () {
            $.get('/market/sx_goods_inac/merchant_list?value=' + $('input[name="merchant_name"]').val().trim(), function (data) {

                data = JSON.parse(data);

                var html = template('template', data);
                document.getElementById('search').innerHTML = html;
                //有匹配项才显示,没有匹配项就隐藏
                if (data.status) {
                    $('#search').show();
                    $('#search').scrollTop(0);
                } else {
                    document.getElementById('search').innerHTML = '';
                    $('#search').hide();
                }

                //hover事件
                $('#search li').hover(function () {
                    $(this).addClass('active');
                }, function () {
                    $(this).removeClass('active');
                });
                //点击事件
                $('#search li').on('click', function () {
                    $("#merchant_id").val();
                    //input失去焦点的同时如果是在选择菜名的话不能立刻隐藏选择框
                    realBlur = false;
                    $('input[name="merchant_name"]').val($(this).text());
                    // 获取商户的id
                    $('#merchant_id').val($(this).attr('user_id'));
                    // 根据商户的id获取对应的供应商
                    // 
                    $("#supplier_id").empty();
                    $.post('/market/sx_goods_inac/supplier_list',{id:$(this).attr('user_id')},function(datas){
                       datas=JSON.parse( datas );
                        if(datas.status==1){
                        var  list_supplier=datas.lists
                        var count = list_supplier.length;  
                        for ( var i = 0; i < count; i++) { 
                        // console.log(list_supplier[i]['user_name']) ;
                            $("#supplier_id").append("<option value='" + list_supplier[i]['id'] + "'>" +list_supplier[i]['user_name'] + "</option>"); 
                          } 

                        }
                    });

                    document.getElementById('search').innerHTML = '';
                    $('#search').hide();
                    realBlur = true;
                });
            });
        }, 500);
    }

    // //自动匹配商品
    $('input[name="merchant_name"]').on('keyup', function () {
        if ($(this).val().trim() == '') {
            document.getElementById('search').innerHTML = '';
            $('#search').hide();
            return;
        }
        clearTimeout(searchTimer);
        cbSearch();
    });

    //flag,判断选择框是否需要隐藏
    var realBlur = true;
    $('input[name="merchant_name"]').on('blur', function () {
        setTimeout(function () {
            if (realBlur) {
                document.getElementById('search').innerHTML = '';
                $('#search').hide();
            }
        }, 100);
    });
})