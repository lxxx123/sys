$(function () {
    $('#btn_search').on('click',function () {
        location.href = '/market/wsc_merchant_goodsac/index/parent_id/'+$('#parent_id').val()+'?key1='+$('#search_txt').val();
    });
});