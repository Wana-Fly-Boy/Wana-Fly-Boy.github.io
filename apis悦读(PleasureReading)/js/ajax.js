/*
* 原生AJAX封装函数
* @param{string} method http请求方式(如'GET','POST')
* @param{string} url 请求接口地址
* @param{function} cb 请求成功后执行函数
* @param{string} params 'POST'请求时传递参数
* */
function ajaxXHR(method,url,cb,params){
    if(window.XMLHttpRequest){
        var ajax = new XMLHttpRequest();//E7+、Firefox、chrome、Safari以及Opera
    }else {
        var ajax = new ActiveXObject('Microsoft.XMLHTTP');//IE6浏览器创建ajax对象
    }   
    // ajax.open(method,url,true);  
    ajax.withCredentials = true;//设置该属性后调用接口才会弹框提示授权
    ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置请求头类型，post请求时必须设置
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){//请求已完成，且响应已就绪
            if(ajax.status == 200){
                console.log(ajax.responseText);
                var objData = JSON.parse(ajax.responseText);//将JSON字符串转化为JSON对象
                cb(objData);//成功的时候调用这个方法
            }else{
                //异常处理
            }
        }
    };
    ajax.send(params);//发送请求
}
/*
* 原生AJAX封装函数
* @param{string} method http请求方式(如'GET','POST')
* @param{string} url 请求接口地址
* @param{function} cb 请求成功后执行函数
* @param{string} params 'POST'请求时传递参数
* */

//FormData封装数据请求方式
function ajaxFile(method,url,cb,params){
    if(window.XMLHttpRequest){
        var ajax = new XMLHttpRequest();//E7+、Firefox、chrome、Safari以及Opera
    }else {
        var ajax = new ActiveXObject('Microsoft.XMLHTTP');//IE6浏览器创建ajax对象
    }
    // ajax.open(method,url,true);
    ajax.withCredentials = true;//设置该属性后调用接口才会弹框提示授权
    // ajax.setRequestHeader('Content-Type',type);//设置请求头类型，post请求时必须设置，文件传输请求头
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){//请求已完成，且响应已就绪
            if(ajax.status == 200){
                console.log(ajax.responseText);
                var objData = JSON.parse(ajax.responseText);//将JSON字符串转化为JSON对象
                cb(objData);//成功的时候调用这个方法
            }else{
                //异常处理
            }
        }
    };
    ajax.send(params);//发送请求
}