var uploadFile;
var formData = new FormData();

$Id('icon').src = urlStatic+localStorage.token;
$Id('name').innerHTML = localStorage.name;

$Ael( $Id('file_img'),'change',function(){
    var file = this.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (e) {//该事件在读取操作完成时触发。
        $Id('picture').appendChild($Id('camera'));
        // $Id('picture').removeChild($Id('center'));
        $Id('camera').setAttribute('src',e.target.result);                                                
        $Id('camera').classList.add('show');                    
        $Id('foot').style.display = 'block';    
    };
    fileReader.readAsDataURL(file);
    uploadFile = file;
    formData.append('pic',uploadFile);
});
$Ael($Id('w_article'),'click',function(){
    if($Id('_title').value == '' || $Id('talk').value == '' || uploadFile == null){
        alert("请完善发布内容！");
    }
    else {
        formData.append('token',localStorage.token);
        formData.append('title',$Id('_title').value);
        formData.append('body',$Id('talk').value);            
        ajaxFile('post',url+'posts/add',function(data){
            switch(data.code){
                case "param_incomplete":
                console.log(data.message);
                break;
                case "article_has_exist":
                console.log(data.message);
                break;
                case "account_token_invalid":
                console.log(data.message);
                break;
                default:
                alert(data.message);
                window.open('personal.html');
            }
        },formData);
        /*'token='+localStorage.token+'&title='+$Id('_title').value+'&pic='+'pic/94bc1287b14813ce48839554c87e95f7'+'&body='+_content.value*/
    }
});
    