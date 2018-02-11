$Ael(window,'load',function(){
    var btn_log = $Id('btn_click_log');
    var btn_reg = $Id('btn_click_reg');
    var reg = $Id('register');
    var log = $Id('login');
    var code = $Id('code');
    var phone = $Id('phone');
    var btn_submit = $Id('btn_submit');
    var pwd = $Id('pwd');
    var log_btn = $Id('log_btn');
    //登录注册按钮转换
    function clickTurn(obj1,obj2,obj3,obj4){
        $Ael(obj1,'click',function(){
            this.style.color = '#7F4A88';
            this.style.borderBottom = '2px solid #7F4A88';
            obj2.style.color = 'rgba(255,255,255,0.5)';
            obj2.style.borderBottom = 'none';
            obj3.style.display = 'block';
            obj4.style.display = 'none';
        });
    }
    clickTurn(btn_log,btn_reg,log,reg);
    clickTurn(btn_reg,btn_log,reg,log);
    
    function callbackCode(data){
        switch(data.code) {
            case "param_incomplete":
                alert(data.message);
                code.value = '';
                break;
            case "account_has_registered":
                alert(data.message);
                code.value = '';
                break;
            case "phone_format_error":
                alert(data.message);
                code.value = '';
                break;
            case "param_type_error":
                alert(data.message);
                code.value = '';
                break;
            default :
                alert(data.message);
                code.value = data.captcha;
        }
    }
    function callbackSubmit(data){
        switch(data.code) {
            case "param_incomplete":
                alert(data.message);
                document.forms[0].reset();
                break;
            case "phone_format_error":
                alert(data.message);
                document.forms[0].reset();
                break;
            case "account_has_registered":
                alert(data.message);
                document.forms[0].reset();
                break;
            case "sms_captcha_fail":
                alert(data.message);
                document.forms[0].reset();
                break;
            case "sms_captcha_overdue":
                alert(data.message);
                document.forms[0].reset();
                break;
            default :
                var account = data["data"]["user"]["account"];
                reg.style.display = 'none';
                log.style.display = 'block';
                alert("恭喜你，注册成功！您的登录账号为：" + account + "。请牢记！");
        }
    }
    function callbackLog(data){
        switch(data.code){
            case "param_incomplete":
                alert(data.message);
                break;
            case "account_password_error":
                alert(data.message);
                break;
            default :
                localStorage.avatar = data.data.user.avatar;
                localStorage.account = data.data.user.account;
                localStorage.name = data.data.user.name;
                localStorage.token = data.data.user.token;
                localStorage.background = data.data.user.background;
                localStorage.constellations = data.data.user.constellations;
                // localStorage.city = data.data.user.city;
                // localStorage.gender = data.data.user.gender;
                localStorage._id = data.data.user._id;
                console.log('登录成功');
                //id:18829208856 pwd:123321
                window.location.href = '/apis悦读/userSet.html';
        }
    }
    function checkMobile(){
        if(!(/^1[34578][0-9]{9}$/.test(phone.value))){
            phone.value = '手机号码有误，请重填。';
            turnInfo(phone);
            return false;
        }
        else {
            if(code.value == ''){
                ajaxXHR('get',url+'captcha?type=register&phone='+phone.value,callbackCode);
            }
            return true;
        }
    }
    function checkPwd(){
        var pattern = /^(\w){6,32}$/;
        //    6-32个字母下划线或数字
        var strPwd = $Id('pwd');
        if(!pattern.test(strPwd.value)){
            // alert('密码设置有误，请重新输入。');
            strPwd.value = '密码设置有误，请重新输入。';
            strPwd.type = 'text';
            strPwd.onfocus = function(){
                if(!pattern.test(this.value)){
                    this.value = '';
                    this.style.color = '#FFFFFF';
                    this.type = 'password';
                }
            };
            strPwd.style.color = 'red';
            return false;
        }
        return true;
    }
    function pwdEqual(){
        var strPwd = $Id('pwd');
        var strPwdR = $Id('pwd_r');
        if(strPwd.value != strPwdR.value){
            pwdErrorShow(strPwd);
            pwdErrorShow(strPwdR);
            return false;
        }
        else {
            return true;
        }
    }
    $Ael($Id('btn'),'click',function(){
        checkMobile();
    });
    $Ael($Id('pwd_r'),'focus',checkPwd,false);
    $Ael(btn_submit,'click',function(){
        var inputVal = $Qsa('input');
        for(var i = 0; i < inputVal.length;i++){
            if(inputVal[i].value != ''){
                if((inputVal[i].id == 'pwd_r') && checkMobile() && checkPwd() && pwdEqual()){
                    btn_submit.disabled = 'false';
                    btn_submit.style.opacity = '1.0';
                    ajaxXHR('post',url+'account/register',callbackSubmit,'account='+phone.value+'&password='+pwd.value+'&captcha='+code.value);
                    // document.forms[0].submit();
                    document.forms[1].reset();
                }
                else {
                    continue;
                }
            }
        }
    },false);
    $Ael(log_btn,'click',function(){
        var num = $Id('num');
        var pwd_log = $Id('pwd_log');
        if(!(/^1[34578][0-9]{9}$/.test(num.value))){
            //[3-9] | (3|4|5|7|8)
            //\d
            num.value = '请输入正确登录账号';
            turnInfo(num);
        } else if(!(/^(\w){6,32}$/.test(pwd_log.value))){
            pwd_log.value = '请输入正确密码';
            pwd_log.type = 'text';
            $Ael(pwd_log,'focus',function(){
                pwd_log.value = '';
                pwd_log.style.color = '#FFFFFF';
                pwd_log.type = 'password';
            });
            pwd_log.style.color = 'red';
        } else {
            ajaxXHR('post',url+'account/login',callbackLog,'account='+num.value+'&password='+pwd_log.value);
            // 以下代码先执行，回调函数后执行
            // document.forms[1].reset();
        }
    },false);
});