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
    var tempChartsData;//存储临时图表数据
    var titleArr = [
        "捷安特产品外观评价均分趋势图",
        "捷安特产品性能评价均分趋势图",
        "捷安特产品价格评价均分趋势图"
    ];
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
        dataList:[
            {
                name:"捷安特",
                code:"3",
                type:"2"
            }
        ],//型号列表
        dimension:"1",//产品类型1,品牌,2车系,3车型
        dateType:"1"//时间类型
    };
    var tableFilter = {
        role: window.roleInfo.role,
        roleCode: window.roleInfo.roleCode,
        beginDate: getDateArea(1),
        endDate: getDateArea(0),
        dimension:"1"//产品类型1,品牌,2车系,3车型
    };
    //请求图表数据
    function getChartsData(sendData){
        $("#loading2").show();
        var dfd = $.Deferred();
        var sendData = $.extend(true,{},sendData);
        sendData.dataList = JSON.stringify(sendData.dataList);
        $.ajax({
            url: window.roleInfo.url1+"giantService/report/product/productTendency",
            data: sendData,
            dataType:"json",
            type:"post"
        }).done(function (res){
            console.log(res);
            console.log(sendData);
            console.log(filter)
            if(res.result == 1){
                dfd.resolve(res);
                chartsData = res;
                selectType();
                setChartsData();
            }else{
                alert("result=0");
                $("#loading2").hide();
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
            url:window.roleInfo.url1+"giantService/report/product/productEvaluateTarget",
            data: sendData
        }).done(function (res){
            console.log(res)
            if(res.result == 1){
                dfd.resolve(res);
                quotaData = res;
                setQuotaData();
            }else{
                alert("result=0");
                $("#loading2").hide();
            }
        }).fail(function (){
            alert("失败!")
        }).complete(function (){
            $("#loading2").hide();
        });
        return dfd.promise();
    }
    //请求平台来源数据
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
                alert("result=0");
                $("#loading2").hide();
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
            url:window.roleInfo.url1+"giantService/report/product/productTendencyList",
            data: sendData
        }).done(function (res){
            console.log(res)
            if(res.result == 1){
                dfd.resolve(res);
                tableData = res;
                setTableData();
            }else{
                alert("result=0");
            }
        }).fail(function (){
            alert("失败!")
        }).complete(function (){
            $("#loading2").hide();
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
        ).then(function (){
            $("#loading1").hide();
            $("#loading2").hide();
        });
    }
    getData();
    //设置指标数据
    function setQuotaData(){
        var dataArr = [quotaData.appearanceCount,quotaData.propertyCount,quotaData.priceCount];
        $.fn.quotaData(dataArr);
    }
    //拆分数据
    function setChartsData(){
        defaultData();
        var legend = [];
        var xData = [];
        var serData = [];
        for(var i = 0; i < tempChartsData.data.length;i++){
            legend.push(tempChartsData.data[i].codeName);
            var temp = {
                name: tempChartsData.data[i].codeName,
                type: "line",
                smooth: true,
                //stack: '总量',
                data: []
            };
            for(var j = 0; j < tempChartsData.data[i].data.length;j++){
                if(i == 0){
                    xData.push(tempChartsData.data[i].data[j].date);
                }
                temp.data.push(tempChartsData.data[i].data[j].count);
            }
            serData.push(temp);
        }
        tempCountData.legend.data = legend;
        tempCountData.xAxis.data = xData;
        tempCountData.series = serData;
        showCharts();
    }
    //设置表格数据
    function setTableData(){
        var tableList = [];
        for(var i = 0; i < tableData.data.length;i++){
            var temp = $("<tr>" +
                "<td>"+tableData.data[i].brand+"</td>" +
                "<td>"+tableData.data[i].addActivation+"</td>" +
                "<td>"+tableData.data[i].priceCount+"</td>" +
                "<td>"+tableData.data[i].addBind+"</td>" +
                "<td>"+tableData.data[i].totalBind+"</td>" +
                "</tr>");
            tableList.push(temp);
        }
        $(".lx-container table tbody").empty().append(tableList);
        $.fn.cutPage(Math.ceil(tableData.totalCount/30),tableFilter.pageNo);
        $(".page-selection").show();
    }
    //选择分类
    function selectType(){
        var dataArr = [chartsData.appearanceData,chartsData.propertyData,chartsData.priceData];
        //选择数据分类
        $("#vipClass").children().each(function (index){
            $("#vipClass").children().eq(index).click(function (){
                $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                tempCountData.title.text = titleArr[index];
                tempChartsData = dataArr[i];
                setChartsData();
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
    //设置筛选条件
    function setFilterData(res){
        var newBrand = new setBrandData("#treeBox",res);
        $("#search-btn1").bind("click",function (){
            newBrand.showMenu(this,1);
            filter.dimension = 1;
        });
        $("#search-btn2").bind("click",function (){
            newBrand.showMenu(this,2);
            filter.dimension = 2;
        });
        $("#search-btn3").bind("click",function (){
            newBrand.showMenu(this,3);
            filter.dimension = 3;
        });
        selectFilter();
    }
    //根据时间段查询
    function selectDate(){
        $(".date-select .btn").click(function (){
            filter.beginDate = $.fn.getUserDateArea($("#dateInput1"),1);
            filter.endDate = $.fn.getUserDateArea($("#dateInput1"),0);
            getChartsData(filter);
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
            filter.dataList = filterList;
            getChartsData(filter);
        });
        //表格数据筛选
        $("#search-btn4").click(function (){
            tableFilter.dimension = 1;
            $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
            getTableData(tableFilter);
        });
        $("#search-btn5").click(function (){
            tableFilter.dimension = 2;
            $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
            getTableData(tableFilter);
        });
        $("#search-btn6").click(function (){
            tableFilter.dimension = 3;
            $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
            getTableData(tableFilter);
        });
    }
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
        selectDate();
        downloadTable();
    }
    initFun();
});