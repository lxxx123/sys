$(function () {

    //返回
    $('.back-btn').on('click', function () {
        history.back();
    });

        $("#btn_add").click(function () {
            // alert(1);
            var chk_value = [];
            $('input[name="ids"]:checked').each(function () {
                chk_value.push($(this).val());
            });

            var group = $("#merchant_id").val();
            // alert(group);
            if (chk_value.length == 0) {
                return false;
            } else {
                $.ajax({
                    //几个参数需要注意一下
                    type: "POST",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "/market/sx_merchant_supplierac/group_add",//url
                    data: {ids: chk_value.join(','), merchant_id: group},//需要传输的数据
                    success: function (result) {
                        if (result.status == 1) {
                           window.location.href = '/market/sx_merchant_supplierac/index/parent_id/133';
                        }
                    },
                    error: function () {
                        //删除失败提示框
                        alert("添加失败");
                    }
                });
            }
        });
});