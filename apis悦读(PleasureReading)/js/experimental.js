        //省、市、区三级级联接口调用   (select对象直接使用selectIndex获取索引)
        ajaxXHR('get','https://dev.apis.sh/P7tGsGhy@/city/province',callbackProvince);
        function callbackProvince(data) {
            if (data.code == 'SUCCESS') {
                var str = '';
                var arrProvince = data["data"]["province"];
                for (var i = 0; i < arrProvince.length; i++) {
                    str += '<option value="' + arrProvince[i].ProID + '">' + arrProvince[i].name + '</option>';
                }
                $Id('select_province').innerHTML = str;
                $Id('select_province').onchange = function () {
                    selectProvince = $Id('select_province').options[this.selectedIndex].value;
                    ajaxXHR('get', 'https://dev.apis.sh/P7tGsGhy@/city/city?ProID=' + selectProvince, function (data) {
                        //回调函数的执行顺序会影响列表获取结果，先执行回调后执行或许代码，这样会影响逻辑。所以一般会将数据操作都放到回调函数中
                        switch (data.code) {
                            case "param_error":
                                alert(data.message);
                                break;
                            case "param_incomplete":
                                alert(data.message);
                                break;
                            default :
                                var arrayVal = [];
                                var strHtml = '';
                                // var selectCity;
                                var obj = new Object();
                                for (var j = 0; j < data["data"]["city"].length; j++) {
                                    arrayVal.push(data["data"]["city"][j].name);
                                }
                                obj['"' + selectProvince + '"'] = arrayVal;
                                // selectCity = obj['"'+selectProvince+'"'];
                                for (var index = 0; index < arrayVal.length; index++) {
                                    for (var i = 0; i < data["data"]["city"].length; i++) {
                                        if (arrayVal[index] == data["data"]["city"][i].name) {
                                            strHtml += '<option value="' + data["data"]["city"][i].CityID + '">' + data["data"]["city"][i].name + '</option>';
                                        }
                                    }
                                }
                                $Id('select_city').innerHTML = strHtml;
                                $Id('select_city').onchange = function () {
                                    var _selectCity = $Id('select_city').options[this.selectedIndex].value;
                                    ajaxXHR('get', 'https://dev.apis.sh/P7tGsGhy@/city/area?CityID=' + _selectCity, function (data) {
                                        switch (data.code) {
                                            case "param_error":
                                                alert(data.message);
                                                break;
                                            case "param_incomplete":
                                                alert(data.message);
                                                break;
                                            default :
                                                var areaArr = [];
                                                var areaHtml = '';
                                                // var selectArea;
                                                var areaObj = new Object();
                                                for (var j = 0; j < data["data"]["area"].length; j++) {
                                                    areaArr.push(data["data"]["area"][j].DisName);
                                                }
                                                areaObj['"' + _selectCity + '"'] = areaArr;
                                                // selectArea = areaObj['"'+_selectCity+'"'];
                                                for (var index = 0; index < areaArr.length; index++) {
                                                    areaHtml += '<option>' + areaArr[index] + '</option';
                                                }
                                                $Id('select_area').innerHTML = areaHtml;
                                        }
                                    });
                                };
                        }
                    });
                };
            }
        }

  //省、市、区三级级联精简版调用接口(
    //   看似比较完美，但是当把绑定的onchange事件，改为事件监听change事件，由于嵌套的缘故，
    // province下拉结束change改变后，此时下拉city，会一直执行province的change事件，一直请求city数据。直到循环结束。area也是如此，问题依然不能解决。
//   )
//避免以后犯错，在嵌套的结构中尽量不要使用事件监听处理。
        // ajaxXHR('get',url+'city/province',function(data){
        //     if(data.code == 'SUCCESS') {
        //         for (var i = 0; i < data["data"]["province"].length; i++) {
        //             $Id('select_province').options.add(new Option(data["data"]["province"][i].name, data["data"]["province"][i].ProID));
        //             $Ael($Id('select_province'),'change',function () {
        //                 var _selectProvince = $Id('select_province').options[this.selectedIndex].value;
        //                 ajaxXHR('get', url+'city/city?ProID=' + _selectProvince, function (data) {
        //                     switch (data.code) {
        //                         case "param_error":
        //                             alert(data.message);
        //                             break;
        //                         case "param_incomplete":
        //                             alert(data.message);
        //                             break;
        //                         default :
        //                             for (var i = 0; i < data["data"]["city"].length; i++) {
        //                                 $Id('select_city').options.add(new Option(data["data"]["city"][i].name, data["data"]["city"][i].CityID));
        //                                 $Id('select_city').onchange = function () {
        //                                     //监听触发，会在下拉框拉下的时候，一直触发
        //                                     var _selectCity = $Id('select_city').options[this.selectedIndex].value;
        //                                     ajaxXHR('get', url+'city/area?CityID=' + _selectCity, function (data) {
        //                                         switch (data.code) {
        //                                             case "param_error":
        //                                                 alert(data.message);
        //                                                 break;
        //                                             case "param_incomplete":
        //                                                 alert(data.message);
        //                                                 break;
        //                                             default :
        //                                                 for (var i = 0; i < data["data"]["area"].length; i++) {
        //                                                     $Id('select_area').options.add(new Option(data["data"]["area"][i].DisName,data["data"]["area"][i].Id-1));
        //                                                 }    
        //                                                 arrPlace = ['['+$Id('select_province').options[$Id('select_province').selectedIndex].value,
        //                                                 $Id('select_city').options[$Id('select_city').selectedIndex].value,
        //                                                 $Id('select_area').options[$Id('select_city').selectedIndex].value+']'];
        //                                             }
        //                                     });
        //                                 };
        //                             }
        //                     }
        //                 });
        //             });
        //         }
        //     }
        // });