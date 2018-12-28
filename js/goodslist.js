$(function () {


	       // mui中默认对a标签的href属性做了屏蔽，意味着a标签的href属性不会响应，如果需要响应则可以使用下面这种方式


	mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });

	// mui('.mui-off-canvas-wrap').offCanvas("show");
	//mui('.mui-off-canvas-wrap').offCanvas().hide();
	/* 滚动 */
	mui('.mui-scroll-wrapper').scroll({
		indicators: false
	});
	$(".mui-pull-right").on('tap', function () {
		mui('.mui-off-canvas-wrap').offCanvas('toggle');
	})

	$(".mui-pull-left").on("tap", function () {
		// alert()
		history.go(-1);
	})
  


	/* 获取传过来的id */
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
	console.log(getobj)






	/* ajax请求数据 */
	var data = {
		query: '',
		cid: getobj.id,
		pagenum: 0,
		pagesize: 10
	}

	var dataReturn







	/* 异步获取数据 */
	function getajax(abc) {
		$.ajax({
			type: "get",
			url: "http://api.pyg.ak48.xyz/api/public/v1/goods/search",
			data: data,
			dataType: "json",
			success: function (response) {
				var dataReturn = response.data.goods;
				abc(dataReturn);
				console.log("huoqu")
			}
		});
	}




	/* 异步数据处理 */

	function redata(dataReturn) {
		var html = template('list_info', dataReturn);
		$(".list_content").html(html);
	}
	getajax(redata);







	/* 数据处理 */
	mui.init({
		//mui-scroll-wrapper

		pullRefresh: {
			container: "#moveup",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
			/* 上拉加载更多 */
			up: {
				height: 50,//可选.默认50.触发上拉加载拖动距离
				auto: true,//可选,默认false.自动上拉加载一次
				contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: function () {
					//console.log("上拉")
					/* 上拉的时候在列表的后面增加列表内容 */

					//alert();
					data.pagenum++;
					/* 加载更多 */
					function loaddata(dataReturn) {
						if (dataReturn.length > 0) {
							var html = template('list_info', dataReturn);
							$(".list_content").append(html);
							mui('#moveup').pullRefresh().endPullupToRefresh();
						} else {
							mui('#moveup').pullRefresh().endPullupToRefresh(true);
							console.log("没了")
						}


					}
					getajax(loaddata);

					/* 重复的加载触发 */

				}//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			},
			down: {
				height: 50,//可选,默认50.触发下拉刷新拖动距离,
				auto: false,//可选,默认false.首次加载自动下拉刷新一次
				contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				callback: function () {
					//console.log(123)
					/* 重置开始页面 */
					data.pagenum = 1;
					function resetdata(dataReturn) {
						var html = template('list_info', dataReturn);
						$(".list_content").html(html);
						//console.log("chuli")
					}
					getajax(resetdata)

					// 结束本次的下拉刷新
					mui('#moveup').pullRefresh().endPulldownToRefresh();
					// 重置上拉加载功能：否则有可能不能再继续使用上拉加载的功能了
					mui('#moveup').pullRefresh().refresh(true);
				} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}
		}
	});


	/* 显示搜索历史 */
	get_his();

	function get_his(){
		var his_arr = localStorage.getItem('his_data');
		console.log(his_arr)
		var his_aaa = JSON.parse(his_arr)
		console.log(his_aaa)
		if(his_aaa){
			var his_str="";
			for (var i = 0; i < his_aaa.length; i++) {
				his_str += "<li><a href='javascript:'>" + his_aaa[i] + "</a></li>";
				
			}
			console.log(his_str)
			$(".his_list ul").html(his_str)
		}else{
			$(".his_list ul").html('<li><a href="javascript:">' + '无搜索历史' + '</a></li>')
		}
	}


	/* 清空搜索 */
	$(".his_list button").on("tap",function () {
		localStorage.removeItem('his_data');
		$(".his_list ul").html('<li><a href="javascript:">' + '无搜索历史' + '</a></li>')

	  })




	/* 侧边栏搜索功能 */
	$(".search_btn").on("tap", function () {
		// alert()
		var insert = $("input").val();
		//console.log(insert)

		/* 展开运算符 */
		var newobj = { ...data }
		newobj.query = insert,
			newobj.pagenum = 0,
			newobj.pagesize = 1000
		//console.log(newobj);
		$.ajax({
			type: "get",
			url: "http://api.pyg.ak48.xyz/api/public/v1/goods/search",
			data: newobj,
			dataType: "json",
			success: function (response) {
				var dataReturn = response.data.goods;
				var html = template('search_info', dataReturn);
				$(".his_content").html(html);
			}
		});

		/* 搜索历史处理 */

		if (insert.trim() == "") {
			return;
		} else {
			/* 存进本地 */
			var txt = insert.trim();
			console.log(txt)
			/* 判断本地存储是否有该搜索数据 */
			var his_arr = localStorage.getItem('his_data');
			var his_arr = his_arr ? JSON.parse(his_arr) : [];
			/*数据渲染 */

			//	console.log("历史为空")
				//$(".his_list ul").html('<li><a href="javascript:">' + '无搜索历史' + '</a></li>')
				
				
				/* 将历史记录存进本地 */
				/* 遍历数据看是否有重复 */
				for (var i = 0; i < his_arr.length; i++) {
					if (his_arr[i] == txt) {
						/* 删除上一个 */
						his_arr.split(i, 1)
						break;
					}
				}
			/* 将新输入的数据添加到前面 */
			his_arr.unshift(txt);
			
			/* 输出拼接字符串 */
			var his_str="";
			for (var i = 0; i < his_arr.length; i++) {
				his_str += "<li><a href='javascript:'>" + his_arr[i] + "</a></li>";
				
			}
			$(".his_list ul").html(his_str)
			localStorage.setItem("his_data", JSON.stringify(his_arr))

			



			// $(".his_list ul").prepend('<li><a href="javascript:">' + insert + '</a></li>')

		}
	})



	/* 点击搜索历史搜索内容 */
	$(".his_list ul").on("tap","a",function(){
		//alert(1231)
		/*将搜索历史放进输入框 */
		 $("input").val($(this).text())
		//console.log($(this).text())

		var newobj = { ...data }
		newobj.query = $(this).text(),
		newobj.pagenum = 0,
		newobj.pagesize = 1000


		$.ajax({
			type: "get",
			url: "http://api.pyg.ak48.xyz/api/public/v1/goods/search",
			data: newobj,
			dataType: "json",
			success: function (response) {
				var dataReturn = response.data.goods;
				var html = template('search_info', dataReturn);
				$(".his_content").html(html);
			}
		});


	})

	/* 点击列表 */
	$(".list_content").on("tap","a",function(){
		//alert()
	})




})

