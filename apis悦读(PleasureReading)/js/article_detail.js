var page = 1,limit = 3;
var count = -1;   
isLoginToken();
//显示文章详情
ajaxXHR('get',url+'posts/details?id=' + GetParam()["article_id"],function(data){
    switch(data.code){
        case "param_incomplete":
        alert(data.message);
        break;
        case "article_not_found":
        alert(data.message);
        break;
        default:
        var dataArr = data.data.article;
            $Id('title').innerHTML = dataArr.title;
            $Class('title_article')[0].innerHTML = dataArr.title;
            $Class('con_article')[0].insertAdjacentHTML('beforeend',dataArr.body);
            for (let index = 0; index < $Qsa('.con_article > p').length; index++) {
                $Qsa('.con_article > p')[index].classList.add('txt_indent');                        
            }
            // $Class('img_1')[0].src = urlStatic+dataArr.author.avatar;
            $Class('name_1')[0].innerHTML = dataArr.author.name;
            $Class('time_1')[0].innerHTML = commonTimeFunc(dataArr.create_time);         
            $Class('star')[0].innerHTML = dataArr.praise_sum;
            $Class('explore')[0].innerHTML = dataArr.look_sum;
    }
});
//页面加载显示评论列表
ajaxXHR('get',url+'comment/list?page='+page+'&limit='+limit+'&article='+GetParam()["article_id"],function(data){
    switch(data.code){
        case "param_incomplete":
        console.log(data.message);
        break;
        case "param_error":
        console.log(data.message);
        break;
        default :
            var str = '<div class="part2" data-id=""><div class="line" style="margin: 25px 0"></div><div class="tips"><image src="images/4.png" data-src="" width="36px" height="36px" class="img_1 fl pointer"></image><span class="name_1 fl pointer" data-id="">娜娜</span><span class="time_1 fl pointer">09:22</span><image src="images/icon_thumb_up_like.png" class="icon_1 fl pointer"></image><span class="star fl pointer">54</span></div><p class="con_body">添加一个打赏功能啊，文章报道的很好，很想打赏！</p></div>';
            var update_talk = $Class('update_talk')[0];
            var arrData = data.data.comments;
            var strTalk = '';
            for(var i = 0; i < limit; i++){
                strTalk += str;
            }
            update_talk.insertAdjacentHTML('beforeend',strTalk);
            for(var i = 0; i < arrData.length; i++){
                // var time = commonTimeFunc(arrData[i].create_time); //函数名和返回值命名一样会导致编译器解析错误 
                $Class('img_1')[i+1].src = urlStatic+localStorage.avatar;
                $Class('name_1')[i+1].innerHTML = arrData[i].author.name;
                $Class('time_1')[i+1].innerHTML = commonTimeFunc(arrData[i].create_time);
                $Class('star')[i+1].innerHTML = arrData[i].praise_sum;        
                $Class('con_body')[i].innerHTML = arrData[i].body;
                $Class('part2')[i].dataset.id = arrData[i]._id;
                $Class('name_1')[i+1].dataset.id = arrData[i].author._id;
            }            
    }
});
//发表评论操作
$Ael($Id('btn_submit'),'click',function(){
    ajaxXHR('post',url+'comment/add',function(data){
        switch(data.code){
            case "param_incomplete":
            console.log(data.message);
            break;
            case "article_not_found":
            console.log(data.message);                
            break;
            case "account_token_invalid":
            console.log(data.message);                
            break;
            default :
                alert(data.message);
        }
    },'token='+localStorage.token+'&body='+$Id("talk").value+'&article=' + GetParam()["article_id"]);
});
