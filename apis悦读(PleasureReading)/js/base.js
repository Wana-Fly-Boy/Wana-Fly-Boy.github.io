var url = 'https://dev.apis.sh/P7tGsGhy@/';
// var urlStatic = 'https://dev.apis.sh/nBU1$anw@/static/';

var $Class = function(strClassName){
    return document.getElementsByClassName(strClassName);
}
var $Id = function(strId){
    return document.getElementById(strId);
}
var $Qs = function(strElement){
    return document.querySelector(strElement);
}
var $Qsa = function(strElementAll){
    return document.querySelectorAll(strElementAll);
}
var $Ael = function(ele,eve,fun,boo){
    return ele.addEventListener(eve,fun,boo);
}
function shareClick(){
    var wx_code = $Id('wx_code');
    if(wx_code.style.display == 'block'){
        wx_code.style.display = 'none';
    }else {
        wx_code.style.display = 'block';
    }
};
function isLoginToken(){
    if(localStorage.token != ''){
        var strAvatar = 
            '<image src="images/5.png" width="36px" height="36px" id="icon" class="pointer"></image>'+
            '<span id="name" class="pointer">吕璐</span>'+
            '<div id="animation">'+
                '<image src="images/icon_arrow_down.png" id="up" class="pointer"></image>'+
                '<div class="test_triangle_border" id="tag">'+
                    '<div class="popup">'+
                        '<span><em></em></span>'+
                        '<ul>'+
                            '<li><image src="images/icon_user.png"></image><a href="">个人中心</a></li>'+
                            '<li><image src="images/icon_setting.png"></image><a href="userSet.html">账户设置</a></li>'+
                            '<li><image src="images/icon_exit.png"></image><a href="">退出登录</a></li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>';
        $Id('log').parentNode.removeChild($Id('log'));
        $Id('reg').parentNode.removeChild($Id('reg'));
        $Class('title_r')[0].insertAdjacentHTML('afterbegin',strAvatar);
        // $Id('icon').src = urlStatic+localStorage.avatar;
        $Id('name').innerHTML = localStorage.name;
        return true;
    }
    else{
        return false;
    }
}
function commonTimeFunc(createTime){
    var unixTimestamp = new Date(createTime);
    commonTime = unixTimestamp.toLocaleString();
    Date.prototype.toLocaleString = function(){
        return this.getFullYear()+'/'+(this.getMonth()+1)+'/'+this.getDate()+'/'+this.getHours()+':'+this.getMinutes()+':'+this.getSeconds();
    };
    return commonTime;
}

function turnInfo(obj){
    obj.onfocus = function(){
        obj.value = '';
        obj.style.color = '#FFFFFF';
    };
    obj.style.color = 'red';
}

function pwdErrorShow(objPwd){
    objPwd.value =  '两次密码输入不一致，请重新输入。';
    objPwd.style.color = 'red';
    // strPwdR.style.color = 'red';
    objPwd.type = 'text';
    // strPwdR.type = 'text';
    objPwd.onfocus = function(){
        objPwd.value = '';
        objPwd.style.color = '#FFFFFF';
        objPwd.type = 'password';
    };
    objPwd.style.color = 'red';
}
function GetParam() {   
   var urlParams = location.search; //获取url中"?"符后的字串   
   var theParam = new Object();   
   if (urlParams.indexOf("?") != -1) {   //如果要检索的字符串值没有出现，则该方法返回 -1。
      var str = urlParams.substr(1);   //substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。substr(start,length);
      strs = str.split("&"); //分割数组   
      for(var i = 0; i < strs.length; i++) {   //name=123 user=sss
        //  theParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);     decodeURIComponent(),decodeURI(),encodeURI(),encodeURIComponent()
         theParam[strs[i].split("=")[0]] = strs[i].split("=")[1];            //未编码，不需要解码，可以直接获取decodeURI
      }   
   }   
   return theParam;   
}   

