var page = 1,limit = 1;
var count = -1;

//页面加载触发监听事件——图片预加载
// $Ael(document,'load',preLoadImg);

//页面滚动触发监听事件——图片懒加载
$Ael(document,'scroll',lazyLoad);

// 显示本地保存的信息
$Id('name').innerHTML = localStorage.name;
// $Id('icon').src = urlStatic+localStorage.avatar;
// $Qs('.person_img > img').src = urlStatic + localStorage.avatar;
$Id('name_1').innerHTML = localStorage.name;
$Id('star').innerHTML = localStorage.constellation;
if(localStorage.gender == 'man'){
    $Qs('.person_icon > img').src = './images/icon_boy.png';
}else {
    $Qs('.person_icon > img').src = './images/icon_girl.png';
}
//请求城市根据获取到的city数组
ajaxXHR('get',url+'city/province?ProID='+localStorage.city.split(',')[0],function(data){
    if(data.code == 'SUCCESS'){
        var strP = placeData.data.province;
        ajaxXHR('get',url+'city/city?CityID='+localStorage.city.split(',')[1],function(data){
            if(data.code == 'SUCCESS'){
                var strC = placeData.data.city;
                ajaxXHR('get',url+'city/area?Id='+localStorage.city.split(',')[2],function(data){
                    if(data.code == 'SUCCESS'){
                        var strA = placeData.data.area;
                        $Id('place').innerHTML = strP + strC + strA;
                    }
                })
            }
        })
    }
});

// //ajax请求文章列表文章数据
ajaxXHR('get',url+'posts/list?page='+page+'&limit='+limit+'&user='+localStorage._id,function(data){
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
            loadArticle(data,page);                      
            $Ael(window,'scorll',function(){
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        var loading = $Class('loading')[0];
                        if (loading.getBoundingClientRect().top + loading.offsetHeight + 70 < document.documentElement.clientHeight) {
                            page++;
                            ajaxXHR('get',url+'posts/list?page='+page+'&limit='+limit+'&user='+localStorage._id,function(data){
                                if(data.code == 'SUCCESS'){
                                    loadArticle(jsonData,page);
                                }
                            });
                        }
            },2000);
        });
    }
});