<div>
//级联-图片上传-file美化
	<select name="" id="sel_sex">
			<option value="1">男</option>
			<option value="2">女</option>
			<option value="3">未知</option>
	</select>
	<select>
			
	</select>
	<input type="file" id="file_img"></input>
</div>
<div id="div_img">
	
</div>
```

		<script>
		document.getElementById('sel_sex').onchange = function(){
			console.log();
			if(){
				
			}
		}
		
			doucment.getElementById('file_img').onchange = function(){
				var file = this.files[0];
				var img_reader= new FileReader();
				img_reader.onload = function(e){
					//event.target当前事件的目标节点
					console.log(e.target);
					//document.getElementById('div_img').innerHTML = '<img src="'e.target.result+'"+width="50px" height="50px"';
					var img = document.createElement("img");
					img.src = e.target.result;
					document.getElementById("div_img").appendChild(img);
				}
				img_reader.readAsDataURL(file);//二进制大文件blob
			}
		</script>
```


/*
//  本地允许写入cookie
//  安全性验证
//  用户凭据已写入


// 省、市、区级联

//  刷新页面直接显示，传递一个省的id，默认显示该省。没有选择显示“请选择”。

// 用户设置页面右上角的动态显示，登录状态会显示基本信息，未登录会显示登录，注册


str = '<option>请选择</option>';
// $Id('province').innerHTML = str;
// $Id('province').insertAdjacentElement('afterbegin',str);


// 动态绑定三种方法

//自定义属性 ->  data-自定义属性名称

// var id = this.selectOptions[0].dataset.id;



   监听鼠标滚动事件  
                     1.火狐的是：DOMMouseScroll;  
                     2.IE/Opera/Chrome：直接添加事件  
                    if($Ael){
                    $Ael('DOMMouseScroll',scrollFunc,false);
                }
                window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome

                
                var scrollFunc = function(e){
                    e = e || window.event;
                    if(e.wheelDelta){//IE/Opera/Chrome  
                        //自定义事件：编写具体的实现逻辑  
                        mouseScroll();  
                    }else if(e.detail){//Firefox  
                        //自定义事件：编写具体的实现逻辑  
                        mouseScroll();  
                    }  
                };

    // 退出登录，token清空
    // window.onload页面加载，只能有一个  什么时候加载？
    
        // user参数返回指定文章，在个人中心使用改接口
        //字符串拼接分层
        //任何字段数据都有判断的必要
        //时间戳：1970年到现在的总毫秒数，前台可以根据用户需求显示
        //github moment.js
        //bootcdn 引网络资源包
        //loading.gif

        //监听滚动条
        
        // window.addEventListener('scroll',lazyLoad());
        // 监听只执行一次

        // window.addEventListener('scroll',lazyLoad);
        //每次监听都会触发



        //截流，定义时间戳，进行判断，两个时间间隔。去抖。
        //不用全局变量实现


            //节流：有效最少发出一次请求 （两个时间之间）
            //去抖：延时处理请求

            //github,lodash.js,._throttle,_.debounce

        //    window.addEventListener('scorll',_.throttle(lazyLoad, 1000));
        
        
        //闭包解决全局变量的问题
       
         function lazyload(){
             var page = 1;
             return function(){
                 page++;
             }
         }  