var placeData = {
    "code":"SUCCESS",
    "data":{
        "province":"陕西省",
        "city":"西安市",
        "area":"雁塔区"
    }
}
var jsonData = {
    "code":"SUCCESS",
    "data":{
        "articles":[
            {
                "_id":"5a17f9d0396c3149ac92aecd",
                "title":"在哈佛大学读书是一种怎样的体验？",
                "cover":"cover/066bd50784a3f763dc71bd352b306874",
                "abstract":"今天我们邀请了曾在哈佛商学院就读的Michelle学姐来和大家聊聊大家眼中光鲜亮丽的“哈佛大学”里，她曾经“痛并快乐着”的真实生活。 每个10分钟都要精打细算 我记得拿了哈佛...",
                "create_time":1511511067000,
                "author":{
                    "_id":"5a17f9c9396c3149ac92ae76",
                    "name":"谢劲波",
                    "gender":"woman",
                    "constellations":"白羊座",
                    "avatar":"avatar/037e7486448b4da21ec57a55e2732e57",
                    "city":[
                        "山东省 东营市"
                    ]
                },
                "look_sum":951,
                "praise_sum":56
            },
            {
                "_id":"5a17f9d0396c3149ac92aef1",
                "title":"怎样的食物才是好零食？",
                "cover":"cover/8052f5d11e28254871009d7f5e4fd969",
                "abstract":"婴儿出生前，营养物质的摄入，通过一根脐带，从母亲体内直接获取。婴儿出生，哭声意味着呼吸系统开始启动，剪短脐带的那一刻开始，营养的吸收和利用，就要依靠婴儿自己消化吸收系统。婴儿...",
                "create_time":1511511004000,
                "author":{
                    "_id":"5a17f9c9396c3149ac92ae79",
                    "name":"小王子的鞋",
                    "gender":"woman",
                    "constellations":"处女座",
                    "avatar":"avatar/63c632ee37ca94f094a98a0363c0f36f",
                    "city":[
                        "新疆维吾尔自治区 博尔塔拉蒙古自治州"
                    ]
                },
                "look_sum":8,
                "praise_sum":0
            },
            {
                "_id":"5a17f9ce396c3149ac92aeb8",
                "title":"别特么每次一出事，就让我教孩子学会自保",
                "cover":"cover/fd6e446c0fcf8b7ba0c14d8e2f69d27e",
                "abstract":"最近听到最多的一句话是：“这世界怎么了？” 最发达的几个城市，幼儿园接二连三成为焦点的原因，竟是在刷新对人性下限的认识。 “宝贝，芥末是什么味道？” “疼……” “都什么时候...",
                "create_time":1511509988000,
                "author":{
                    "_id":"5a17f9c9396c3149ac92ae6e",
                    "name":"槽值",
                    "gender":"man",
                    "constellations":"摩羯座",
                    "avatar":"avatar/c166b26c480b42c315234131712b68c8",
                    "city":[
                        "上海 上海市"
                    ]
                },
                "look_sum":2061,
                "praise_sum":114
            }
        ]
    },
    "count":206
}
var talkData = 
{
    "code": "SUCCESS",
    "data": {
        "comments": [
            {
                "_id": "5a5588ccef6aee1381003c90",
                "body": "'年后啊'",
                "author": {
                    "_id": "5a18028b3f548155c68022b7",
                    "name": "123****8913"
                },
                "praise_sum": 18,
                "create_time": 1515555020908
            },
            {
                "_id": "5a18039a61e0b757a6f3a527",
                "body": "'年后啊'",
                "author": {
                    "_id": "5a18028b3f548155c68022b7",
                    "name": "123****8913"
                },
                "praise_sum": 95,
                "create_time": 1511523226160
            },
            {
                "_id": "5a18039a61e0b757a6f3a527",
                "body": "'年后啊'",
                "author": {
                    "_id": "5a18028b3f548155c68022b7",
                    "name": "123****8913"
                },
                "praise_sum": 95,
                "create_time": 1511523226160
            },
            {
                "_id": "5a18039a61e0b757a6f3a527",
                "body": "'年后啊'",
                "author": {
                    "_id": "5a18028b3f548155c68022b7",
                    "name": "123****8913"
                },
                "praise_sum": 95,
                "create_time": 1511523226160
            }
        ]
    },
    "count": 6
}
var jsonData2 = {
    "code":"SUCCESS",
    "data":{
        "articles":[
            {
                "_id":"5a17f9ce396c3149ac92aeae",
                "title":"比起啃老，中国人更爱啃亲戚",
                "cover":"cover/25316a9aafda0d9d680d6bf40154586a",
                "abstract":"在中国，亲戚交往中有这样一种观点：“我们都是亲戚，计较这些干什么？” 于是，生活中多了这样一批亲戚： 来你家蹭吃蹭喝，稍微表示不满，就教训你不尊重亲戚，不是一家人。 钱不够花...",
                "create_time":1511514175000,
                "author":{
                    "_id":"5a17f9c9396c3149ac92ae6e",
                    "name":"槽值",
                    "gender":"man",
                    "constellations":"摩羯座",
                    "avatar":"avatar/c166b26c480b42c315234131712b68c8",
                    "city":[
                        "上海 上海市"
                    ]
                },
                "look_sum":98,
                "praise_sum":10
            },
            {
                "_id":"5a17f9ce396c3149ac92aeb8",
                "title":"别特么每次一出事，就让我教孩子学会自保",
                "cover":"cover/fd6e446c0fcf8b7ba0c14d8e2f69d27e",
                "abstract":"最近听到最多的一句话是：“这世界怎么了？” 最发达的几个城市，幼儿园接二连三成为焦点的原因，竟是在刷新对人性下限的认识。 “宝贝，芥末是什么味道？” “疼……” “都什么时候...",
                "create_time":1511509988000,
                "author":{
                    "_id":"5a17f9c9396c3149ac92ae6e",
                    "name":"槽值",
                    "gender":"man",
                    "constellations":"摩羯座",
                    "avatar":"avatar/c166b26c480b42c315234131712b68c8",
                    "city":[
                        "上海 上海市"
                    ]
                },
                "look_sum":2061,
                "praise_sum":114
            },
            {
                "_id":"5a17f9ce396c3149ac92aec1",
                "title":"“换头手术”，忽悠了没头脑的人",
                "cover":"cover/e1841219ce7e4913791b77c26abfd89a",
                "abstract":"“换头手术”把多年来人类对精神、大脑和人体之间的关系的争议重新推上风口浪尖。如果换头成功，“我”还是我么？ 11月17日，意大利神经学家塞尔焦·卡纳维洛（Sergio Can...",
                "create_time":1511430734000,
                "author":{
                    "_id":"5a17f9c9396c3149ac92ae6e",
                    "name":"槽值",
                    "gender":"man",
                    "constellations":"摩羯座",
                    "avatar":"avatar/c166b26c480b42c315234131712b68c8",
                    "city":[
                        "上海 上海市"
                    ]
                },
                "look_sum":2677,
                "praise_sum":49
            }
        ]
    },
    "count":4
    };

