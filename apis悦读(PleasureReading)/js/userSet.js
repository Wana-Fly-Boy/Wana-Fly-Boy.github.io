$Ael(window,'load',function(){
    var arrPlace = new Array();        
    // isLoginToken();
    //formData格式化表单数据,formData可以封装上传数据
    var formData = new FormData();

    if(isLoginToken()){
        // //用户信息默认值
        $Id('img').src = urlStatic+localStorage.avatar;
        $Id('_name').value = localStorage.name;
        if(localStorage.gender == 'man'){
            $Id('man').checked = true;
        }else {
            $Id('woman').checked = true;
        }
        $Id('starList').options.add(new Option(localStorage.constellation,localStorage.constellationValue));            
        $Id('select_province').options.add(new Option(localStorage.province,localStorage.city.split(',')[0]));
        $Id('select_city').options.add(new Option(localStorage.urban,localStorage.city.split(',')[1]));
        $Id('select_area').options.add(new Option(localStorage.area,localStorage.city.split(',')[2]));            
    }

    //头像文件上传
    $Ael($Id('file_img'),'change',function(){
        var file = this.files[0];
        var file_reader = new FileReader();
        file_reader.onload = function (e) {
            // console.log(e.target);
            img.setAttribute('src',e.target.result);
        };
        file_reader.readAsDataURL(file);
        formData.append('avatar',file);
        $Id('label_img').style.opacity = '0';
    });

    var jsonDataStar = 
        {
            "code": "SUCCESS",
            "data": {
                "constellations": [
                    "白羊座",
                    "金牛座",
                    "双子座",
                    "巨蟹座",
                    "狮子座",
                    "处女座",
                    "天秤座",
                    "天蝎座",
                    "射手座",
                    "摩羯座",
                    "水瓶座",
                    "双鱼座"
                ]
            }
        }

    // 星座接口调用
     ajaxXHR('get',url+'constellations/query',callbackStar);
     function callbackStar(data){
        if(data.code == 'SUCCESS'){
            var strStar = '<option>——请选择——</option>';
            for(var i = 0 ; i < data["data"]["constellations"].length;i++){
                $Id('starList').options.add(new Option(data["data"]["constellations"][i],i));
            }
        }
     }

    ajaxXHR('get',url+'city/province',function(data){
        if(data.code == 'SUCCESS') {
            for (var i = 0; i < data["data"]["province"].length; i++) {
                $Id('select_province').options.add(new Option(data["data"]["province"][i].name, data["data"]["province"][i].ProID));
            }
        }
    });
    $Ael($Id('select_province'),'change',function () {
        $Id('select_province').removeChild($Id('select_province').options[0]);            
        ajaxXHR('get', url+'city/city?ProID=' + $Id('select_province').options[this.selectedIndex].value, function (data) {
            if(data.code == 'SUCESS'){
                for (var i = 0; i < data["data"]["city"].length; i++) {
                    $Id('select_city').options.add(new Option(data["data"]["city"][i].name, data["data"]["city"][i].CityID));
                }
            }
        });
    });
    $Ael($Id('select_city'),'change',function () {
        $Id('select_city').removeChild(this.options[0]);            
        ajaxXHR('get', url+'city/area?CityID=' + $Id('select_city').options[this.selectedIndex].value, 
        function (data) {
            if(data.code == 'SUCCESS'){
                for (var i = 0; i < data["data"]["area"].length; i++) {
                        $Id('select_area').options.add(new Option(data["data"]["area"][i].DisName,data["data"]["area"][i].Id-1));
                    }  
            }
        });
    });
    // function sss(){
    //     var timer = null;
    //     clearTimeout(timer);
    //     timer = setTimeout(function(){
    //         $Id('starList').removeChild($Id('starList').options[0])
    //     });
    //     $Id('starList').removeEventListener('click',sss);
    // }
    // $Ael($Id('starList'),'click',sss);
    // $Ael($Id('select_province'),'click',sss);

    // $Id('starList').onclick = function(){ 
    //     var timer = null;
    //     clearTimeout(timer);
    //     timer = setTimeout(function(){
    //         $Id('starList').removeChild($Id('starList').options[0]);
    //     });
    //     $Id('starList').onclick = null;
    // }

    function removeOption(a){
        a.onclick = function(){
            var timer = null;
            clearTimeout(timer);
            timer = setTimeout(function(){
                a.removeChild(a.options[0]);
            },10);
            a.onclick = null;
        }
    }
    removeOption($Id('starList'));
    removeOption($Id('select_province'));
    removeOption($Id('select_city'));
    removeOption($Id('select_area'));

    arrPlace = ['['+$Id('select_province').options[$Id('select_province').selectedIndex].value,
    $Id('select_city').options[$Id('select_city').selectedIndex].value,
    $Id('select_area').options[$Id('select_city').selectedIndex].value+']'];

    //账户设置调用接口发起请求
    $Ael($Id('btn_submit'),'click',function(){
        formData.append('token',localStorage.token);
        formData.append('name',$Id('_name').value);       //为什么formdata的位置会影响它的数据封装？？
        formData.append('constellation',$Id('starList').options[$Id('starList').selectedIndex].value);            
        // 判断用户性别选择
        if($Id('man').checked == true){
            formData.append('gender','man');
        }else {
            formData.append('gender','woman');
        }
        formData.append('city',arrPlace);                        
    
        ajaxFile('post',url+'account/profile',function(data){
            switch(data.code){
                case "param_incomplete":
                    alert(data.message);
                    break;
                case "param_type_error":
                    alert(data.message);
                    break;
                case "account_token_invalid":
                    alert(data.message);
                    break;
                case "SUCCESS" :
                    console.log("账户信息设置成功");
                    // {"code":"SUCCESS","data":
                    // {"user":
                    // {"gender":"woman",
                    // "avatar":"avatar/2cee7fce7b2f96e0cdb9127ab9e667b2",
                    // "_id":"5a6561f12e3dc852856e0c35",
                    // "account":"18829208856",
                    // "name":"d",
                    // "token":"9f9f97e93039990d334a9ab3742d81f6f6bf0a8f",
                    // "background":"background/bg_center4.jpg",
                    // "city":[10,66,697]}}}
                    localStorage.avatar = data.data.user.avatar;
                    localStorage.account = data.data.user.account;
                    localStorage.name = data.data.user.name;
                    localStorage.token = data.data.user.token;
                    localStorage.background = data.data.user.background;
                    localStorage.gender = data.data.user.gender;
                    localStorage.city = data.data.user.city;
                    localStorage._id = data.data.user._id;
                    localStorage.province = $Id('select_province').options[$Id('select_province').selectedIndex].innerHTML;
                    localStorage.urban = $Id('select_city').options[$Id('select_city').selectedIndex].innerHTML;
                    localStorage.area = $Id('select_area').options[$Id('select_area').selectedIndex].innerHTML;    
                    localStorage.constellationValue = $Id('starList').options[$Id('starList').selectedIndex].value;
                    localStorage.constellation = $Id('starList').options[$Id('starList').selectedIndex].innerHTML;
                    //这里的数据必须是这样子赋给本地存储，定义的变量curStar获取不到对应的数据？？？   

                    alert("账户信息设置成功！");
                    /*
                        {
                            "code":"SUCCESS",
                            "data":
                            {
                                "user":{
                                    "_id":"5a6561f12e3dc852856e0c35",
                                    "account":"18829208856",
                                    "name":"劉喆还需努力",
                                    "token":"617db8a3b6e969633df056551b7cce5c0457d9d9",
                                    "background":"background/bg_center4.jpg",
                                    "avatar":"avatar/24d7ee6da6e399df3071a803ae708102",
                                    "gender":"woman",
                                    "city":[23,297,2325]
                                }
                            }
                        }
                    */
                    break;
            }
        },formData);
    });
    // 'token='+localStorage.token+'&name='+$Id('_name').value
    //拼接字符串需要设置请求头

    //登录成功返回数据
    var jsonDataLog =
    {
        "code": "SUCCESS",
        "data": {
        "user": {
            "avatar": "avatar/23afed58f0fb30695763291fca92954b",
                "_id": "5a60439b84f151301b1f042e",
                "account": "18792548321",
                "name": "187****8321",
                "token": "da8f89211cffb4c8aba72ef5ff28649b0e572f0a",
                "background": "background/bg_center5.jpg",
                "constellations": "巨蟹座"
            }
        }
    };

    //编辑账户信息，请求成功返回数据
    var jsonData =
        {
            "code": "SUCCESS",
            "data": {
                "user": {
                    "_id": "59e5be977d8df60301c20541",
                    "account": "12345678910",
                    "name": "吕绿绿",
                    "token": "46b08f7ba1304615af513205bc00ace53561997d",
                    "background": "https://unsplash.it/1080/720?image=191",
                    "city": "放假奥斯卡的风景按时",
                    "gender": "man",
                    "avatar": "/file/img/fa3ca0ff26d429c2fa22204552da2559"
                }
            }
        };
});