$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

    //全选
    $(".check-all-user").click(function(){
        if(this.checked){
            $(".user_check:checkbox").prop("checked",true);
        }else{
            $(".user_check:checkbox").prop("checked",false);
        }
    })

    $(".check-all-title").click(function(){
        if(this.checked){
            $(".title_check:checkbox").prop("checked",true);
        }else{
            $(".title_check:checkbox").prop("checked",false);
        }
    })

    $("input[name=parent_check]").click(function(){
        if(this.checked){
            $(this).parent().siblings().children("input[name=son_check]").prop("checked",true);
        }else{
            $(this).parent().siblings().children("input[name=son_check]").prop("checked",false);
        } 
    })

    // 子节点复选框点击时选中父类
    $("input[name=son_check]").click(function(){
        if (this.checked) {
            $(this).parent().siblings().children("input[name=parent_check]").prop("checked",true);
        }
    })

    // 提交分配的权限
    $("#submit_btn").click(function(){

        var limit_arr = [];
        $('.title_check:checked').each(function(){
            limit_arr.push($(this).val());
        });
        var limit_id = limit_arr.join(",");
        var parent_id = $("input[name=parent_id]").val();
        var admin_id = $("input[name=admin_id]").val();
        var records_id = $("input[name=records_id]").val();
        var user_login = $("input[name=user_login]").val();
        var user_pass = $("input[name=user_pass]").val();
        var user_name = $("input[name=user_name]").val();
        // 表单校验
        if (parent_id == '' || records_id == '') {
            alert('网络异常~');
            return false;
        }

        if (user_login == '') {
            alert('请填写登录帐号');
            return false;
        }

        if (user_pass == '') {
            alert('请填写登录密码');
            return false;
        }

        if (user_name == '') {
            alert('请填写帐号描述');
            return false;
        }

        if (limit_id == '') {
            alert('请选择要分配的权限目录');
            return false;
        }

        $.ajax({
          type: 'POST',
          url: '/market/recordsac/edit_limit_post',
          data: {limit_id: limit_id, records_id: records_id, admin_id: admin_id, user_login: user_login, user_pass: user_pass, user_name: user_name},
          //dataType: 'json',
          success: function(data){
            if( data == 'success'){
                alert('分配成功');
                window.location.href="/market/recordsac/index/parent_id/"+parent_id;
                return true;
            } else {
                alert(data);
                window.location.href="/market/recordsac/index/parent_id/"+parent_id;
                return false;
            }
          },
          error: function(){
            alert('网络异常,请刷新页面~');
            window.location.href="/market/recordsac/index/parent_id/"+parent_id;
          }
        });
        
    })
   
});