$(function () {



// mui中默认对a标签的href属性做了屏蔽，意味着a标签的href属性不会响应，如果需要响应则可以使用下面这种方式



    
    /* 放回上一页 */
    $(".mui-pull-left").on("tap", function () {
        // alert()
        history.go(-1)
    })


       /* 获取url传过来的id */
       var getUrldata = $.getUrldata()
       var goods_id = getUrldata.goods_id;
       console.log(getUrldata.goods_id)


 

    /*设置全局变量存储获取的数据 */
    // var goodsinfomation={} ;

    var goodsInfo={}
    /* 轮播图初始化 */
    var gallery = mui('.mui-slider');
    // var getdata = 
    $.ajax({
        type: "get",
        url: "http://api.pyg.ak48.xyz/api/public/v1/goods/detail",
        data: {
            goods_id: goods_id
        },
        dataType: "json",
        success: function (response) {
            goodsinfomation = response;
           //  console.log(response.data)
            if (response.meta.status === 200) {
                var rd = response.data;
                //console.log(13);
                var html = template('slider_temp', rd.pics)
                $("#mui_slider").html(html);
                gallery.slider({
                    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
                });
                /* 商品详情 */
                var html2 = template('goods_temp', rd)
                $(".goods_infos").html(html2);

                /* 商品名称 */
                var html3 = template('goodsname_temp', rd)
                $(".goods_info").html(html3);




                  /* 收集商品信息 */
                goodsInfo = {
                cat_id: response.data.cat_id,
                goods_id: response.data.goods_id,
                goods_name:response.data.goods_name,
                goods_number: response.data.goods_number,
                goods_price: response.data.goods_price,
                goods_small_logo: response.data.goods_small_logo,
                goods_weight: response.data.goods_weight,
                
            }
            console.log(goodsInfo)


            }
        }
    });


          
    /* 加入购物车操作 */

    $(".buy_btn").on('tap', function () {

                      /* 收集商品信息 */
/*                       var goodsInfo = {
                        cat_id: 11,
                        goods_id: 13830,
                        goods_name:"PPTV MAX1百吋激光影院 4000ANSI流明 超短焦投射比 纯正激光光源 1T大存储 激光影院电视",
                        goods_number: 100,
                        goods_price: 29999,
                        goods_small_logo: "http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000010036750375_1_400x400.jpg",
                        goods_weight: 100,
                    }
         */


        /* 需要的是json的字符串 */
        var infoJson = JSON.stringify(goodsInfo)
        //console.log(infoJson)

        /* 如果本地有token值就跳到购物车 */
        var tk = localStorage.getItem("token");
        console.log(tk)
        if (tk) {
            /*  
           $.post方式无法直接设置请求头，所以无法发送参数，jq  ajax中有封装xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
           $.post('../pages/cart.html',{info: goodsInfo},function(result){
               console.log(result)
               location.href='../pages/cart.html'
           })
           */

           console.log("有tk")
            $.ajax({
                type: "post",
                url: "http://api.pyg.ak48.xyz/api/public/v1/my/cart/add",
                data: { info: infoJson },
                dataType: "json",
                /* token传递需要请求头，要设置请求头的格式 */
                headers: { "Authorization": tk },
                success: function (response) {
                    console.log(response)
                    /* 为 null  */
                    if (response) {
                        alert(response.meta.msg)
                    } else {
                        alert(response.meta.msg)
                    }
                   // location.href='../pages/cart.html'

                }
            });


        } else {
            /* 没有登录，跳到登录页面并保存此页面，用于登录成功后跳转 */
            /* 收集本页的url */
            var pageurl = location.href;
            console.log(pageurl)
            /* 将本页的地址存进本地 */
            localStorage.setItem("pageurl", pageurl);
            location.href = '../pages/login.html'
        }
    })
})