$(function () {

    var gallery = mui('.mui-slider');
   

    /* 輪播圖数据 */
    $.ajax({
        type: "get",
        url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
        // data: "data",
       dataType: "json",
        success: function (response) {
            //console.log(response);
            if (response.meta.status === 200) {
                //console.log(13);
                var html = template('slider_temp',response.data)
               // console.log(response.data)
                //console.log(html);
                $("#mui_slider").html(html);
                gallery.slider({
                    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        }
    });

    /* 分類導航 */
    $.get('http://api.pyg.ak48.xyz/api/public/v1/home/catitems',function(response){
        if (response.meta.status === 200) {
            //console.log(13);
            var html = template('nav_temp',response.data)
           // console.log(response.data)
            //console.log(html);
            $(".nav").html(html);
        }
    })   




    $.get('http://api.pyg.ak48.xyz/api/public/v1/home/goodslist',function(response){
        if (response.meta.status === 200) {
            //console.log(13);
            var html = template('goods_temp',response.data)
           console.log(response.data)
            //console.log(html);
            $(".content").html(html);
            console.log(html)
        }
    })   
})