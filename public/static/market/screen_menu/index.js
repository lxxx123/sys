$(function () {
    //查找
    $("#btn_search").click(function(){
        var txt = $("#search_txt").val();
        if(txt != ''){
            window.location.href = 'market/screen_menuac/index/parent_id/8'+"?key="+txt;
        }else{
            window.location.href = 'market/screen_menuac/index/parent_id/8';
        }
    });

    //跳转到xx页
    //页面跳转
    $("#sure").click(function () {
        var txt = $("#page").val();
        if (txt != '') {
            window.location.href = '/market/screen_menuac/index/parent_id/8?page=' + txt;
        } else {
            window.location.href = '/market/screen_menuac/index/parent_id/8';
        }
    });
});