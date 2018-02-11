$Ael(window,'load',function(){
    function checkMobileCode(){
        if(!(/^1[34578][0-9]{9}$/.test($Id('phone').value))){
            $Id('phone').value = '手机号码有误，请重填。';
            turnInfo($Id('phone'));
            return false;
        }
        else {
            if($Id('code').value == ''){
                ajaxXHR('get',url+'captcha?type=reset&phone='+$Id('phone').value,function(data){
                    //后台进行提交数据再次验证
                    switch(data.code) {
                        case "param_incomplete":
                            alert(data.message);
                            $Id('code').value = '';
                            break;
                        case "account_has_registered":
                            alert(data.message);
                            $Id('code').value = '';
                            break;
                        case "phone_format_error":
                            alert(data.message);
                            $Id('code').value = '';
                            break;
                        case "param_type_error":
                            alert(data.message);
                            $Id('code').value = '';
                            break;
                        default :
                            alert(data.message);
                            $Id('code').value = data.captcha;
                    }
                });
            }
            return true;
        }
    }
    $Ael($Id('btn'),'click',function () {

        //增加前端表单验证（封装验证函数，classList使用）
        checkMobileCode();
    });
    $Ael($Id('btn_submit'),'click',function () {

        //增加前端表单验证（封装验证函数，classList使用）

        if(localStorage.token != ''){
            ajaxXHR('post',url+'account/reset',function(data){
                //后台进行提交数据再次验证操作
            },'password='+$Id('pwd').value+'&token='+localStorage.token+'&captcha='+$Id('code').value);
        }
        else {
            ajaxXHR('post',url+'account/reset',function(data){
                //后台进行提交数据再次验证操作
            },'password='+$Id('pwd').value+'&captcha='+$Id('code').value+'&phone'+$Id('phone').value);
        }

    });
});