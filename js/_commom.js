$(function(){
    // 拦截器：只要你通过zepto来发送ajax请求，就一定会经过这个函数
    // 拦截器的本质就是一个处理函数


    // obj:就是我们发送请求时所传递的参数对象，里面包含如：data dataType url type success....
    // 意味着，我们在这个函数中可以对url进行处理--拼接处理
    // 定义基准路径
   // var baseUrl = 'http://api.pyg.ak48.xyz/api/public/v1/'
  // console.log(123)

    $.ajaxSettings.beforeSend = function () {
       // console.log(345)
        $(".Loading").show();

    }

    //   请求完成之后会自动触发的回调函数
    $.ajaxSettings.complete = function () {
      
        
      //  console.log(456)
        $(".Loading").hide();
    }


    /* jq拓展方法，在jq对象中加入方法 */
    
    $.extend($, {
        // 获取参数
        getUrldata: function () { //?cid=8&aa=bb&cc=dd
            var getData = location.search;
            //console.log(getDate)
            /* 截取？后面的数据 */
            var needData = getData.substring(1);
            /* 将字符串以&切成数组 */
            var dataarr = needData.split("&")
        
            var getobj = {}
            /* 再将数组以=分割 */
            for (var i = 0; i < dataarr.length; i++) {
                var rightdata = dataarr[i].split("=")
                getobj[rightdata[0]] = rightdata[1]
            }
            return getobj;
        },
    })



})