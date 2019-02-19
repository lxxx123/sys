$(function(){
	 
	//页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/sx_contractac/index/parent_id/3?page=' + txt;
        } else {
            window.location.href = '/market/sx_contractac/index/parent_id/3';
        }
    });

	//Excel导出
	$("#btn_export").click(function(){
		window.location.href = '/market/sx_contractac/export';
	});

	//添加
	$('#btn_add').on('click',function () {
        // alert($('.active').attr('data-pid'));
		location.href = '/market/sx_contractac/add/parent_id/' + $('.active').attr('data-pid');
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
            // alert($('.active').attr('data-parent'));
            window.location.href = '/market/sx_contractac/edit/page/' + $('#page').val() + "?id=" + chk_value[0]+"&parent_id="+ $('.active').attr('data-pid');
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
                    
					$.post('/market/sx_contractac/del',{id:chk_value.join(',')},function(data){
                        
						if(data==1){
							window.location.href = '/market/sx_contractac/index/parent_id/3';
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
		var txt = $("#search_txt").val();
		if(txt != ''){

			window.location.href = 'market/sx_contractac/index/parent_id/3'+"?task_name="+txt;
		}else{
			window.location.href = 'market/sx_contractac/index/parent_id/3';
		}
	});	
});