$(function () {
    //alert()
    /* 定义全局变量 */
    var datas;
    var myScroll;
    

    /* 判断本地是否储存有数据、是否使用本地的数据 */
    var localdata = localStorage.getItem('localData');
    // console.log(localdata)
    /* 如果本地储存有数据就用本地的数据 */
    var thistime = Date.now()
    if(localdata){
        localdata_ele = JSON.parse(localdata)
        var timer = thistime-localdata_ele.timeStart
        //console.log(timer);
        if(timer<10000){

            console.log(localdata_ele)
            datas=localdata_ele.datas;
            left_info()
            right_info(0)
        }else{
            localStorage.clear();
            aj()
        }
      
    }else{
        aj()
    }


  
    // aj();


    /* 列表栏 */
    function aj(){
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/categories",
            dataType: "json",
            success: function (response) {
                if (response.meta.status === 200) {
                    // console.log(response)
                     datas = response.data
                    /* 左边数据 */
                     left_info()
    
    
                    //     /* 滚动插件左边初始化 */
                     myScroll = new IScroll('#wrapper');
                    // 
                   // console.log(datas[0].children)
                   /* 生成第一次右边结构 */
                    right_info(0)
    
    
                     /* 本地存储 */
            /* 将获取的数据储存在本地  并设定一定的时间清除 */
            /* 获取设置的时间 */
            var timeStart = Date.now();
            // console.log(timeStart);
            /* 将获取的数据和时间 */
              /* localStorage本地储数据一定为字符串，所以要用json转换成字符串格式 */      
                localStorage.setItem('localData',JSON.stringify({timeStart:timeStart,datas:datas}))
                    //console.log(localData)
              //  var localDataStr = localStorage.getItem('localData')
               // console.log(localDataStr)
                }
            }
        });
    }



    /* 获取左边的内容封装 */
     function left_info(){

       var html = template('lists', datas);
        $(".lists").html(html)
     }




    /* 获取右边内容的封装函数 */
    function right_info(index){
        var con_html = template('con_info', datas[index].children);
                $(".right").html(con_html)
                /* 由于图片的加载问题，生成结构，而图片没有加载完成造成文档的高度较
                图片加载完成时候的低，使得滚动不能完全 */
                /* 只有当图片完全加载完成之后才进行滚动初始化，才能滚动完全 */
                /* 计算图片的总数 */
                var imgall = $("img").length
                //console.log(imgall);
                /* 图片加载事件 */
                $(".right img").on('load',function(){
                    //console.log(imgall--)
                   imgall--;
                    /* 当图片加载完成进行滚动初始化 */
                    if(imgall==1){
                         //     /* 滚动右边初始化 */
                         $(".Loading").hide();
                 var right_myScroll = new IScroll('#right_wrapper');
                    }

                })
             
    }




    /* 点击获取索引，和样式,和相应的内容 */
    $(".lists").on("click", "li", function () {
        // alert()
        /* jq已经封装好获取索引 */
        //console.log($(this).index());
        $(this).addClass("ative").siblings().removeClass("ative");
        //    $(this).sibings
        /* 生成右边的对应结构 */
        right_info($(this).index())
        /* 点击侧边栏使选项顶置 */
        myScroll.scrollToElement(this)
    })








})