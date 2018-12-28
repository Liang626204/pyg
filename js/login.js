$(function () {


    // var user = {
    //     username: $(".phone").val(),
    //     password: $(".password").val()
    // }
    // console.log(user)
    /* 点击登录 */


    $(".log_in").on("tap", function () {
        //alert()
        /* 用户数据 */
        var username = $(".phone").val()
        var password = $(".password").val()
        var user = {
            username: username,
            password: password
        }


        $.ajax({
            type: "post",
            url: "http://api.pyg.ak48.xyz/api/public/v1/login",
            data: user,
            dataType: "json",
            success: function (response) {
                console.log(response)
                if (response.meta.status == 200) {
                    alert(response.meta.msg)
                    /*获取token值 */
                    var tk = response.data.token;
                    console.log(tk)
                    /*将token值存在本地 */
                    localStorage.setItem("token", tk)
                    /* 获取原来存在本地的原来地址，没有就跳到首页 */
                    var topage = localStorage.getItem("pageurl")
                    if (topage) {
                         location.href = topage
                    } else {
                        location.href = "../index.html"
                    }
                }else{
                    alert(response.meta.msg)
                    return;
                }

            }
        });
    })




    /* 注册 */
    $(".register").on("tap", function () {
        alert()
    })
})