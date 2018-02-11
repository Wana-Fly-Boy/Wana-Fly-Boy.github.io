function lazyLoad(){
    //获取所有image,image中的data-src属性已经有值，且值为请求到的图片真实地址，所以需要在页面加载时获取所有图片的值，并将其赋给自定义属性
    var imgs = $Class('cover');
    
    //循环所有图片
    for(var i = 0; i < imgs.length; i++){
        var img = imgs[i];
        if(img.dataset.src === '') return;

        if(img.getBoudingClientRect().top + img.offsetHeight < document.documentElement.clientHeight){
            //当图片出现在视屏中，请求该图片
            var templateImage = new Image();
            templateImage.onload = function(){
                img.src = templateImage.src;
            };

            //通过dataset获取图片的真实地址
            templateImage.src = img.dataset.src;
            
            //清空自定义数据，之后在执行函数时避免重复请求
            img.dataset.src='';
        }
    }
}
function preLoadImg(){
    var imgc = $Class('cover');
    var imgs = Array.prototype.slice.call(imgc);
    
    //伪数组转换为数组的实现原理
    // Array.prototype.slice = function(start,end){
    //     var result = new Array();
    //     var start = 0 || start;
    //     var end = this.length || end;
    //     for(var i = start; i < end; i++){
    //         result.push(this[i]);
    //     }
    //     return result;
    // };
    
    imgs.forEach(img => {
        var templateImage = new Image();
        //预加载图片
        templateImage.src = img.dataset.src;
        //加载成功
        templateImage.onload = function(){
            img.src = templateImage.src;
        }
        //加载失败
        templateImage.onerror = function(){
            var errorImage = './images/404.jpeg';//此处为错误图片地址
            img.src = errorImage;
        }
    });    
}

// function preLoadImg(img,id){
//     var templateImage = new Image();
//     //预加载图片
//     templateImage.src = url+img;
//     //加载成功
//     templateImage.onload = function(){
//         $Id(id).src = templateImage.src;
//     }
//     //加载失败
//     templateImage.onerror = function(){
//         var error = '../images/icon_loading.png';//此处为错误图片地址
//         $Id(id).src = error;
//     }
// }