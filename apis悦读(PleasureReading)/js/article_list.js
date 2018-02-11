var page = 1,limit = 3;
var count = -1;     
// //页面加载触发监听事件——图片预加载
// $Ael(document,'load',preLoadImg);

//页面滚动触发监听事件——图片懒加载
$Ael(document,'scroll',lazyLoad);

// 显示登录的头像和昵称
$Id('name').innerHTML = localStorage.name;
$Id('icon').src = urlStatic+localStorage.avatar;

// //ajax请求文章列表文章数据
ajaxXHR('get',url+'posts/list?page='+page+'&limit='+limit,function(data){
    switch(data.code){
        case "param_incomplete":
        alert(data.message);
        break;
        case "param_error":
        alert(data.message);
        break;
        case "account_not_found":
        alert(data.message);
        break;
        default :
            loadArticle(jsonData,page);                                 
            $Ael(window,'scroll',function(){//滚动事件触发执行函数，函数
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        // 获取加载中元素
                        var loading = $Class('loading')[0];
                        // getBoundingClientRect().top指元素距离浏览器窗口顶部的距离。
                        // offsetHeight指元素的高度。
                        // document.body.clientHeight指文档body的高度。
                        // loading.getBoundingClientRect().top+loading.offsetHeight<document.body.clientHeigh说明元素位于窗口之中
                        if (loading.getBoundingClientRect().top + loading.offsetHeight + 70 < document.documentElement.clientHeight) {
                            // 当正在加载图标出现在视窗中时，请求下一页文章列表。
                            // 请求文章列表接口。
                            page++;
                            ajaxXHR('get',url+'posts/list?page='+page+'&limit='+limit,function(data){
                                if(data.code == 'SUCCESS'){
                                    loadArticle(jsonData,page);
                                }
                            });
                        }
                },3000);
            });
    }
});

//返回顶部操作,图标到达一定高度才出现！
var timer = null;
var backTop = $Class('backTop')[0];    
$Ael(backTop,'click',function(){
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop > 0){
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 350;
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        } 
    });
});