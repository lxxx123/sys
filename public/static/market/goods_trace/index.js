$(function () {
   /* //查找
    $("#btn_search").click(function () {
        var txt = $("#search_txt").val();
        if (txt != '') {
            window.location.href = '/market/goods_traceac/index/parent_id/' + $('.active').attr('data-pid') + '?key=' + txt;
        } else {
            window.location.href = '/market/goods_traceac/index/parent_id/' + $('.active').attr('data-pid');
        }
    });*/

    //查找
    $("#btn_search").click(function(){
        var txt = $("#search_txt").val();
        if(txt != ''){
            window.location.href = '/market/goods_traceac/index/parent_id/4'+"?key="+txt;
        }else{
            window.location.href = '/market/goods_traceac/index/parent_id/4';
        }


    });
});