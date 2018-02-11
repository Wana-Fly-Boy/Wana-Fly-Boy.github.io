 //文章加载函数
 function loadArticle(data,page){
    var array = data.data.articles;
    var str = '';//str不是字符串格式，会被赋值为"undefined"，并加载到文档中
    var num = 0; 
    for(var i = 0; i < limit; i++){
        count++;
        var strHtml = '';            
        strHtml = '<div class="part1" data-id="">';
        strHtml += '<a class="part1_img fl pointer"  onclick="Func('+count+')">';
        strHtml += '<image class="cover" data-src="" src="images/loading.gif" width="100%" height="100%"></image></a>';
        strHtml += '<div class="part1_con fl">'
        strHtml += '<div class="part1_con_words">';
        strHtml += '<a class="title_words pointer" id="title_1" onclick="Func('+count+')">首设“虚拟站点”，滴滴小巴正式上线</a>';
        strHtml += '<p class="title_con" id="content_1">12月15日滴滴小巴业务正式上线，产品首期已在北京、成都部分区域开通。开通地区的用户可通过手机客户端滴滴出行来呼叫小巴，小巴会智能计算乘客上车点和下车点，乘客选择确认后，就会通知用户和小巴“约会”的时间和地点。</p></div>';
        strHtml += '<div class="part1_con_tips">';
        strHtml += '<a class="tips1 fl" onclick="Func_author('+count+')"><image data-src="" src="images/icon_loading.png" width="36px" height="36px" class="img_1 cover fl pointer\"></image>'
        strHtml += '<span class="name_1 fl pointer" data-id="">吕一</span>';
        strHtml += '<span class="time_1 fl pointer">09:22</span></a>';
        strHtml +='<div class="tips2 fr"><span class="explore fr">24324</span>';
        strHtml +='<image src="images/icon_saw.png" class="img_saw fr pointer"></image>';
        strHtml += '<span class="star fr">5422</span>';
        strHtml += '<image src="images/icon_thumb_up_like.png" class="icon_1 fr pointer"></image></div></div></div></div>';
        str += strHtml;
    }
    if(page == 1){
        $Class('box_ml')[0].innerHTML = str; 
        num = 0;
    }else {
        // num = 3;    page = 2;   num = 2; 
        // num = 6;    page = 3;   num = 4;
        // num = 9;    page = 4;   num = 6;
        // num = 12;   page = 5;   num = 8;
        // num = 15;   page = 6;   num = 10;
        // num = page * 3 - 3; num = page * 2  - 2;
        // num = page * limit - limit

        $Class('box_ml')[0].insertAdjacentHTML('beforeend',str);   
        num = page * limit - limit;
    }

    for (let index = 0; index < array.length; index++) {
        $Class('part1')[index+ num].dataset.id = array[index]._id;
        $Class('name_1')[index + num].dataset.id = array[index].author._id;
        $Qsa('.part1_img > img')[index + num].dataset.src = urlStatic+array[index].cover;
        $Class('title_words')[index + num].innerHTML = array[index].title;
        $Class('title_con')[index + num].innerHTML = array[index].abstract || '没有更多的内容了。。。'; 
        $Class('img_1')[index + num].dataset.src = urlStatic+array[index].author.avatar;
        $Class('name_1')[index + num].innerHTML = array[index].author.name;
        $Class('time_1')[index + num].innerHTML = commonTimeFunc(array[index].create_time);         
        $Class('star')[index + num].innerHTML = array[index].praise_sum || 0;
        $Class('explore')[index + num].innerHTML = array[index].look_sum;     
    }
    preLoadImg();
}

function Func(count){
    window.open('article_detail.html?article_id=' + $Class('part1')[count].dataset.id);
}
function Func_author(count){
    window.open('otherPersonal.html?author_id=' + $Class('name_1')[count].dataset.id);
}
//文章列表请求成功返回数据（假数据）
var jsonData = 
{
    "code":"SUCCESS",
    "data":{
            "articles":
                [
                    {
                        "_id":"5a180191401ad948889a12a0",
                        "title":"钱谷",
                        "author":
                        {
                            "_id":"5a18008c401ad948889a129d",
                            "name":"李翔",
                            "avatar":"avatar/7b0787f44bb6df85ad51fd12c367be1c",
                            "gender":"man",
                            "city":["放假奥斯卡的风景按时"]
                        },
                        "look_sum":54
                    },
                    {
                        "_id":"5a17f9d0396c3149ac92aee2",
                        "title":"带着希望，从黑暗驶向光明",
                        "cover":"cover/ea3cda312ae352b9529129c744e05a9a",
                        "abstract":"文 || 冉依雪2017年11月24日 星期四 晴无戒365天极限挑战日更营 第24天 “你爱她，你能给她锦衣玉食吗？” “爱在现实面前一文不值。” 【1】 小雪过后，天越...",
                        "create_time":1511516631000,
                        "author":
                        {
                            "_id":"5a17f9c9396c3149ac92ae74",
                            "name":"冉依雪LOVE",
                            "gender":"woman",
                            "constellations":"水瓶座",
                            "avatar":"avatar/c9e2747a45129f36fb830e3944a71fbe",
                            "city":["湖南省 长沙市"]
                        },
                        "look_sum":20,
                        "praise_sum":8
                    }
                ]
            },
        "count":190
};
