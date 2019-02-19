$(function(){
	
	//导出Excel
    $("#btn_export").click(function () {
    	window.location.href = '/market/sx_destroy_logac/export'; 
    });
    //全选，全不选
    $('#check-all').on('change', function () {
        var checked = $(this)[0].checked;
        $('input[name="ids"]').each(function () {
            $(this)[0].checked = checked;
        });
    });	
	//页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/sx_destroy_logac/index/parent_id/' + $('.active').attr('data-pid') + '?page=' + txt;
        } else {
            window.location.href = '/market/sx_destroy_logac/index/parent_id/' + $('.active').attr('data-pid');
        }
    });
	
    //日历控件
    laydate({
        elem: '#search_time',
    });

	//查询
	$("#btn_search").click(function(){
		var txt = $("#search_txt").val();
        var search_time = $("#search_time").val();
		/*if(txt != ''){
			window.location.href = '/market/sx_destroy_logac/index/parent_id/' + $('.active').attr('data-pid') + "?key=" + txt;
		}else{
			window.location.href = '/market/sx_destroy_logac/index/parent_id/' + $('.active').attr('data-pid');
		}*/	
        window.location.href = 'market/sx_destroy_logac/index/parent_id/' + $('.active').attr('data-pid')+ "?key=" + txt + "&search_time=" + search_time;
	});
    
	//添加
	$("#btn_add").click(function(){

			window.location.href = '/market/sx_destroy_logac/add';	
	});	
    //删除
    var tipsTimer2;//在外部定义延迟函数变量名
    var toastTimer;//在外部定义延迟函数变量名
    $("#btn_del").click(function () {
        var chk_value = [];
        $('input[name="ids"]:checked').each(function () {
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
                    //发送删除数据ajax请求
                    // console.log(chk_value);
                    $.ajax({
                        //几个参数需要注意一下
                        type: "POST",//方法类型
                        dataType: "json",//预期服务器返回的数据类型
                        url: "/market/sx_destroy_logac/del" ,//url
                        data: {ids:chk_value.join(',')},//需要传输的数据
                        success: function (result) {
                           
                            if (result.status == 1) {
                                window.location.reload();
                            }
                        },
                        error : function() {
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
    //阻止tips提示框点击事件冒泡
    $('.operate button').delegate('.tips', 'click', function (ev) {
        ev.stopPropagation();
    });
    //修改
    var tipsTimer1;//在外部定义延迟函数变量名
    $("#btn_edit").click(function (ev) {

        var chk_value = [];
        $('input[name="ids"]:checked').each(function () {
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
        	// window.location.href = '/market/destroy_logac/edit/page/' + $('#page').val() + "?id=" + chk_value[0];
            // alert(chk_value[0]);
            window.location.href = '/market/sx_destroy_logac/edit/id/' + chk_value[0];
        }
    });
});