//优化一：根据#name的宽度，更改#icon和#name的定位（right）
//————————————已解决————————————优化二：屡清楚所有的localStorage
//————Important————优化三：头部底部封装个页面
//————————————已解决————————————完成个人中心，其他人个人中心
//————————————已解决————————————完成用户设置页用户信息的默认显示
//问题：动态绑定？文章列表点击文章显示文章详情，是否可以动态绑定。a标签直接实现了跳转和请求比较好的处理方式。
//————————————已解决————————————问题2：上传以后的头像没有显示为正常的样式大小，应该是圆形，显示的却是正方形。只需给icon元素添加border-radius:50%;
//问题2：为什么formdata的位置会影响它的数据封装？？  
//问题3：这里的数据必须是这样子赋给本地存储，curStar获取不到对应的数据？？？来自userSet页面的问题星座赋给本地存储的问题
//评论列表显示多个。
//————Important————ul替换select的三级联动
//————Important————文章列表的显示另一种方式
//为所有的up添加动画，删除点击事件。


// // 图片预加载

// // 有时服务器返回的数据中包含图片地址，通常我们会把图片地址作为img的src属性值去请求图片。

// // 由于网络等各方面原因，无法保证每张图片都能请求成功，所以需要对图片进行预加载判断是否加载成功：

