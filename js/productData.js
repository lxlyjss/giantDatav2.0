$(function (){
    //$.fn.isSign();
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
        title:{
            text:"捷安特QRcode激活量趋势图"
        },
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
    var titleArr = [
        "捷安特QRcode激活量趋势图",
        "捷安特QRcode累计激活量趋势图",
        "捷安特QRcode绑定量趋势图",
        "捷安特QRcode累计绑定量趋势图"
    ];
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
        qrcodeCount: {//QRcode激活数
            count: 8714,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        actTotalCount: {//历史累计激活数量
            count: 8284,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        bdCount: {//qrcode绑定数量
            count: 8384,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        bdTotalCount: {//qrcode绑定数量
            count: 8384,
            day: 0.32,
            week: -0.23,
            month: 0.63
        }
    };
    chartsData = {
        result: 1,
        data:[
            {
                fromName:"app",
                data:[
                    {date:"20171012",count:"525"},
                    {date:"20171013",count:"155"},
                    {date:"20171014",count:"553"},
                    {date:"20171015",count:"55"}
                ]
            },
            {
                fromName:"web",
                data:[
                    {date:"20171012",count:"611"},
                    {date:"20171013",count:"358"},
                    {date:"20171014",count:"455"},
                    {date:"20171015",count:"755"}
                ]
            },
            {
                fromName:"club",
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
    var filter = {
        role:window.roleInfo.role,
        roleCode:window.roleInfo.roleCode,
        beginDate:getDateArea(1),
        endDate: getDateArea(0),
        dataList: [
            {
                name:"捷安特",
                code:"3",
                type:"2"
            }
        ],//型号列表
        dimension:"1",//产品类型1,品牌,2车系,3车型
        type:"1",//会员类型
        dateType:"1"//时间类型
    };
    var tableFilter = {
        role: window.roleInfo.role,
        roleCode: window.roleInfo.roleCode,
        beginDate: getDateArea(1),
        endDate: getDateArea(0),
        dimension:"1",//产品类型1,品牌,2车系,3车型
        pageNo:"1",
        pageSize:"30"
    };
    //请求图表数据
    function getChartsData(sendData){
        $("#loading2").show();
        var dfd = $.Deferred();
        var sendData = $.extend(true,{},sendData);
        sendData.dataList = JSON.stringify(sendData.dataList);
        $.ajax({
            url: window.roleInfo.url1+"giantService/report/product/productQRcodeTendency",
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
        }).complete(function (){
            $("#loading2").hide();
        });
        return dfd.promise();
    }
    //请求指标数据
    function getQuotaData(sendData){
        $("#loading2").show();
        var dfd = $.Deferred();
        $.ajax({
            url:window.roleInfo.url1+"giantService/report/product/productQRcodeTarget",
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
        }).complete(function (){
            $("#loading2").hide();
        });
        return dfd.promise();
    }
    //请求筛选条件数据
    function getFilterData(){
        $("#loading2").show();
        var dfd = $.Deferred();
        $.ajax({
            url: window.roleInfo.url1+"giantService/report/userData/selectCondition"
        }).done(function (res){
            if(res.result == 1){
                dfd.resolve(res);
                setFilterData(res);
            }else{
                alert("获取接口失败!"+res.msg);
            }
        }).fail(function (){
            alert("失败!")
        }).complete(function (){
            $("#loading2").hide();
        });
        return dfd.promise();
    }
    //请求表格数据
    function getTableData(sendData){
        $("#loading2").show();
        var dfd = $.Deferred();
        $.ajax({
            url:window.roleInfo.url1+"giantService/report/product/productQRcodeTendencyList",
            data: sendData
        }).done(function (res){
            if(res.result == 1){
                dfd.resolve(res);
                tableData = res;
                setTableData();
            }else{
                alert("获取性别接口失败!"+res.msg);
            }
        }).fail(function (){
            alert("失败!")
        }).complete(function (){
            $("#loading2").hide();
        });
        return dfd.promise();
    }
    getTableData(tableFilter);
    //所有数据都成功之后的回调函数
    function getData(){
        $.when(
            getQuotaData(filter),
            getChartsData(filter),
            getTableData(tableFilter),
            getFilterData()
        ).then(function (){
            $("#loading1").hide();
            $("#loading2").hide();
        });
    }
    //设置指标数据
    function setQuotaData(){
        var dataArr = [quotaData.qrcodeCount,quotaData.actTotalCount,quotaData.bdCount,quotaData.bdTotalCount];
        $.fn.quotaData(dataArr);
    }
    //拆分数据
    function setChartsData(){
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
                tempCountData.title.text = titleArr[index];
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
    function setFilterData(res){
        var aa = new setBrandData("#treeBox",res);
        $("#search-btn1").bind("click",function (){
            aa.showMenu(this,1);
            filter.brandType = 1;
        });
        $("#search-btn2").bind("click",function (){
            aa.showMenu(this,2);
            filter.brandType = 2;
        });
        $("#search-btn3").bind("click",function (){
            aa.showMenu(this,3);
            filter.brandType = 3;
        });
        selectFilter();
        //表格数据筛选
        $("#search-btn4").click(function (){
            tableFilter.brandType = 1;
            tableFilter.pageNo = 1;
            getTableData(tableFilter);
            $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
        });
        $("#search-btn5").click(function (){
            tableFilter.brandType = 2;
            tableFilter.pageNo = 1;
            getTableData(tableFilter);
            $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
        });
        $("#search-btn6").click(function (){
            tableFilter.brandType = 3;
            tableFilter.pageNo = 1;
            getTableData(tableFilter);
            $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
        });
    }
    //筛选品牌之后
    function selectFilter(){
        $("#filterBtn").click(function () {
            var zTree = $.fn.zTree.getZTreeObj("treeBox"),
                nodes = zTree.getCheckedNodes(true),
                filterList = [];
            for (var i = 0; i < nodes.length; i++) {
                filterList.push({
                    code: nodes[i].brandCode,
                    name: nodes[i].brandName,
                    type: nodes[i].brandType
                });
            }
            $("#menuContent").slideUp("fast");
            filter.brandList = filterList;
            console.log(filter);
            //getChartsData(filter);
        });
    }
    //选页
    window.selectPage = function (n){
        if(n > 0 && n <= Math.ceil(tableData.count/30)) {
            $.fn.cutPage(Math.ceil(tableData.count/30), n);
            tableFilter.pageNo = n;
            getTableData(tableFilter);
        }else{
            alert("没有更多了^_^");
        }
    };
    //跳转页
    $(".page-select .btn").click(function (){
        var page = parseInt($(".page-select input[type=number]").val());
        var reg = /([1-9]\d+)|[1-9]/;
        if(reg.test(page) && page > 0){
            if(page > Math.ceil(tableData.count/30)){
                alert("输入的页数超过了最大页数!请重新输入!");
            }else{
                tableFilter.pageNo = page;
                getTableData(tableFilter);
            }
        }else{
            alert("请输入大于0的正整数!");
        }
    });
    //下载表格
    function downloadTable(){
        $("#download").click(function (){
            var beginDate = $.fn.getUserDateArea($("#dateInput2"),1);
            var endDate = $.fn.getUserDateArea($("#dateInput2"),0);
            window.location.href = window.roleInfo.url2+
                "giantService/report/storeServe/exportStoreDatas?"+
                "role="+window.roleInfo.role+
                "&roleCode="+window.roleInfo.roleCode+
                "&beginDate="+beginDate+
                "&endDate="+endDate+
                "&areaType="+tableFilter.areaType
        });
    };
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