$(function () {

    //返回按钮
    $('.back-btn').on('click',function () {
        history.back();
    });
    $("#merchant").change(function(){
        if($(this).val() != '0'){
            $.get("{:url('market/reconciliation_merac/get_phone')}?merchant_id="+$(this).val(),function(data){
                data = JSON.parse(data);
                $("#phone").val(data.msg);
                $("#pwd").val(data.pwd);
            });
        }
    });

});