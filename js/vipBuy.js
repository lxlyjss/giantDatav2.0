$(function (){
    // $.fn.isSign();
    //初始化折线图
    var myEcharts1 = echarts.init(document.getElementById("myEcharts1"));
    var myEcharts2 = echarts.init(document.getElementById("myEcharts2"));
    var optionData1 = {
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
            text:"会员消费能力柱状图",
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
            axisLine: {
                lineStyle: {
                    color: "#666",
                    width: 1
                }
            },
            // boundaryGap: false,//显示是否在刻度上
            data: []
        },
        yAxis: {
            type: "value",
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
        series: [{

        }]
    };
    var optionData2 = {
        title : {
            text: '会员消费能力占比',
            subtext: '消费能力',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
            top: "50",
            data: []
        },
        series : []
    };
    var tempCountData1 = {
        legend: {
            //data: ["1000以下","1000-2000","2000-3000","3000-5000","5000以上"]
            data: []
        },
        xAxis:{
            data:[
                //"1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"
            ]
        },
        series: [
            // {
            //     name: "1000以下",
            //     type: "bar",
            //     smooth: true,
            //     stack: '总量',
            //     data: [
            //         "2000","1522","2355","866","1489","3366","1422","2155","2866","3489","2366","1236"
            //     ]
            // },
            // {
            //     name: "1000-2000",
            //     type: "bar",
            //     smooth: true,
            //     stack: '总量',
            //     data: [
            //         "2000","1522","2355","866","1489","3366","1422","2155","2866","3489","2366","1236"
            //     ]
            // },
            // {
            //     name: "2000-3000",
            //     type: "bar",
            //     smooth: true,
            //     stack: '总量',
            //     data: [
            //         "2000","1522","2355","866","1489","3366","1422","2155","2866","3489","2366","1236"
            //     ]
            // },
            // {
            //     name: "3000-5000",
            //     type: "bar",
            //     smooth: true,
            //     stack: '总量',
            //     data: [
            //         "2000","1522","2355","866","1489","3366","1422","2155","2866","3489","2366","1236"
            //     ]
            // },
            // {
            //     name: "5000以上",
            //     type: "bar",
            //     smooth: true,
            //     stack: '总量',
            //     data: [
            //         "2000","1522","2355","866","1489","3366","1422","2155","2866","3489","2366","1236"
            //     ]
            // },
        ]
    };
    var tempCountData2 = {
        legend: {
            data: []
        },
        series : [
            {
                name: '',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    var quotaData,chartsData,tableData;
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
    //设置筛选条件
    var filter = {
        role:window.roleInfo.role,
        roleCode:window.roleInfo.roleCode,
        beginDate:getDateArea(1),
        endDate:getDateArea(0),
        type:"1",//会员数据类型
        dateType:"1"//时间类型
    };
    var tableFilter = {
        role:window.roleInfo.role,
        roleCode:window.roleInfo.roleCode,
        pageNo:"1",
        pageSize:"30",
        beginDate:getDateArea(1),
        endDate:getDateArea(0)
    };
    //请求指标数据
    function getQuotaData(sendData){
        $("#loading2").show();
        var dfd = $.Deferred();
        $.ajax({
            url:window.roleInfo.url1+"giantService/report/consumptionTarget",
            data: sendData
        }).done(function (res){
            console.log(res)
            if(res.result == 1){
                dfd.resolve(res);
                quotaData = res;
                setQuotaData();
            }else{
                alert("result=0");
            }
        }).complete(function (){
            $("#loading2").hide();
        });
        return dfd.promise();
    }
    //请求柱状图数据
    function getChartsData(sendData){
        $("#loading2").show();
        var dfd = $.Deferred();
        $.ajax({
            url:window.roleInfo.url1+"giantService/report/consumption",
            data: sendData
        }).done(function (res){
            console.log(res)
            if(res.result == 1){
                dfd.resolve(res);
                chartsData = res;
                setChartsData();
                setPieData(0);
            }else{
                alert("result=0");
            }
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
            url:window.roleInfo.url1+"giantService/report/consumptionList",
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
            getTableData(tableFilter)
        ).then(function (){
            $("#loading1").hide();
            $("#loading2").hide();
        });
    }
    //设置表格数据
    function setTableData(){
        var data = tableData.data;
        var tableList = [];
        for(var i = 0; i < data.length;i++){
            var temp = $("<tr>" +
                "<td>"+data[i].date+"</td>" +
                "<td>"+data[i].bikeCount+"</td>" +
                "<td>"+data[i].productCount+"</td>" +
                "<td>"+data[i].userCount+"</td>" +
                "</tr>");
            tableList.push(temp);
        }
        $(".lx-container table tbody").empty().append(tableList);
        $.fn.cutPage(Math.ceil(tableData.totalCount/30), tableFilter.pageNo);
        $(".page-selection").show();
    }
    //选页
    window.selectPage = function (n){
        if(n > 0 && n <= Math.ceil(tableData.totalCount/30)) {
            $.fn.cutPage(Math.ceil(tableData.totalCount/30), n);
            tableFilter.pageNo = n;
            getTableData(tableFilter);
        }else{
            alert("没有更多了^_^");
        }
    };
    //跳转页
    $(".page-select .input-group-btn .btn").click(function (){
        $.fn.cutPage(Math.ceil(tableData.totalCount/30), $("#pageNo").val());
        tableFilter.pageNo = $("#pageNo").val();
        getTableData(tableFilter);
    });
    //设置柱状图数据
    function setChartsData(){
        console.log(chartsData);
        defaultData();
        var legend = [];
        var xData = [];
        var serData = [];
        for(var i = 0; i < chartsData.data.length;i++){
            legend.push(chartsData.data[i].level);
            var temp = {
                name: chartsData.data[i].level,
                type: "bar",
                smooth: true,
                stack: '总量',
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
        tempCountData1.legend.data = legend;
        tempCountData1.xAxis.data = xData;
        tempCountData1.series = serData;
        showCharts();
    }
    //设置饼状图
    function setPieData(index){
        var legend = [];
        var serData = [];
        for(var i = 0; i < chartsData.data.length;i++){
            legend.push(chartsData.data[i].level);
            var temp = {
                name: chartsData.data[i].level,
                value: ""
            };
            for(var j = 0; j < chartsData.data[i].data.length;j++){
                if(j == index){
                    temp.value = chartsData.data[i].data[j].count;
                    tempCountData2.series[0].name = chartsData.data[i].data[j].date
                }
            }
            serData.push(temp);
        }
        tempCountData2.legend.data = legend;
        tempCountData2.series[0].data = serData;
        showPieCharts();
    }
    //展示饼状图数据
    function showPieCharts(){
        var newData2 = $.extend(true,{},optionData2,tempCountData2);
        myEcharts2.setOption(newData2);
    }
    //设置关键指标
    function setQuotaData(){
        var vipBoxChild = $("#buyData").children("div");
        function arrow(count){
            if(count>0){
                return "<img src=\"img/arrow-up.png\" class=\"arrow-change\">"
            }else if(count < 0){
                return "<img src=\"img/arrow-down.png\" class=\"arrow-change\">"
            }else if(count == 0){
                return "";
            }
        }
        function setData(ele,data){
            // if(data != 0){
                ele.text(data+"%");
            // }else{
            //     ele.text("0%");
            // }
        }
        function setArrow(ele,data){
            ele.html(data)
        }
        //新增会员
        vipBoxChild.eq(0).children("p").eq(1).text(quotaData.UserCount.count);
        setData(vipBoxChild.eq(0).children("p").eq(2).children(".count"),quotaData.UserCount.day);
        setData(vipBoxChild.eq(0).children("p").eq(3).children(".count"),quotaData.UserCount.week);
        setData(vipBoxChild.eq(0).children("p").eq(4).children(".count"),quotaData.UserCount.month);

        setArrow(vipBoxChild.eq(0).children("p").eq(2).children(".arrow"),arrow(quotaData.UserCount.day));
        setArrow(vipBoxChild.eq(0).children("p").eq(3).children(".arrow"),arrow(quotaData.UserCount.week));
        setArrow(vipBoxChild.eq(0).children("p").eq(4).children(".arrow"),arrow(quotaData.UserCount.month));
        //流失会员
        vipBoxChild.eq(1).children("p").eq(1).text(quotaData.BikeCount.count);
        setData(vipBoxChild.eq(1).children("p").eq(2).children(".count"),quotaData.BikeCount.day);
        setData(vipBoxChild.eq(1).children("p").eq(3).children(".count"),quotaData.BikeCount.week);
        setData(vipBoxChild.eq(1).children("p").eq(4).children(".count"),quotaData.BikeCount.month);

        setArrow(vipBoxChild.eq(1).children("p").eq(2).children(".arrow"),arrow(quotaData.BikeCount.day));
        setArrow(vipBoxChild.eq(1).children("p").eq(3).children(".arrow"),arrow(quotaData.BikeCount.week));
        setArrow(vipBoxChild.eq(1).children("p").eq(4).children(".arrow"),arrow(quotaData.BikeCount.month));
        //累计会员
        vipBoxChild.eq(2).children("p").eq(1).text(quotaData.ProductCount.count);
        setData(vipBoxChild.eq(2).children("p").eq(2).children(".count"),quotaData.ProductCount.day);
        setData(vipBoxChild.eq(2).children("p").eq(3).children(".count"),quotaData.ProductCount.week);
        setData(vipBoxChild.eq(2).children("p").eq(4).children(".count"),quotaData.ProductCount.month);

        setArrow(vipBoxChild.eq(2).children("p").eq(2).children(".arrow"),arrow(quotaData.ProductCount.day));
        setArrow(vipBoxChild.eq(2).children("p").eq(3).children(".arrow"),arrow(quotaData.ProductCount.week));
        setArrow(vipBoxChild.eq(2).children("p").eq(4).children(".arrow"),arrow(quotaData.ProductCount.month));
    }
    //选择会员分类
    function selectType(){
        $("#vipClass").children().each(function (index){
            $("#vipClass").children().eq(index).click(function (){
                $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                filter.type = String(index+1);
                getChartsData(filter);
            });
        });
        //选择日期分类
        $("#dateClass").children().each(function (index){
            $("#dateClass").children().eq(index).click(function (){
                $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                filter.dateType = String(index+1);
                getChartsData(filter);
            });
        });
    }
    //时间1选择
    function dateSelect(){
        $(".date-select").eq(0).children(".input-group-btn").children(".btn").click(function (){
            filter.beginDate = $.fn.getUserDateArea($("#dateInput1"),1);
            filter.endDate = $.fn.getUserDateArea($("#dateInput1"),0);
            getChartsData(filter);
        });
        //时间2选择
        $(".date-select").eq(1).children(".input-group-btn").children(".btn").click(function (){
            tableFilter.beginDate = $.fn.getUserDateArea($("#dateInput2"),1);
            tableFilter.endDate = $.fn.getUserDateArea($("#dateInput2"),0);
            tableFilter.pageNo = 1;
            getTableData(tableFilter);
        });
    }
    //下载表格
    function downloadTable(){
        $("#download").click(function (){
            var beginDate = $.fn.getUserDateArea($("#dateInput2"),1);
            var endDate = $.fn.getUserDateArea($("#dateInput2"),0);
            window.location.href = window.roleInfo.url1+
                "giantService/report/exportConsumptionPower?"+
                "role="+window.roleInfo.role+
                "&roleCode="+window.roleInfo.roleCode+
                "&beginDate="+beginDate+
                "&endDate="+endDate
        });
    };
    //初始化数据
    function defaultData(){
        tempCountData1.xAxis.data = [];
        tempCountData1.series = [];
        tempCountData1.legend.data = [];
        tempCountData2.series[0].data = [];
        tempCountData2.legend.data = [];
    }
    //展示图表数据
    function showCharts(){
        var newData1 = $.extend(true,{},optionData1,tempCountData1);
        var newData2 = $.extend(true,{},optionData2,tempCountData2);
        myEcharts1.setOption(newData1);
        myEcharts2.setOption(newData2);
        setTimeout(function (){
            myEcharts1.resize();
            myEcharts2.resize();
        },200);
    }
    //柱状图的点击事件
    myEcharts1.on("click", eConsole);
    function eConsole(param){
        //获取点击的第几个柱状图
        var index = param.dataIndex;
        setPieData(index);
    }
    $(window).resize(function (){
        myEcharts1.resize();
        myEcharts2.resize();
    });
    //初始化页面
    function initFun(){
        getData();
        downloadTable();
        selectType();
        dateSelect();
    }
    initFun();
});