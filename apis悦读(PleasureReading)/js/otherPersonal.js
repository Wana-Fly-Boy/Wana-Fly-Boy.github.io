var page = 1,limit = 2;
var count = -1;    
// //页面加载触发监听事件——图片预加载
// $Ael(document,'load',preLoadImg);

//页面滚动触发监听事件——图片懒加载
$Ael(document,'scroll',lazyLoad);

// 显示登录的头像和昵称
$Id('name').innerHTML = localStorage.name;
$Id('icon').src = urlStatic+localStorage.avatar;

//ajax请求文章列表文章数据
ajaxXHR('get',url+'posts/list?page='+page+'&limit='+limit+'&user='+GetParam()["author_id"],function(data){
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
            $Qs('.person_img > img').src = urlStatic + data.data.articles[0].author.avatar;
            if(data.data.articles[0].author.gender == 'man'){
                $Qs('.person_icon > img').src = './images/icon_boy.png';
            }else {
                $Qs('.person_icon > img').src = './images/icon_girl.png';
            }
            $Id('name_1').innerHTML = data.data.articles[0].author.name;
            $Id('place').innerHTML = data.data.articles[0].author.city;
            $Id('star').innerHTML = data.data.articles[0].author.constellations;
            loadArticle(data,page);         
            window.onscroll = function(){//滚动事件触发执行函数，函数
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        var loading = $Class('loading')[0];
                        if (loading.getBoundingClientRect().top + loading.offsetHeight + 70 < document.documentElement.clientHeight) {
                            page++;
                            ajaxXHR('get',url+'posts/list?page='+page+'&limit='+limit+'&user='+GetParam()["author_id"],function(data){
                                if(data.code == 'SUCCESS'){
                                    loadArticle(jsonData,page);
                                }
                            });
                        }
                },2000);
            }
    }
});