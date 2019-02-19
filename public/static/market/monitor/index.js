$(function () {
    //实现全屏
    var x = document.body.scrollWidth;  //网页正文全文宽
    var y = window.screen.availHeight - window.screenTop - 150; //屏幕可用工作区高度 - 网页正文部分上 - 按钮区域

    document.getElementById("nvr-zone").innerHTML = '<object id="NVR" name="NVR" classid="clsid:98273A0C-BF68-401A-AD40-B3100998052F"  width=860px' + ' height= 520px' + y + ' >海康视频播放系统</br>您可能没有安装NVR.OCX控件。<a href="/download/NVR.rar">请点击这里下载</a>下载后解压NVR.rar文件，然后执行"海康SDK注册.bat"即可。</br> 并OCX在IE8上测试通过，如果IE8上不能加载该OCX控件，请点击IE浏览器的"工具"--->"Internet选择"--->"高级",在"安全"节点下面请把"容许运行或安装软件，即使签名无效"勾选。</br></object>';

    var　NVR　=　document.getElementById("NVR");
    NVR.startocx('{$info.market_code}','{$info.market_name}');


    //监听页面关闭,释放OCX中的资源
    window.onbeforeunload = onbeforeunload_handler;
    function onbeforeunload_handler(){
        NVR.endocx();
    }


});