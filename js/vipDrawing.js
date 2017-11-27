$(function (){
    $.fn.pageData = function (){
        //初始化折线图
        var myEcharts1 = echarts.init(document.getElementById("echarts1"));
        // var myEcharts2 = echarts.init(document.getElementById("echarts2"));
        var myEcharts3 = echarts.init(document.getElementById("echarts3"));
        var myEcharts4 = echarts.init(document.getElementById("echarts4"));
        var myEcharts5 = echarts.init(document.getElementById("echarts5"));
        var myEcharts6 = echarts.init(document.getElementById("echarts6"));
        var myEcharts7 = echarts.init(document.getElementById("echarts7"));
        var optionData = {
            color: ["#62caec", "#ff5752", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
            toolbox:{
                show:true,
                feature : {
                    mark : {show: true},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            title:{
                text:"",
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
                bottom: "20",
                containLabel: true
            },
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#666",
                        width: 1
                    }
                },
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
            // dataZoom: [{
            //     type: "inside"
            // }],
            series: []
        };
        var optionMap = {
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x:'left',
                data:['会员数量']
            },
            dataRange: {
                min: 0,
                max: 30000,
                x: 'left',
                y: 'bottom',
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true
            },
            toolbox: {
                show: true,
                orient : 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            roamController: {
                show: true,
                x: 'right',
                mapTypeControl: {
                    'china': true
                }
            },
            series : []
        };
        var tempCountData1 = {
            title: {
                text: "性别分布"
            },
            legend: {
                data: ["性别"]
            },
            xAxis:{
                type:'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: []
            },
            series: [{
                name: "性别",
                type: "bar",
                barWidth: '40%',
                data: []
            }]
        };
        var tempCountData2 = {
            title:{
                text:"会员活跃分布"
            },
            legend: {
                data: []
            },
            xAxis:{
                data:[]
            },
            yAxis: {
                type: "value",
                axisLine: {
                    lineStyle: {
                        color: "#666",
                        width: 0
                    }
                }
            },
            series : [
                {
                    name: "性别",
                    type: "bar",
                    barWidth: '40%',
                    data: ["1000","2564","123"]
                }
            ]
        };
        var tempCountData3 = {
            title:{
                text:"来源分布"
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                orient:"horizontal",
                left: 'left',
                data: []
            },
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#666",
                        width: 0
                    }
                },
                data: []
            },
            yAxis: {
                type: "value",
                axisLine: {
                    lineStyle: {
                        color: "#666",
                        width: 0
                    }
                }
            },
            series: [{
                name: '用户来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'QRcode'},
                    {value:310, name:'app'},
                    {value:234, name:'官网'},
                    {value:135, name:'俱乐部'},
                    {value:1548, name:'其他'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        var tempCountData4 = {
            title:{
                text:"年龄分布"
            },
            legend: {
                data: ["各年龄数量"]
            },
            xAxis:{
                data:[]
            },
            series: [{
                name: "各年龄数量",
                type: "bar",
                smooth: true,
                data: []
            }]
        };
        var tempCountData5 = {
            series : [
                {
                    name: '会员数量',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[

                    ]
                }
            ]
        };
        var tempCountData6 = {
            title:{
                text:"车主比例"
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['车主','非车主']
            },
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#666",
                        width: 0
                    }
                },
                data: []
            },
            yAxis: {
                type: "value",
                axisLine: {
                    lineStyle: {
                        color: "#666",
                        width: 0
                    }
                }
            },
            series: [{
                name: '车主比例',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'车主'},
                    {value:310, name:'非车主'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        var tempCountData7 = {
            title:{
                text:"标签分析"
            },
            legend: {
                data: ["标签"]
            },
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#666",
                        width: 0
                    }
                },
                data: []
            },
            yAxis: {
                type: "value",
                axisLine: {
                    lineStyle: {
                        color: "#666",
                        width: 0
                    }
                }
            },
            series: [{
                type: 'wordCloud',
                size: ['80%', '80%'],
                // textRotation : [0, 45, 90, -45],
                textPadding: 10,
                autoSize: {
                    enable: true,
                    minSize: 4,
                    maxSize: 26
                },
                textStyle: {
                    normal: {
                        color: function () {
                            var colors = ['#fda67e', '#81cacc', '#cca8ba', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                            return colors[parseInt(Math.random() * 10)];
                        }
                    },
                    emphasis : {
                        shadowBlur : 10,
                        shadowColor : '#ddd'
                    }
                },
                data:[]
            }]
        };
        //mock数据
        var sexData,mapData,areaData,fromData,ageData,carData,tagData;
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
            beginDate: getDateArea(1),
            endDate: getDateArea(0),
            type:"1",
            pageNo: 1,
            pageSize: 10
        };
        //请求性别数据
        function getSexData(sendData){
            var dfd = $.Deferred();
            $.ajax({
                url:window.roleInfo.url2+"giantService/report/dataDraw/sex",
                data: sendData
            }).done(function (res){
                if(res.result == 1){
                    dfd.resolve(res);
                }else{
                    alert("result=0");
                }
            }).fail(function (){
                alert("失败!")
            });
            return dfd.promise();
        }
        //请求来源数据
        function getFromData(sendData){
            var dfd = $.Deferred();
            $.ajax({
                url:window.roleInfo.url2+"giantService/report/dataDraw/from",
                data: sendData
            }).done(function (res){
                if(res.result == 1){
                    dfd.resolve(res);
                }else{
                    alert("result=0");
                }
            }).fail(function (){
                alert("失败!")
            });
            return dfd.promise();
        }
        //请求年龄数据
        function getAgeData(sendData){
            var dfd = $.Deferred();
            $.ajax({
                url:window.roleInfo.url2+"giantService/report/dataDraw/age",
                data: sendData
            }).done(function (res){
                if(res.result == 1){
                    dfd.resolve(res);
                }else{
                    alert("result=0");
                }
            }).fail(function (){
                alert("失败!")
            });
            return dfd.promise();
        }
        //请求地图数据
        function getMapData(sendData){
            var dfd = $.Deferred();
            $.ajax({
                url:window.roleInfo.url2+"giantService/report/dataDraw/mapData",
                data: sendData
            }).done(function (res){
                console.log(res)
                if(res.result == 1){
                    dfd.resolve(res);
                }else{
                    alert("result=0");
                }
            }).fail(function (){
                alert("失败!")
            });
            return dfd.promise();
        }
        //请求地区数据
        function getAreaData(sendData){
            $("#loading2").show();
            var dfd = $.Deferred();
            $.ajax({
                url:window.roleInfo.url2+"giantService/report/dataDraw/source",
                data: sendData
            }).done(function (res){
                if(res.result == 1){
                    dfd.resolve(res);
                    areaData = res;
                    setAreaData();
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
        //请求车主比例数据
        function getCarData(sendData){
            var dfd = $.Deferred();
            $.ajax({
                url:window.roleInfo.url2+"giantService/report/dataDraw/carMember",
                data: sendData
            }).done(function (res){
                if(res.result == 1){
                    dfd.resolve(res);
                }else{
                    alert("result=0");
                }
            }).fail(function (){
                alert("失败!")
            });
            return dfd.promise();
        }
        //请求标签数据
        function getTagData(sendData){
            var dfd = $.Deferred();
            $.ajax({
                url:window.roleInfo.url2+"giantService/report/dataDraw/labels",
                data: sendData
            }).done(function (res){
                console.log(res);
                if(res.result == 1){
                    dfd.resolve(res);
                }else{
                    alert("result=0");
                }
            }).fail(function (){
                alert("失败!")
            });
            return dfd.promise();
        }
        //所有数据都成功之后的回调函数
        function getData(){
            $("#loading1").show();
            $("#loading2").show();
            $.when(
                getSexData(filter),
                getFromData(filter),
                getAgeData(filter),
                getMapData(filter),//地图数据
                getAreaData(filter),//表格数据
                getCarData(filter),//车主比例
                getTagData(filter)
            ).done(function (
                res1,
                res2,
                res3,
                res4,
                res5,
                res6,
                res7
            ){
                sexData = res1;
                setSexData();
                fromData = res2;
                setFromData();
                ageData = res3;
                setAgeData();
                mapData = res4;
                setMapData();
                areaData = res5;
                setAreaData();
                carData = res6;
                setCarData();
                tagData = res7;
                setTagData();
            }).fail(function (res){
                //alert("获取不成功");
            }).then(function (){
                $("#loading1").hide();
                $("#loading2").hide();
            });
        }
        //设置性别
        function setSexData(){
            var sexName = ["男","女","保密"];
            var sex = [];
            var count = [];
            for(var i = 0; i < sexData.data.length;i++){
                if(sexData.data[i].sex != "" && sexData.data[i].sex != null){
                    sex.push(sexName[parseInt(sexData.data[i].sex)]);
                    count.push(sexData.data[i].count);
                }
            }
            tempCountData1.xAxis.data = sex;
            tempCountData1.series[0].data = count;
            showCharts();
        }
        //设置用户来源
        function setFromData(){
            var tempData = [];
            var legendData = [];
            for(var i = 0; i < fromData.data.length;i++){
                tempData.push({
                    name:fromData.data[i].name,
                    value:fromData.data[i].count
                });
                legendData.push(fromData.data[i].name);
            }
            tempCountData3.series[0].data = tempData;
            tempCountData3.legend.data = legendData;
            showCharts();
        }
        //设置年龄
        function setAgeData(){
            var ageArr = ["14岁以下","15-24","25-40","41-55","56-65","66以上","其他"];
            tempCountData4.xAxis.data = ageArr;
            tempCountData4.series[0].data.push(ageData.data.one);
            tempCountData4.series[0].data.push(ageData.data.two);
            tempCountData4.series[0].data.push(ageData.data.three);
            tempCountData4.series[0].data.push(ageData.data.four);
            tempCountData4.series[0].data.push(ageData.data.five);
            tempCountData4.series[0].data.push(ageData.data.six);
            tempCountData4.series[0].data.push(ageData.data.other);
            showCharts();
        }
        //设置地图数据
        function setMapData(){
            //获取数组对象中最大的数取整
            function getMaxCount(){
                var tempData = mapData.data;
                var maxNum = 0;
                for(var i = 0; i < tempData.length;i++){
                    if(tempData[i].count>maxNum){
                        maxNum = tempData[i].count;
                    }
                }
                return Math.ceil(maxNum/10)*10;
            }
            var mapList = [];
            for(var i = 0; i < mapData.data.length;i++){
                var temp = {
                    name: mapData.data[i].name,
                    value: mapData.data[i].count
                };
                mapList.push(temp);
            }
            optionMap.dataRange.max = getMaxCount();
            tempCountData5.series[0].data = mapList;
            showCharts();
        }
        //地区分布
        function setAreaData(){
            var data = areaData.data;
            var tableList = [];
            for(var i = 0; i < data.length;i++){
                var temp = $("<tr>" +
                    "<td>"+data[i].name+"</td>" +
                    "<td>"+setSplit(data[i].count)+"</td>" +
                    "<td>"+((data[i].proportion)*100).toFixed(2)+"%"+"</td>" +
                    "</tr>");
                tableList.push(temp);
            }
            $(".city-container table tbody").empty().append(tableList);
            $.fn.cutPage(Math.ceil(areaData.count/10),filter.pageNo);
            $(".page-selection").show();
            showCharts();
        }
        //切换城市还是省份
        function changeCity(){
            $(".city-box").children("div").each(function (index){
                $(".city-box").children("div").eq(index).click(function (){
                    $(this).removeClass("btn-default").addClass("btn-primary").siblings().removeClass("btn-primary").addClass("btn-default");
                    if(index == 0){//省份
                        $("#city").text("省份");
                        filter.type = 1;
                        filter.pageNo = 1;
                        getAreaData(filter);
                    }else{//城市
                        $("#city").text("城市");
                        filter.type = 2;
                        filter.pageNo = 1;
                        getAreaData(filter);
                    }
                });
            });
        }
        changeCity();
        //设置车主比例
        function setCarData(){
            var nameArr = ["车主","非车主"];
            var tempData = [];
            var legendData = [];
            for(var i = 0; i < carData.data.length;i++){
                tempData.push({
                    name:carData.data[i].code=="general"?nameArr[1]:nameArr[0],
                    value:carData.data[i].count
                });
                legendData.push(carData.data[i].name);
            }
            tempCountData6.series[0].data = tempData;
            tempCountData6.legend.data = legendData;
            showCharts();
        }
        //设置标签云图
        function setTagData(){
            var tagData = {
                data:[
                    {
                        name:"阳光",
                        count:"17"
                    },
                    {
                        name:"IT民工",
                        count:"74"
                    },
                    {
                        name:"80后",
                        count:"47"
                    },
                    {
                        name:"自由职业",
                        count:"19"
                    },
                    {
                        name:"农民工",
                        count:"85"
                    },
                    {
                        name:"骑行爱好者",
                        count:"7"
                    },
                    {
                        name:"浪漫主义",
                        count:"36"
                    },
                    {
                        name:"奋斗",
                        count:"125"
                    },
                    {
                        name:"90后",
                        count:"13"
                    }
                ]
            };
            var tempData = [];
            for(var i = 0; i < tagData.data.length;i++){
                // var tempName = tagData.data[i].name.substring(0,tagData.data[i].name.indexOf("["));
                var tempName = tagData.data[i].name;
                tempData.push({
                    name:tempName,
                    value:tagData.data[i].count
                });
            }
            tempCountData7.series[0].data = tempData;
            showCharts();
        }
        //时间选择
        $(".date-select .btn").click(function (){
            filter.beginDate = $.fn.getUserDateArea($("#dateInput"),1);
            filter.endDate = $.fn.getUserDateArea($("#dateInput"),0);
            defaultData();
            getData();
        });
        //选页
        window.selectPage = function (n){
            if(n > 0 && n <= Math.ceil(areaData.count/10)) {
                $.fn.cutPage(Math.ceil(areaData.count/10), n);
                filter.pageNo = n;
                getAreaData(filter);
            }else{
                alert("没有更多了^_^");
            }
        };
        //跳转页
        $(".page-select .btn").click(function (){
            var page = parseInt($(".page-select input[type=number]").val());
            var reg = /([1-9]\d+)|[1-9]/;
            if(reg.test(page) && page > 0){
                if(page > Math.ceil(areaData.count/10)){
                    alert("输入的页数超过了最大页数!请重新输入!");
                }else{
                    filter.pageNo = page;
                    getAreaData(filter);
                }
            }else{
                alert("请输入大于0的正整数!");
            }
        });
        //初始化数据
        function defaultData() {
            tempCountData1.xAxis.data = [];
            tempCountData1.series[0].data = [];
            tempCountData1.legend.data = [];
            tempCountData2.xAxis.data = [];
            tempCountData2.series[0].data = [];
            tempCountData2.legend.data = [];
            tempCountData3.xAxis.data = [];
            tempCountData3.series[0].data = [];
            tempCountData3.legend.data = [];
            tempCountData4.xAxis.data = [];
            tempCountData4.series[0].data = [];
            tempCountData4.legend.data = [];
            tempCountData5.series[0].data = [];
            tempCountData6.xAxis.data = [];
            tempCountData6.series[0].data = [];
            tempCountData6.legend.data = [];
            tempCountData7.xAxis.data = [];
            tempCountData7.series[0].data = [];
            tempCountData7.legend.data = [];
        }
        //展示图表数据
        function showCharts(){
            var newData1 = $.extend(true,{},optionData,tempCountData1);
            // var newData2 = $.extend(true,{},optionData,tempCountData2);
            var newData3 = $.extend(true,{},optionData,tempCountData3);
            var newData4 = $.extend(true,{},optionData,tempCountData4);
            var newData5 = $.extend(true,{},optionMap,tempCountData5);
            var newData6 = $.extend(true,{},optionData,tempCountData6);
            var newData7 = $.extend(true,{},optionData,tempCountData7);
            myEcharts1.setOption(newData1);
            // myEcharts2.setOption(newData2);
            myEcharts3.setOption(newData3);
            myEcharts4.setOption(newData4);
            myEcharts5.setOption(newData5);
            myEcharts6.setOption(newData6);
            myEcharts7.clear();
            myEcharts7.setOption(newData7);

            setTimeout(function (){
                myEcharts1.resize();
                // myEcharts2.resize();
                myEcharts3.resize();
                myEcharts4.resize();
                myEcharts5.resize();
                myEcharts6.resize();
                //myEcharts7.resize();
            },200);
        }
        $(window).resize(function (){
            myEcharts1.resize();
            // myEcharts2.resize();
            myEcharts3.resize();
            myEcharts4.resize();
            myEcharts5.resize();
            myEcharts6.resize();
            myEcharts7.resize();
        });
        //初始化页面
        function initFun(){
            getData();
        }
        initFun();
    };
    //回调函数
    $.fn.isSign($.fn.pageData);
});