// // <!-- 默认显示加载中图片 -->

// {/* <img id="cover" src="loading.png" alt="封面"> */}
// // 预加载图片：

// /**
//  * 预加载图片函数封装
//  * @param {String} img 请求图片地址
//  * @param {String} id 需要填充图片id
//  */
// function preLoadImg(img,id){
//     var tmpImg = new Image();
//     // 图片加载成功后，替换临时图片。
//     tmpImg.onload = function(){
//            document.getElementById(id).src = tmpImg.src
//     }
//     // 加载失败。
//     tmpImg.onerror = function(){
//            var error = '../../img/error.png' // 此处为错误图片地址，用户自行修改
//        document.getElementById(id).src = error
//     }
//     // 预加载图片(接口返回的图片地址需要前加上服务器地址)。
//         tmpImg.src = 'https://dev.apis.sh/key/static/'+ img;
// }
// // 上例中key指用户购买项目后获得的接口秘钥，详情可参考api文档简介 执行：

// // 图片地址以接口返回为准。
// preLoadImg('cover/800b63ce802669c220898be236e6fe60', cover)



// // 图片懒加载

// // 由于图片资源会占用大量带宽，对于未出现在浏览器窗口中的图片我们一般不会第一时间加载： html：

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Document</title>
// </head>
// <body>
//   <div id="coverList">
//     // data-src为自定义属性，js可通过dataset取到该值
//     <img class="cover" data-src="./imgs/cover1" alt="封面1" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover2" alt="封面2" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover3" alt="封面3" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover4" alt="封面4" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover5" alt="封面5" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover6" alt="封面6" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover7" alt="封面7" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover8" alt="封面8" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover9" alt="封面9" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover10" alt="封面10" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover11" alt="封面11" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover12" alt="封面12" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover13" alt="封面13" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover14" alt="封面14" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover15" alt="封面15" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover16" alt="封面16" src="default.jpg">
//     <img class="cover" data-src="./imgs/cover17" alt="封面17" src="default.jpg">
//   </div>
// </body>
// </html>
// {/* 当用户下拉页面，后面的图片会陆续出现在页面之中: */}

// function lazyload () {
//   // 获取所有img
//   var imgs = document.getElementsByClassName('cover');
//   // 循环所有图片
//   for (var i=0; i<imgs.length; i++)
//   {
//       // 图片请求后不再执行该函数
//       var img = imgs[i];
//       if (img.dataset.src === '') return;

//       // getBoundingClientRect().top指元素距离浏览器窗口顶部的距离。
//       // offsetHeight指元素的高度。
//       // document.body.clientHeight指文档body的高度。
//       // img.getBoundingClientRect().top + img.offsetHeight < 
//     //   document.body.clientHeigh说明元素位于浏览器窗口之中
//       if (img.getBoundingClientRect().top + img.offsetHeight < document.documentElement.clientHeight) {
//         // 当图片出现在视窗中时，请求该图片。
//         var tmpImg = new Image();
//         tmpImg.onload = function () {
//           img.src = tmpImg.src;
//         }
//         // 通过dataset获取图片的真实地址
//         tmpImg.src = img.dataset.src;
//         // 清空自定义数据，之后在执行函数时避免重复请求。
//         img.dataset.src = '';
//       }
//   }
// }
// // 监听滚动事件
// document.body.addEventListener('scroll', lazyload);
// // 页面滚动时会执行lazyload函数并把出现在视窗中的图片加载出来，并清空dataset.src,这样可以避免重复加载。


