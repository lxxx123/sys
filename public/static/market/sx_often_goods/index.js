$(function(){
	
    $('#sure').on('click', function () {
        var page = $('#page').val();
        page = parseInt(page);
        if (isNaN(page)) {
            alert('页码只能是数字');
            $('#page').val($(".active").find('span').html());
        } 
    });

    // 点击页码查询
    $(".pagination").find('li').click(function(){
        var page = $(this).find('a').html();
        var goods_key = $("#goods_key").val();
        var merchant_key = $("#merchant_key").val();
        var turn_url = '/market/sx_often_goodsac/index/parent_id/'+ $('.active').attr('data-parent')+"?goods_key="+goods_key+"&merchant_key="+merchant_key+"&page="+page;
        $(this).find('a').attr('href',turn_url);        
    })

	// 调转到第几页
    $("#sure").click(function () {
        var page = $("#page").val();
        var goods_key = $("#goods_key").val();
        var merchant_key = $("#merchant_key").val();
        window.location.href = 'market/sx_often_goodsac/index/parent_id/'+ $('.active').attr('data-parent')+"?goods_key="+goods_key+"&merchant_key="+merchant_key+"&page="+page;
    });

	//添加
	$('#btn_add').on('click',function () {
        var chk_value = [];
        $('input[name="id"]:checked').each(function () {
            chk_value.push($(this).val());
        });

        if(chk_value[0] == undefined){
            chk_value[0] = '';
        }
		location.href = '/market/sx_often_goodsac/add/parent_id/'+ $('.active').attr('data-parent') + "?id=" + chk_value[0];
    });

    //修改
    var tipsTimer1;//在外部定义延迟函数变量名
    $("#btn_edit").click(function () {
       
        var chk_value = [];
        $('input[name="id"]:checked').each(function () {
            chk_value.push($(this).val());
        });

        if (chk_value.length == 0) {
        	
            var tips = $(this).children('.tips');
            clearTimeout(tipsTimer1);
            $('.tips').hide();//所有tips隐藏
            tips.slideDown(200, function () {
                tipsTimer1 = setTimeout(function () {
                    tips.fadeOut();
                }, 3000);
            });
        } else {
            window.location.href = '/market/sx_often_goodsac/edit/page/' + $('#page').val() + "?id=" + chk_value[0]+"&parent_id="+ $('.active').attr('data-parent');
        }
    });

    //全选，全不选
    $('#check-all').on('change', function () {
        var checked = $(this)[0].checked;
        $('input[name="id"]').each(function () {
            $(this)[0].checked = checked;
        });
    });

    //删除
    var tipsTimer2;//在外部定义延迟函数变量名
    var toastTimer;//在外部定义延迟函数变量名
    $("#btn_del").click(function () {
        var chk_value = [];
        $('input[name="id"]:checked').each(function () {
            chk_value.push($(this).val());
        });

        if (chk_value.length == 0) {
            var tips = $(this).children('.tips');
            clearTimeout(tipsTimer2);
            $('.tips').hide();//所有tips隐藏
            tips.slideDown(200, function () {
                tipsTimer2 = setTimeout(function () {
                    tips.fadeOut();
                }, 3000);
            });
        } else {
            //关闭删除失败提示框
            clearTimeout(toastTimer);
            $('.toast').fadeOut();
            //打开删除确认框
            $('.confirm').fadeIn(function () {
                //点击确认事件
                $('#del-confirm').on('click', function () {
                    
					$.post('/market/sx_often_goodsac/del',{id:chk_value.join(',')},function(data){

						if(data==1){
							window.location.href = '/market/sx_often_goodsac/index/parent_id/'+ $('.active').attr('data-parent');
						}else{

		                    //删除失败提示框
		                    $('.toast').fadeIn(function () {
		                        toastTimer = setTimeout(function () {
		                            $('.toast').fadeOut();
		                        }, 2000);
		                    });
						}
					});


                    //关闭确认框
                    $('.confirm').fadeOut(function () {
                        //解绑确认取消点击事件，避免重复添加
                        $('#del-confirm').off('click');
                        $('#del-cancel').off('click');
                    });


                });
                //点击取消事件
                $('#del-cancel').on('click', function () {
                    //关闭确认框
                    $('.confirm').fadeOut(function () {
                        //解绑确认取消点击事件，避免重复添加
                        $('#del-confirm').off('click');
                        $('#del-cancel').off('click');
                    });
                });
            });
        }
    });

	// 点击查询进行查找
	$("#query_btn").click(function(){
        var goods_key = $("#goods_key").val();
		var merchant_key = $("#merchant_key").val();
        window.location.href = 'market/sx_often_goodsac/index/parent_id/'+ $('.active').attr('data-parent')+"?goods_key="+goods_key+"&merchant_key="+merchant_key;
	});	
});