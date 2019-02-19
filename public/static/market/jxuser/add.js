$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    }); 
    // 检测账号是否存在。
    $('#account_number').on('blur',function(){
        var account_number=$('#account_number').val();
        $.post('/market/jxuserac/check',{account_number:account_number},function(data){
            if(data==1){
                //账号存在提示框
                $('.check').fadeIn(function () {
                    toastTimer = setTimeout(function () {
                        $('.check').fadeOut();
                    }, 1000);
                });
            }
       });
    });

    // 全选
    $(".check-all").click(function(){
        if(this.checked){
            $(".pos_check:checkbox").prop("checked",true);
        }else{
            $(".pos_check:checkbox").prop("checked",false);
        }
    })

    $("#to_submit").click(function(){
        var password = $("input[name=password]").val();
        var username = $("input[name=username]").val();
        var account_number = $("input[name=account_number]").val();
        var check_val = [];
        $('.pos_check:checked').each(function(){
            check_val.push($(this).val());
        });
        var position_id = check_val.join(",");
        if (account_number == '') {
            alert('帐号不能为空');return false;
        }
        if (username == '') {
            alert('姓名不能为空');return false;
        }
        if (password == '') {
            alert('密码不能为空');return false;
        }
        $.post('/market/jxuserac/add_post',{password:password,username:username,account_number:account_number,position_id:position_id},function(data){
            if(data==1){
                alert('添加成功');
                window.location.href = '/market/jxuserac/index/parent_id/2';return true;
            } else {
                alert(data);return false;
            }
       });
        
    });

});