$(function (){
    //$.fn.isSign();
    $.fn.setAreaShow(window.roleInfo.role);
    //初始化折线图
    var myEcharts = echarts.init(document.getElementById("myEcharts"));
    var optionData = {
        color: ["#62caec", "#ff5752", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
        toolbox:{
            show:true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        title:{
            text:"捷安特会员数量变化趋势图",
            left:"center"
        },
        //提示框 鼠标移入图表上面的提示信息框
        tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(44,44,44,.9)",
            extraCssText: "box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);padding: 10px;border-radius: 0;",
            textStyle: {
                //文字大小
                fontSize: 12,

                extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);border-radius: 0;"
            },
            x:"right",
            y:"15"
        },
        //图例,设置类型提示的信息栏
        legend: {
            textStyle: {
                fontFamily: "tahoma, Helvetica Neue, Helvetica, Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif"
            },
            data: [],
            //设置位置
            left: "center",
            top: "30px"
        },

        grid: {
            left: "0", //4%
            right: "0", //4%
            top: "80",
            bottom: "0",
            containLabel: true
        },
        xAxis: {
            //type: "category",
            //axisLabel: { rotate: -90 },
            axisLine: {
                lineStyle: {
                    color: "#666",
                    width: 1
                }
            },
            data: []
        },
        yAxis: {
            //type: "value",
            axisLine: {
                lineStyle: {
                    color: "#666",
                    width: 1
                }
            }
        },
        //可以控制鼠标缩放
        dataZoom: [{
            type: "inside"
        }],

        series: []
    };
    var tempCountData = {
        legend: {
            data: []
        },
        xAxis:{
            data:[]
        },
        series: [{
            name: "绑定数量",
            type: "line",
            smooth: true,
            data: []
        }]
    };
    var quotaData,chartsData,tableData,filterData;//存储总数据
    tableData = {
        result:1,
        count:"5454",
        data:[
            {
                brand:"捷安特",
                addActivation:"545",
                totalActivation:"54",
                addBind:"225663",
                totalBind:"855656"
            },
            {
                brand:"捷安特",
                addActivation:"545",
                totalActivation:"54",
                addBind:"225663",
                totalBind:"855656"
            },
            {
                brand:"捷安特",
                addActivation:"545",
                totalActivation:"54",
                addBind:"225663",
                totalBind:"855656"
            },
            {
                brand:"捷安特",
                addActivation:"545",
                totalActivation:"54",
                addBind:"225663",
                totalBind:"855656"
            },
            {
                brand:"捷安特",
                addActivation:"545",
                totalActivation:"54",
                addBind:"225663",
                totalBind:"855656"
            },
            {
                brand:"捷安特",
                addActivation:"545",
                totalActivation:"54",
                addBind:"225663",
                totalBind:"855656"
            }
        ]
    };
    quotaData = {
        totalPrice: {//销售总金额
            count: 8714,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        productCount: {//销售产品总数
            count: 8284,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        bikeCount: {//整车销量
            count: 8384,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        productCount:{//商品销量
            count: 7484,
            day: 0.32,
            week: -0.23,
            month: 0.63
        }
    };
    chartsData = {
        result: 1,
        data:[
            {
                fromName:"giant",
                data:[
                    {date:"20171012",count:"525"},
                    {date:"20171013",count:"155"},
                    {date:"20171014",count:"553"},
                    {date:"20171015",count:"55"}
                ]
            },
            {
                fromName:"momentum",
                data:[
                    {date:"20171012",count:"611"},
                    {date:"20171013",count:"358"},
                    {date:"20171014",count:"455"},
                    {date:"20171015",count:"755"}
                ]
            },
            {
                fromName:"liv",
                data:[
                    {date:"20171012",count:"155"},
                    {date:"20171013",count:"955"},
                    {date:"20171014",count:"255"},
                    {date:"20171015",count:"455"}
                ]
            }
        ]
    };
    //获取默认时间
    function getDateArea(type){
        var beginDate = moment().subtract(30,'days').format("YYYY-MM-DD");
        var endDate = moment().subtract(1,'days').format("YYYY-MM-DD");
        if(type == 1){
            return beginDate;
        }else{
            return endDate;
        }
    }
    var sendType = 1;//1为获取图表数据,2为获取表格数据;
    var filter = {
        role:window.roleInfo.role,
        roleCode:window.roleInfo.roleCode,
        beginDate:getDateArea(1),
        endDate: getDateArea(0),
        brandList:[],//型号列表
        brandType:"1",//产品类型1,品牌,2车系,3车型
        type:"1",//会员类型
        dateType:"1"//时间类型
    };
    var tableFilter = {
        role: window.roleInfo.role,
        roleCode: window.roleInfo.roleCode,
        beginDate: getDateArea(1),
        endDate: getDateArea(0),
        brandType:"1",//产品类型1,品牌,2车系,3车型
        pageNo:"1",
        pageSize:"30"
    };
    //请求图表数据
    function getChartsData(sendData){
        var dfd = $.Deferred();
        $.ajax({
            url: window.roleInfo.url2+"giantService/report/userData/userLines",
            data: sendData
        }).done(function (res){
            console.log(filter)
            if(res.result == 1){
                dfd.resolve(res);
                chartsData = res;
                console.log(chartsData)
                setChartsData();
            }else{
                alert("获取性别接口失败!"+res.msg);
            }
        }).fail(function (){
            alert("失败!")
        });
        return dfd.promise();
    }
    //请求指标数据
    function getQuotaData(sendData){
        var dfd = $.Deferred();
        $.ajax({
            url:window.roleInfo.url1+"giantService/report/product/productSaleTarget",
            data: sendData
        }).done(function (res){
            console.log(res)
            if(res.result == 1){
                dfd.resolve(res);
                quotaData = res;
                setQuotaData();
            }else{
                alert("获取接口失败!");
            }
        }).fail(function (){
            alert("失败!")
        });
        return dfd.promise();
    }
    getQuotaData(filter)
    //请求平台来源数据
    function getFilterData(){
        var dfd = $.Deferred();
        $.ajax({
            url: window.roleInfo.url1+"giantService/report/userData/selectCondition",
        }).done(function (res){
            if(res.result == 1){
                dfd.resolve(res);
                filterData = res;
                setFilterData();
            }else{
                alert("获取接口失败!"+res.msg);
            }
        }).fail(function (){
            alert("失败!")
        });
        return dfd.promise();
    }
    //请求表格数据
    function getTableData(sendData){
        var dfd = $.Deferred();
        $.ajax({
            url:window.roleInfo.url2+"giantService/report/dataDraw/sex",
            data: sendData
        }).done(function (res){
            if(res.result == 1){
                dfd.resolve(res);
                setTableData();
            }else{
                alert("获取性别接口失败!"+res.msg);
            }
        }).fail(function (){
            alert("失败!")
        });
        return dfd.promise();
    }
    //所有数据都成功之后的回调函数
    function getData(){
        $.when(
            getQuotaData(filter),
            getChartsData(filter),
            getTableData(tableFilter),
            getFilterData()
        ).done(function (
            res1,
            res2,
            res3
        ){
            quotaData = res1;
            setQuotaData();
        }).fail(function (res){
            alert("获取不成功");
        });
    }
    //设置关键指标
    function setQuotaData() {
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
            if (data != 0) {
                ele.text(data + "%");
            } else {
                ele.text("0%");
            }
        }
        function setArrow(ele, data) {
            ele.html(data)
        }
        //qrcode激活
        quotaBox.eq(0).children("p").eq(1).text(quotaData.totalPrice.count/100);
        setData(quotaBox.eq(0).children("p").eq(2).children(".count"), quotaData.totalPrice.day);
        setData(quotaBox.eq(0).children("p").eq(3).children(".count"), quotaData.totalPrice.week);
        setData(quotaBox.eq(0).children("p").eq(4).children(".count"), quotaData.totalPrice.month);

        setArrow(quotaBox.eq(0).children("p").eq(2).children(".arrow"), arrow(quotaData.totalPrice.day));
        setArrow(quotaBox.eq(0).children("p").eq(3).children(".arrow"), arrow(quotaData.totalPrice.week));
        setArrow(quotaBox.eq(0).children("p").eq(4).children(".arrow"), arrow(quotaData.totalPrice.month));
        //累计激活
        quotaBox.eq(1).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(1).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(1).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(1).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(1).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(1).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(1).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
        //qrcode绑定
        quotaBox.eq(2).children("p").eq(1).text(quotaData.bikeCount.count);
        setData(quotaBox.eq(2).children("p").eq(2).children(".count"), quotaData.bikeCount.day);
        setData(quotaBox.eq(2).children("p").eq(3).children(".count"), quotaData.bikeCount.week);
        setData(quotaBox.eq(2).children("p").eq(4).children(".count"), quotaData.bikeCount.month);

        setArrow(quotaBox.eq(2).children("p").eq(2).children(".arrow"), arrow(quotaData.bikeCount.day));
        setArrow(quotaBox.eq(2).children("p").eq(3).children(".arrow"), arrow(quotaData.bikeCount.week));
        setArrow(quotaBox.eq(2).children("p").eq(4).children(".arrow"), arrow(quotaData.bikeCount.month));
        //累计绑定
        quotaBox.eq(3).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(3).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(3).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(3).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(3).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(3).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(3).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
    }
    //拆分数据
    function setChartsData(){
        console.log(chartsData);
        defaultData();
        var legend = [];
        var xData = [];
        var serData = [];
        for(var i = 0; i < chartsData.data.length;i++){
            legend.push(chartsData.data[i].fromName);
            var temp = {
                name: chartsData.data[i].fromName,
                type: "line",
                smooth: true,
                //stack: '总量',
                data: []
            };
            for(var j = 0; j < chartsData.data[i].data.length;j++){
                if(i == 0){
                    xData.push(chartsData.data[i].data[j].date);
                }
                temp.data.push(chartsData.data[i].data[j].count);
            }
            serData.push(temp);
        }
        tempCountData.legend.data = legend;
        tempCountData.xAxis.data = xData;
        tempCountData.series = serData;
        showCharts();
    }
    setChartsData();
    //设置表格数据
    function setTableData(){
        var tableList = [];
        for(var i = 0; i < tableData.data.length;i++){
            var temp = $("<tr>\n" +
                "<td>"+tableData.data[i].brand+"</td>" +
                "<td>"+tableData.data[i].addActivation+"</td>" +
                "<td>"+tableData.data[i].totalActivation+"</td>" +
                "<td>"+tableData.data[i].addBind+"</td>" +
                "<td>"+tableData.data[i].totalBind+"</td>" +
                "</tr>");
            tableList.push(temp);
        }
        $(".lx-container table tbody").empty().append(tableList);
        $.fn.cutPage(Math.ceil(tableData.count/30),tableFilter.pageNo);
        $(".page-selection").show();
    }
    setTableData();
    function selectType(){
        //选择数据分类
        $("#vipClass").children().each(function (index){
            $("#vipClass").children().eq(index).click(function (){
                $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                filter.type = index+1;
                getChartsData(filter);
            });
        });
        //选择日期分类
        $("#dateClass").children().each(function (index){
            $("#dateClass").children().eq(index).click(function (){
                $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                filter.dateType = index+1;
                getChartsData(filter);
            });
        });
    }
    function getFilterData(){
        $.getJSON("http://localhost:4396/giantData-v2/data.min.json", function (res) {
            console.log(res)
            var aa = new setBrandData("#treeBox",$.fn.getRoleData(res,window.roleInfo.roleCode,window.roleInfo.role));
            $("#search-btn1").bind("click",function (){
                aa.showMenu(this,1);
                filter.brandType = 1;
                sendType = 1;
            });
            $("#search-btn2").bind("click",function (){
                aa.showMenu(this,2);
                filter.brandType = 2;
                sendType = 1;
            });
            $("#search-btn3").bind("click",function (){
                aa.showMenu(this,3);
                filter.brandType = 3;
                sendType = 1;
            });
        });
    }
    getFilterData();
    //筛选品牌之后
    function selectFilter(){
        $("#filterBtn").click(function () {
            var zTree = $.fn.zTree.getZTreeObj("treeBox"),
                nodes = zTree.getCheckedNodes(true),
                filterList = [];
            for (var i = 0; i < nodes.length; i++) {
                filterList.push(nodes[i].dictCode);
            }
            $("#menuContent").slideUp("fast");
            if(sendType == 1){
                filter.brandList = filterList;
                console.log(filter);
                //getChartsData(filter);
            }else{
                tableFilter.brandList = filterList;
                console.log(tableFilter);
                //getChartsData(tableFilter);
            }
        });
    }
    selectFilter();
    //初始化数据
    function defaultData(){
        tempCountData.xAxis.data = [];
        tempCountData.series = [];
        tempCountData.legend.data = [];
    }
    //展示图表数据
    function showCharts(){
        var newData = $.extend(true,{},optionData,tempCountData);
        myEcharts.setOption(newData);
        setTimeout(function (){
            myEcharts.resize();
        },200);
    }
    $(window).resize(function (){
        myEcharts.resize();
    });
    //初始化页面
    function initFun(){
        selectType();
    }
    initFun();
    $(".loading-wrapper").hide()
});