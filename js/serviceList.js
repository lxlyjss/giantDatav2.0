$(function (){
    $.fn.isSign();
    var resultCount;//请求数据,评价总数
    var allPage;//总页数
    var resultData;//存储数据
    var filter = {
        dateArea:getDefaultDate(),
        userId:window.roleInfo.userId,
        page:1,//当前页数
        pageNum:10,
        role:window.roleInfo.role,
        roleCode:window.roleInfo.roleCode,
        shopPro:"",
        storeStatus:"",
        shopType:"",
        sbuCode:"",
        dealerCode:"",
        sotreCode:""
    };
    //选页
    window.selectPage = function (n) {
        if(n > 0 && n <= allPage) {
            showLoading(true);//展示loading动画
            cutPage(allPage, n);//分页
            filter.page = n;//
            getAjaxData();
        }else{
            alert("没有更多了^_^");
        }
    };
    //获取后台数据,页面初始化
    function getAjaxData() {
        $.ajax({
            url: "http://"+window.roleInfo.url2+"/giantService/report/storeEva/storeEvaList",
            data: filter,
            async: true,
            dataType: "json",
            type: "get",
            success: function (data) {
                showLoading(false);//隐藏loading动画
                if(data.result == 1){
                    console.log(filter);
                    if(data.list.length > 0){
                        resultData = data;//赋值给evalData;
                        resultCount = resultData.count;
                        allPage = Math.ceil(resultCount / 10);
                        cutPage(allPage, filter.page);
                        $(".page-selection").show();
                        showData();
                    }else{
                        alert("未查询到数据!");
						resultData = data;//赋值给evalData;
                        resultCount = resultData.count;
                        allPage = Math.ceil(resultCount / 10);
                        cutPage(allPage, filter.page);
                        $(".page-selection").show();
                        showData();
                    }
                }else{
                    alert("获取数据失败!result=0");
                }
            },
            error:function (){
                showLoading(false);//隐藏loading动画
                alert("获取数据失败!请重新刷新网页");
            }
        });
    }

    //展示数据
    function showData() {
        var pageData = resultData.list;
        var tempList = [];
        for (var i = 0; i < pageData.length; i++) {
            var temp = $("<tr style=\"text-align: center;\">" +
                "<td>" + (pageData[i].storeName==null?"":pageData[i].storeName) + "</td>" +
                "<td>" + (pageData[i].storeCode==null?"":pageData[i].storeCode) + "</td>" +
                "<td>" + (pageData[i].dealerCode==null?"":pageData[i].dealerCode) + "</td>" +
                "<td>" + (pageData[i].sbuCode==null?"":pageData[i].sbuCode) + "</td>" +
                "<td>" + (pageData[i].service==null?"":pageData[i].service) + "</td>" +
                "<td>" + (pageData[i].person==null?"":pageData[i].person) + "</td>" +
                "<td>" + (pageData[i].content==null?"":isMore(pageData[i].content,i)) + "</td>" +
                "<td>" + (pageData[i].personNumber==null?"":pageData[i].personNumber) + "</td>" +
                "<td>" + (pageData[i].userName==null?"":pageData[i].userName) + "</td>" +
                "<td>" + (pageData[i].date==null?"":pageData[i].date) + "</td>" +
                "</tr>");
            tempList.push(temp);
        }
        $(".vip-container table tbody").empty().append(tempList);
    }
    //查看详细评价内容
    window.showMoreContent = function (t,index){
        $(t).parent().text(resultData.list[index].content);
    }
    //当评价内容字数超过10个字
    function isMore(str,index){
        var temp = "";
        if(str.length > 10){
            temp = str.slice(0,10)+"...<a href='javascript:;' onclick='showMoreContent(this,"+index+")'>详细</a>";
        }else{
            temp = str;
        }
        return temp;
    }
    //分页
    function cutPage(p, n) {
        //当页数小于5的时候
        if(p >= 0 && p <= 5){
            if(p == 1 || p == 0){
                $(".page-container .pagination").html("<li><a href=\"javascript:;\" aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\">上一页</span></a></li><li><a href=\"javascript:;\" onclick='selectPage(1)'>1</a></li><li><a href=\"javascript:;\" aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\">下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }else if(p == 2){
                $(".page-container .pagination").html("<li><a href=\"javascript:;\" aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\">上一页</span></a></li><li><a href=\"javascript:;\" onclick='selectPage(1)'>1</a></li><li><a href=\"javascript:;\" onclick='selectPage(2)'>2</a></li><li><a href=\"javascript:;\" aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\">下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }else if(p == 3){
                $(".page-container .pagination").html("<li><a href=\"javascript:;\" aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\">上一页</span></a></li><li><a href=\"javascript:;\" onclick='selectPage(1)'>1</a></li><li><a href=\"javascript:;\" onclick='selectPage(2)'>2</a></li><li><a href=\"javascript:;\" onclick='selectPage(3)'>3</a></li><li><a href=\"javascript:;\" aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\">下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }else if(p == 4){
                $(".page-container .pagination").html("<li><a href=\"javascript:;\" aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\">上一页</span></a></li><li><a href=\"javascript:;\" onclick='selectPage(1)'>1</a></li><li><a href=\"javascript:;\" onclick='selectPage(2)'>2</a></li><li><a href=\"javascript:;\" onclick='selectPage(3)'>3</a></li><li><a href=\"javascript:;\" onclick='selectPage(4)'>4</a></li><li><a href=\"javascript:;\" aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\">下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }else if(p == 5){
                $(".page-container .pagination").html("<li><a href=\"javascript:;\" aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\">上一页</span></a></li><li><a href=\"javascript:;\" onclick='selectPage(1)'>1</a></li><li><a href=\"javascript:;\" onclick='selectPage(2)'>2</a></li><li><a href=\"javascript:;\" onclick='selectPage(3)'>3</a></li><li><a href=\"javascript:;\" onclick='selectPage(4)'>4</a></li><li><a href=\"javascript:;\" onclick='selectPage(5)'>5</a></li><li><a href=\"javascript:;\" aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\">下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            }
        }else if(p > 5){//当页数大于5的时候
            if (n <= 4 && n != "" && n > 0) {
                $(".page-container .pagination").html("<li><a href=\"javascript:;\" aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\">上一页</span></a></li><li><a href=\"javascript:;\" onclick='selectPage(1)'>1</a></li><li><a href=\"javascript:;\" onclick='selectPage(2)'>2</a></li><li><a href=\"javascript:;\" onclick='selectPage(3)'>3</a></li><li><a href=\"javascript:;\" onclick='selectPage(4)'>4</a></li><li><a href=\"javascript:;\" onclick='selectPage(5)'>5</a></li><li><a href=\"javascript:;\">...</a></li><li><a href=\"javascript:;\"onclick='selectPage(" + p + ")'>" + p + "</a></li><li><a href=\"javascript:;\" aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\">下一页</span></a></li>");
                $(".page-container .pagination li").eq(n).addClass("active");
            } else if (n > 4 && n <= (p - 4)) {
                $(".page-container .pagination").html("<li><a href=\"javascript:;\" aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\">上一页</span></a></li><li><a href=\"javascript:;\" onclick='selectPage(1)'>1</a></li><li><a href=\"javascript:;\">...</a></li><li><a href=\"javascript:;\" onclick='selectPage(" + (n - 1) + ")'>" + (n - 1) + "</a></li><li class=\"active\"><a href=\"javascript:;\" onclick='selectPage(" + n + ")'>" + n + "</a></li><li><a href=\"javascript:;\" onclick='selectPage(" + (n + 1) + ")'>" + (n + 1) + "</a></li><li><a href=\"javascript:;\">...</a></li><li><a href=\"javascript:;\" onclick='selectPage(" + p + ")'>" + p + "</a></li><li><a href=\"javascript:;\" aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\">下一页</span></a></li>");
            } else if (n > (p - 4) && n <= p) {
                $(".page-container .pagination").html(" <li><a href=\"javascript:;\" aria-label=\"Previous\" onclick='selectPage(" + (n - 1) + ")'><span aria-hidden=\"true\">上一页</span></a></li><li><a href=\"javascript:;\" onclick='selectPage(1)'>1</a></li><li><a href=\"javascript:;\">...</a></li><li><a href=\"javascript:;\" onclick='selectPage(" + (p - 4) + ")'>" + (p - 4) + "</a></li><li><a href=\"javascript:;\" onclick='selectPage(" + (p - 3) + ")'>" + (p - 3) + "</a></li><li><a href=\"javascript:;\" onclick='selectPage(" + (p - 2) + ")'>" + (p - 2) + "</a></li><li><a href=\"javascript:;\" onclick='selectPage(" + (p - 1) + ")'>" + (p - 1) + "</a></li><li><a href=\"javascript:;\" onclick='selectPage(" + p + ")'>" + p + "</a></li><li><a href=\"javascript:;\" aria-label=\"Next\" onclick='selectPage(" + (n + 1) + ")'><span aria-hidden=\"true\">下一页</span></a></li>");
                $(".page-container .pagination li").eq(7 - (p - n)).addClass("active");
            }
        }
    }
    var filterData;//存储类型筛选条件
    var areaFilter;//存储区域筛选条件
    //获取筛选条件
    function getTypeFilterData() {
        $.ajax({
            url: "http://"+window.roleInfo.url2+"/giantService/report/storeEva/conditionEva",
            data:{
                role:filter.role,
                roleCode:filter.roleCode,
            },
            async: true,
            dataType: "json",
            type: "get",
            success: function (data) {
                if (data.result == 1) {
                    filterData = data;
                    //添加门市形态
                    setFilterData($("#storePropertys"), filterData.storePropertys);
                    //添加门店类型
                    setFilterData($("#storeType"), filterData.storeTypes);
                    //添加门店状态
                    setFilterData($("#storeStatus"), filterData.storeStatus);
                } else {
                    alert("获取数据失败!");
                }
            },
            error: function (error) {
                alert("获取数据失败!请重新刷新网页!");
            }
        });
    }
    //设置类型筛选条件
    function setFilterData(ele, aData) {
        //设置区域条件
        var tempList = [];
        for (var i = 0; i < aData.length; i++) {
            var temp = $("<option value='"+aData[i].dictCode+"'>" + aData[i].dictName + "</option>");
            tempList.push(temp);
        }
        ele.children().first().nextAll().remove();
        ele.append(tempList);
    }
    //获取区域筛选条件
    function getAreaFilterData() {
        $.ajax({
            url: "http://"+window.roleInfo.url2+"/giantService/report/storeEva/conditionEva",
            data:{
                role:filter.role,
                roleCode:filter.roleCode
            },
            async: true,
            dataType: "json",
            type: "get",
            success: function (data) {
                if (data.result == 1) {
                    areaFilter = data;
                    //设置区域筛选条件
                    setAreaFilter(window.roleInfo.role);
                } else {
                    alert("获取数据失败!");
                }
            },
            error: function () {
                alert("获取数据失败!请重新刷新网页!");
            }
        });
    }
    //控制区域筛选条件的显示和隐藏
    function setAreaShow(role){
        if(role == "admin"){//总公司角色

        }else if(role == "sbu"){//sbu角色
            $("#sbuList").parent().parent("div").hide();//没有sbu选择
        }else if(role == "dealer"){//经销商角色
            $("#dealerList").parent().parent("div").hide();//没有经销商选择
            $("#sbuList").parent().parent("div").hide();//没有sbu选择
        }else if(role == "store"){//门店角色
            $("#dealerList").parent().parent("div").hide();//没有经销商选择
            $("#sbuList").parent().parent("div").hide();//没有sbu选择
            $("#storeList").parent().parent("div").hide();//没有门店选择
        }else {
            alert("未知的角色");
            return;
        }
    }
    //设置本级区域筛选条件
    function setAreaFilter(role){
        if(role == "admin"){//总公司角色
            setSbuFilter();
        }else if(role == "sbu"){//sbu角色
                setSbuFilter();
                $("#sbuList").val(filter.roleCode);
                setDealerFilter(filter.roleCode);
        }else if(role == "dealer"){//经销商角色
                var sbu = findSbu(filter.roleCode);
                setSbuFilter();
                $("#sbuList").val(sbu);
                setDealerFilter(sbu);
                $("#dealerList").val(filter.roleCode);
                setStoreFilter(filter.roleCode);
        }else if(role == "store"){//门店角色

        }else {
            alert("未知的角色");
            return;
        }
    }
    //如果是经销商角色查找sbu
    function findSbu(roleCode){
        var temp;
        if(areaFilter.sbuList.length>0){
            for(var i = 0;i < areaFilter.sbuList.length;i++){
                for(var j = 0; j < areaFilter.sbuList[i].dealerList.length;j++){
                    if(areaFilter.sbuList[i].dealerList[j].code == roleCode){
                        temp = areaFilter.sbuList[i].code;
                        break;
                    }
                }
            }
            return temp;
        }
    }
    //选择sbu
    $("#sbuList").on("change",function (){
        setDealerFilter($(this).val());
    });
    //选择经销商
    $("#dealerList").on("change",function (){
        setStoreFilter($(this).val());
    });
    //设置sbu筛选条件
    function setSbuFilter(){
        var tempList = [];
        console.log(areaFilter);
        if(areaFilter.sbuList) {
            for (var i = 0; i < areaFilter.sbuList.length; i++) {
                var temp = $("<option value='" + areaFilter.sbuList[i].code + "'>" + areaFilter.sbuList[i].name + "</option>");
                tempList.push(temp);
            }
            $("#sbuList").children().nextAll().remove();
            $("#sbuList").append(tempList);
        }
    }
    // //设置经销商筛选条件
    function setDealerFilter(val){
        $("#dealerList").children().first().nextAll().remove();
        $("#storeList").children().first().nextAll().remove();
        if(!val){
            $("#dealerList").children().first().nextAll().remove();
        }else{
            if(areaFilter.sbuList) {
                for (var i = 0; i < areaFilter.sbuList.length; i++) {
                    if (areaFilter.sbuList[i].code == val) {
                        var tempList = [];
                        for (var j = 0; j < areaFilter.sbuList[i].dealerList.length; j++) {
                            var temp = $("<option value='" + areaFilter.sbuList[i].dealerList[j].code + "'>" + areaFilter.sbuList[i].dealerList[j].name + "</option>");
                            tempList.push(temp);
                        }
                        $("#dealerList").children().first().nextAll().remove();
                        $("#dealerList").append(tempList);
                    }
                }
            }
        }
    }
    // //设置门店筛选条件
    function setStoreFilter(val){
        if(!val){
            $("#storeList").children().first().nextAll().remove();
        }else{
            for(var i = 0;i < areaFilter.sbuList.length;i++){
                if(areaFilter.sbuList[i].code == $("#sbuList").val()){
                    for(var j = 0; j < areaFilter.sbuList[i].dealerList.length;j++){
                        if(areaFilter.sbuList[i].dealerList[j].code == val){
                            var tempList = [];
                            for(var k = 0; k < areaFilter.sbuList[i].dealerList[j].storeList.length;k++){
                                var temp = $("<option value='"+areaFilter.sbuList[i].dealerList[j].storeList[k].code+"'>"+areaFilter.sbuList[i].dealerList[j].storeList[k].name+"</option>");
                                tempList.push(temp);
                            }
                            $("#storeList").children().first().nextAll().remove();
                            $("#storeList").append(tempList);
                        }
                    }
                }
            }
        }
    }
    //设置默认时间段
    function getDefaultDate(){
        var dateArea;
        var startDate = moment().subtract(30,'days').format("YYYYMMDD");
        var endDate = moment().subtract(1,'days').format("YYYYMMDD");
        dateArea = startDate+","+endDate;
        return dateArea;
    }
    //是否显示loading动画
    function showLoading(y){
        if(y){
            $(".loading-wrapper").show();
        }else{
            $(".loading-wrapper").hide();
        }
    }
    //搜索条件查询
    $(".search-btn .btn").click(function (){
        showLoading(true);
        filter.sbuCode = $("#sbuList").val();
        filter.dealerCode = $("#dealerList").val();
        filter.storeCode = $("#storeList").val();
        filter.shopPro = $("#storePropertys").val();
        filter.storeStatus = $("#storeStatus").val();
        filter.shopType = $("#storeType").val();
        filter.page = 1;
        getAjaxData();
    });
    //跳转页
    $(".page-select .btn").click(function (){
        var page = parseInt($(".page-select input[type=number]").val());
        var reg = /([1-9]\d+)|[2-9]/;
        if(reg.test(page) && page > 0){
            if(page > allPage){
                alert("输入的页数超过了最大页数!请重新输入!");
            }else{
                $(".loading-wrapper").show();
                filter.page = page;
                getAjaxData(filter.dimension);
            }
        }else{
            alert("请输入大于0的正整数!")
        }
    });
    function initFun(){
        getTypeFilterData();
        getAreaFilterData();
        getAjaxData();
        setAreaShow(window.roleInfo.role);//根据用户角色显示区域筛选条件
    }
    initFun();
});