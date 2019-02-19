$(function(){
	
	//页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/guide_priceac/index/parent_id/8?page=' + txt;
        } else {
            window.location.href = '/market/guide_priceac/index/parent_id/8';
        }
    });

	//添加
	$('#btn_add').on('click',function () {
		location.href = '/market/guide_priceac/add';
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
            // alert($('#page').val());
            window.location.href = '/market/guide_priceac/edit/page/' + $('#page').val() + "?id=" + chk_value[0];
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
					$.post('/market/guide_priceac/del',{id:chk_value.join(',')},function(data){
						if(data==1){
							window.location.href = '/market/guide_priceac/index/parent_id/8';
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
	//查找
	$("#query_btn").click(function(){
		var txt = $("#stall_number").val();
		if(txt != ''){
			window.location.href = '/market/guide_priceac/index/parent_id/8'+"?key="+txt;
		}else{
			window.location.href = '/market/guide_priceac/index/parent_id/8';
		}
    });
    $("#query_rise").click(function(){
        var plus=$('#query_rise').attr('plus');
        
            alert(plus);
            // $.post('/market/guide_priceac/rise',{id:id,plus:plus},function(data){
            //     if(data==1){
            
            //         window.location.href = '/market/guide_priceac/index/parent_id/'+ $('.active').attr('data-parent');
            //     }
            // });           
    });
    //单个设置次数，失去焦点时触发
    $('.single-count').on('blur',function () {
        var txt = $("#page").val();
        //设置次数发送请求
        var count = $(this).val();
        var id = $(this).attr('data-id');
            $.post('/market/guide_priceac/rise',{id:id,count:count},function(data){
                if(data==1){
                    window.location.href = '/market/guide_priceac/index/parent_id/'+ $('.active').attr('data-parent')+'?page=' + txt;
                }
            });
    });

    $('.single-counts').on('blur',function () {
        var txt = $("#page").val();
        //设置次数发送请求
        var counts = $(this).val();
        var id = $(this).attr('data-ids');
            $.post('/market/guide_priceac/star',{id:id,count:counts},function(data){
                // alert(data);
                if(data==1){
                    window.location.href = '/market/guide_priceac/index/parent_id/'+ $('.active').attr('data-parent')+'?page=' + txt;
                }
            });
    });

//    批量指导价导入  2018-12-10 马雪城
    $('#btn_import').on('click',function () {
        location.href = '/market/guide_priceac/import';
    });
});