/*
* author:lxl
* version: 2.0;
* v1.0 createDate:20170712;
* v2.0 createDate:20171020;
* good good study,day day up!
*
* */
$(function (){
    //登录
    window.roleInfo = {
        name:"",//用户名
        userId:"",//用户id
        roleImg:"",//用户头像
        token:"",//用户登录的token
        role:"sbu",//用户角色
        roleCode:"GCC",//角色code
        // url1:"http://service.giant.com.cn:8080/",
        // url2:"http://service.giant.com.cn:8080/",
        url1:"http://192.168.9.13:8080/",
        url2:"http://192.168.9.21:8080/",
        showList:[]
    };
	$.fn.isSign = function (){
		window.roleInfo.token = $.fn.getCookie("access_token");//获取token
        window.roleInfo.role = $.fn.getCookie("role");//获取角色
        window.roleInfo.roleCode = $.fn.getCookie("role_code");//获取角色code
        window.roleInfo.showList = $.fn.getCookie("showList");//获取菜单显示列表
        if(window.roleInfo.token){
            $.ajax({
                url:"http://120.55.162.30/sso/sso/check.do",
                dataType:"json",
                data:{"token":window.roleInfo.token},
                async:false,
                timeout:"20000",
                success:function (data){
                    if(data._status == true){//判断该用户已登录
                        window.roleInfo.role = data._user.role;//模拟数据
                        window.roleInfo.roleCode = data._user.role_code;//模拟数据
                        window.roleInfo.name = data._user.username;//用户名
                        window.roleInfo.userId = data._user.id;//用户id
                        window.roleInfo.roleImg = data._user.userImg;//用户头像
                        setRoleInfo(window.roleInfo.name,window.roleInfo.roleImg,window.roleInfo.role,window.roleInfo.showList);//设置用户显示
                    }else{//未登录则跳转捷安特官网
                        alert("请重新登录!");
                        //window.location.href = "http://www.giant.com.cn/front/loginout";
					}
                },
                error:function (){
					alert("载入失败!请重新刷新网页!");
                }
            });
        }else{
            $.fn.setCookie("access_token","2553fbec-d7bf-45cd-ae93-533a9f4613db");//gck角色
            //未获取到token
            //alert("请重新登录结案特官网!");
            //window.location.href = "http://www.giant.com.cn";
        }
        //设置用户显示
        function setRoleInfo(name,img,role,showList){
            if(img){
                //右上角
                $(".user-content .imgBox").css({
                    "background":"url("+img+")",
                    "backgroundSize":"100%"
                });
                //左上角信息显示
                $(".user-img-circle .img-outside").css({
                    "background":"url("+img+")",
                    "backgroundSize":"100%"
                });
            }
            //右上角名字
            name = name.length > 5 ? name.slice(0,5)+".." : name;
            $(".user-manage .user-content span").text(name);
            var roleName = "";
            switch (role){
                case "admin":{
                    roleName = "总公司";
                    //setMenuList(showList);
                    break;
                }
                case "sbu":{
                    roleName = "SBU";
					$(".nav-slide-menu .nav-list").eq(1).children(".child-slide-menu").children("li").eq(0).hide();
                    break;
                }
                case "dealer":{
                    roleName = "经销商";
					$(".nav-slide-menu .nav-list").eq(1).children(".child-slide-menu").children("li").eq(0).hide();
                    break;
                }
                case "storeManager":{
                    roleName = "门店";
					$(".nav-slide-menu .nav-list").eq(1).children(".child-slide-menu").children("li").eq(0).hide();
                    break;
                }
            }
            $(".user-info .user-welcome p:first-of-type").text(roleName);
            $(".user-info .user-welcome p:last-of-type").text(name);
            function setMenuList(showList){
				showList = decodeURI(showList);
				showList = showList.replace(/\\/g,"");
				showList = showList.substring(1,showList.length-1);
				showList = JSON.parse(showList);
                function setSmallShow(isShow,ele){
                    isShow == "1" ? ele.show() : ele.hide();
                }
                if(showList){
                    //控制产品列表显示
                    setSmallShow(showList[0].product.productList,$(".nav-slide-menu .nav-list").eq(1).children(".child-slide-menu").children("li").eq(0));
                    setSmallShow(showList[0].product.productData,$(".nav-slide-menu .nav-list").eq(1).children(".child-slide-menu").children("li").eq(1));
                    setSmallShow(showList[0].product.areaData,$(".nav-slide-menu .nav-list").eq(1).children(".child-slide-menu").children("li").eq(2));
                    if(showList[0].product.productList == "1" || showList[0].product.productData == "1" || showList[0].product.areaData == "1"){
                        $(".nav-slide-menu .nav-list").eq(1).show();
                    }else{
                        $(".nav-slide-menu .nav-list").eq(1).hide();
                    }
                    //控制会员列表显示
                    setSmallShow(showList[1].vip.vipList,$(".nav-slide-menu .nav-list").eq(2).children(".child-slide-menu").children("li").eq(0));
                    setSmallShow(showList[1].vip.vipFrom,$(".nav-slide-menu .nav-list").eq(2).children(".child-slide-menu").children("li").eq(1));
                    setSmallShow(showList[1].vip.vipChange,$(".nav-slide-menu .nav-list").eq(2).children(".child-slide-menu").children("li").eq(2));
                    if(showList[1].vip.vipList == "1" || showList[1].vip.vipFrom == "1" || showList[1].vip.vipChange == "1"){
                        $(".nav-slide-menu .nav-list").eq(2).show();
                    }else{
                        $(".nav-slide-menu .nav-list").eq(2).hide();
                    }
                    //控制门店列表显示
                    setSmallShow(showList[2].store.serviceList,$(".nav-slide-menu .nav-list").eq(3).children(".child-slide-menu").children("li").eq(0));
                    setSmallShow(showList[2].store.tongluList,$(".nav-slide-menu .nav-list").eq(3).children(".child-slide-menu").children("li").eq(1));
                    if(showList[2].store.serviceList == "1" || showList[2].store.tongluList == "1"){
                        $(".nav-slide-menu .nav-list").eq(3).show();
                    }else{
                        $(".nav-slide-menu .nav-list").eq(3).hide();
                    }
                }
            }
        }
	};
    $.fn.setCookie = function (name,value){
        var path="";
        var cookiePath = "/";
        if(cookiePath!=null){
            path="; path="+cookiePath;
        }
        document.cookie = name + "="+ decodeURI(value)+ path + ";expires=Session";
    };
    $.fn.getCookie = function (name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return encodeURI(arr[2]);
        }else{
            return null;
        }
    };
    //退出登录
    function loginOut(){
        $("#loginOut").click(function (){
            window.location.href = "http://www.giant.com.cn/front/loginout";
        });
    }
	//一级导航的切换;
	$(".nav-list>a").click(function (){
		if($(this).parent().hasClass("active")){
			$(this).parent().removeClass("active").siblings(".nav-list").removeClass("active")
			$(this).parent().children(".child-slide-menu").slideUp(300);
		}else{
			$(this).parent().addClass("active").siblings(".nav-list").removeClass("active");
			$(this).parent().addClass("active").siblings(".nav-list").children(".child-slide-menu").slideUp(300);
			$(this).parent().children(".child-slide-menu").slideDown(300);
		}
	});
	//点击头像
	$(".user-content").click(function (e){
		e.stopPropagation();
		$(this).parent().toggleClass("open");
	});
	$(document).click(function (e){
		e.stopPropagation();
		$(".user-manage").removeClass("open");
		$(".search-box1").hide();
	});
	//点击切换类型
	$(".search-content div button").click(function (){
		$(this).addClass("btn-primary").removeClass("btn-default").siblings().addClass("btn-default").removeClass("btn-primary");
	});
    //设置头部宽度
    if($("body").hasClass("nav-md")){
        $(".header").css("width",$(window).width()-230);
    }else{
        $(".header").css("width",$(window).width()-70);
    }
    $(window).on("resize",function (){
        if($("body").hasClass("nav-md")){
            $(".header").css("width",$(window).width()-230);
        }else{
            $(".header").css("width",$(window).width()-70);
        }
    });
	//点击菜单切换导航栏宽窄
	$(".caidan-btn").click(function (){
		if($("body").hasClass("nav-md")){
			$("body").addClass("nav-sm").removeClass("nav-md");
            $(".header").css("width",$(window).width()-70);
		}else{
			$("body").addClass("nav-md").removeClass("nav-sm");
            $(".header").css("width",$(window).width()-230);
		}
	});
	//小屏幕菜单按钮
	$(".close-btn").click(function (){
		$("body").addClass("nav-sm").removeClass("nav-md");
	});
    //获取用户选择的时间
    $.fn.getUserDateArea = function (ele,type){
        var str = ele.val().split(" - ");
        if(type == 1){
            return str[0].replace(/\//g,"-");
        }else{
            return str[1].replace(/\//g,"-");
        }
    };
    //当屏幕小于600px时
    if($(window).width() <= 600){
        $(".btn-group").each(function (index){
            $(".btn-group").eq(index).addClass("btn-group-sm");
        });
        $(".input-group").each(function (index){
            $(".input-group").eq(index).addClass("input-group-sm");
        });
        $(".btn").each(function (index){
            $(".btn").eq(index).addClass("btn-sm");
        });
    }
    //设置关键指标
    $.fn.quotaData = function(dataArr) {
        var quotaBox = $("#quotaBox").children("div");
        function arrow(count) {
            if (count > 0) {
                return "<img src=\"img/arrow-up.png\" class=\"arrow-change\">"
            } else if (count < 0) {
                return "<img src=\"img/arrow-down.png\" class=\"arrow-change\">"
            } else if (count == 0) {
                return "";
            }
        }
        function setData(ele, data) {
            ele.text(data + "%");
        }
        function setArrow(ele, data) {
            ele.html(data)
        }
        for(var i = 0; i < dataArr.length;i++){
            quotaBox.eq(i).children("p").eq(1).text(dataArr[i].count);
            setData(quotaBox.eq(i).children("p").eq(2).children(".count"), dataArr[i].day);
            setData(quotaBox.eq(i).children("p").eq(3).children(".count"), dataArr[i].week);
            setData(quotaBox.eq(i).children("p").eq(4).children(".count"), dataArr[i].month);
            setArrow(quotaBox.eq(i).children("p").eq(2).children(".arrow"), arrow(dataArr[i].day));
            setArrow(quotaBox.eq(i).children("p").eq(3).children(".arrow"), arrow(dataArr[i].week));
            setArrow(quotaBox.eq(i).children("p").eq(4).children(".arrow"), arrow(dataArr[i].month));
        }
    };
    //分页
    $.fn.cutPage = function(p,n){
        //当页数小于5的时候
        if(p >= 0 && p <= 5){
            if(p == 1 || p == 0){
                $(".page-container .pagination").html("<li><a href='javascript:;' href='javascript:;' aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\" class='page-up'>上一页</span></a></li><li><a href='javascript:;' href='javascript:;' onclick='selectPage(1)'>1</a></li><li><a href='javascript:;' aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\" class='page-down'>下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }else if(p == 2){
                $(".page-container .pagination").html("<li><a href='javascript:;' aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\" class='page-up'>上一页</span></a></li><li><a href='javascript:;' onclick='selectPage(1)'>1</a></li><li><a href='javascript:;' onclick='selectPage(2)'>2</a></li><li><a href='javascript:;' aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\" class='page-down'>下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }else if(p == 3){
                $(".page-container .pagination").html("<li><a href='javascript:;' aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\" class='page-up'>上一页</span></a></li><li><a href='javascript:;' onclick='selectPage(1)'>1</a></li><li><a href='javascript:;' onclick='selectPage(2)'>2</a></li><li><a href='javascript:;' onclick='selectPage(3)'>3</a></li><li><a href='javascript:;' aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\" class='page-down'>下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }else if(p == 4){
                $(".page-container .pagination").html("<li><a href='javascript:;' aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\" class='page-up'>上一页</span></a></li><li><a href='javascript:;' onclick='selectPage(1)'>1</a></li><li><a href='javascript:;' onclick='selectPage(2)'>2</a></li><li><a href='javascript:;' onclick='selectPage(3)'>3</a></li><li><a href='javascript:;' onclick='selectPage(4)'>4</a></li><li><a href='javascript:;' aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\" class='page-down'>下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }else if(p == 5){
                $(".page-container .pagination").html("<li><a href='javascript:;' aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\" class='page-up'>上一页</span></a></li><li><a href='javascript:;' onclick='selectPage(1)'>1</a></li><li><a href='javascript:;' onclick='selectPage(2)'>2</a></li><li><a href='javascript:;' onclick='selectPage(3)'>3</a></li><li><a href='javascript:;' onclick='selectPage(4)'>4</a></li><li><a href='javascript:;' onclick='selectPage(5)'>5</a></li><li><a href='javascript:;' aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\" class='page-down'>下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }
        }else if(p > 5){//当页数大于5的时候
            if (n <= 4 && n != "" && n > 0) {
                $(".page-container .pagination").html("<li><a href='javascript:;' aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\" class='page-up'><</span></a></li><li><a href='javascript:;' onclick='selectPage(1)'>1</a></li><li><a href='javascript:;' onclick='selectPage(2)'>2</a></li><li><a href='javascript:;' onclick='selectPage(3)'>3</a></li><li><a href='javascript:;' onclick='selectPage(4)'>4</a></li><li><a href='javascript:;' onclick='selectPage(5)'>5</a></li><li><a href='javascript:;'>...</a></li><li><a href='javascript:;' onclick='selectPage(" + p + ")'>" + p + "</a></li><li><a href='javascript:;' aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\" class='page-down'>></span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            } else if (n > 4 && n <= (p - 4)) {
                $(".page-container .pagination").html("<li><a href='javascript:;' aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\" class='page-up'>上一页</span></a></li><li><a href='javascript:;' onclick='selectPage(1)'>1</a></li><li><a href='javascript:;'>...</a></li><li><a href='javascript:;' onclick='selectPage(" + (n - 1) + ")'>" + (n - 1) + "</a></li><li class=\"active\"><a href='javascript:;' onclick='selectPage(" + n + ")'>" + n + "</a></li><li><a href='javascript:;' onclick='selectPage(" + (n + 1) + ")'>" + (n + 1) + "</a></li><li><a href='javascript:;'>...</a></li><li><a href='javascript:;' onclick='selectPage(" + p + ")'>" + p + "</a></li><li><a href='javascript:;' aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\" class='page-down'>下一页</span></a></li>");
            } else if (n > (p - 4) && n <= p) {
                $(".page-container .pagination").html(" <li><a href='javascript:;' aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\" class='page-up'>上一页</span></a></li><li><a href='javascript:;' onclick='selectPage(1)'>1</a></li><li><a href='javascript:;'>...</a></li><li><a href='javascript:;' onclick='selectPage(" + (p - 4) + ")'>" + (p - 4) + "</a></li><li><a href='javascript:;' onclick='selectPage(" + (p - 3) + ")'>" + (p - 3) + "</a></li><li><a href='javascript:;' onclick='selectPage(" + (p - 2) + ")'>" + (p - 2) + "</a></li><li><a href='javascript:;' onclick='selectPage(" + (p - 1) + ")'>" + (p - 1) + "</a></li><li><a href='javascript:;' onclick='selectPage(" + p + ")'>" + p + "</a></li><li><a href='javascript:;' aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\" class='page-down'>下一页</span></a></li>");
                $(".page-container .pagination li").eq(7 - (p - n)).addClass("active");
            }
        }
        if($(document).width() <= 600){
            $(".pagination").addClass("pagination-sm");
            $(".page-down").each(function (index){
                $(".page-down").eq(index).text(">");
            });
            $(".page-up").each(function (index){
                $(".page-up").eq(index).text("<");
            });
        }else{
            $(".pagination").removeClass("pagination-sm");
            $(".page-down").each(function (index){
                $(".page-down").eq(index).text("下一页");
            });
            $(".page-up").each(function (index){
                $(".page-up").eq(index).text("上一页");
            });
        }
    };
    //根据角色拆分数据
    $.fn.getRoleData = function (data,code,role){
        var newData = null;
        console.log(data);
        if(role == "admin"){
            newData = data;
        }else if(role == "sbu"){
            for(var i = 0; i < data.list.length;i++){
                if(data.list[i].code == code){
                    newData = {
                        list:[]
                    };
                    newData.list.push(data.list[i]);
                }
            }
        }else if(role == "dealer"){
            for(var i = 0; i < data.list.length;i++){
                for(var j = 0;j < data.list[i].list.length;j++){
                    if(data.list[i].list[j].code == code){
                        newData = {
                            list:[{
                                name:data.list[i].name,
                                code:data.list[i].code,
                                list:[]
                            }]
                        };
                        newData.list[0].list.push(data.list[i].list[j]);
                    }
                }
            }
        }else if(role == "storeManager"){

        }else{
            alert("未知的角色!");
        }
        console.log(newData);
        return newData;
    };
    //控制区域显示
    $.fn.setAreaShow = function (role){
        if(role == "admin"){

        }else if(role == "sbu"){
            $("#search-btn1").remove();
        }else if(role == "dealer"){
            $("#search-btn1").remove();
            $("#search-btn2").remove();
        }else if(role == "storeManager"){
            $("#search-btn1").remove();
            $("#search-btn2").remove();
            $("#search-btn3").remove();
        }else{
            $("#search-btn1").remove();
            $("#search-btn2").remove();
            $("#search-btn3").remove();
            alert("未知的角色!")
        }
    };
});
