$(function () {
    $.fn.pageData = function () {
        //初始化折线图
        var myEcharts = echarts.init(document.getElementById("myEcharts"));
        var optionData = {
            color: ["#62caec", "#ff5752", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            title: {
                text: "捷安特会员数量变化趋势图",
                left: "center"
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
                x: "right",
                y: "15"
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
            title: {
                text: "捷安特QRcode激活量趋势图"
            },
            legend: {
                data: []
            },
            xAxis: {
                data: []
            },
            series: [{
                name: "绑定数量",
                type: "line",
                smooth: true,
                data: []
            }]
        };
        var quotaData, chartsData, tableData, filterData;//存储总数据
        var tempChartsData;//存储临时图表数据
        var tempTableData;//存储临时表格数据
        var titleArr = [
            "捷安特产品外观评价均分趋势图",
            "捷安特产品性能评价均分趋势图",
            "捷安特产品价格评价均分趋势图"
        ];
        var data = {
            appearanceData: [
                {
                    brand: "捷安特",
                    data: [
                        {
                            date: "2017-10-12",
                            count: "87878"
                        },
                        {
                            date: "2017-10-13",
                            count: "87878"
                        },
                        {
                            date: "2017-10-14",
                            count: "87878"
                        }
                    ]
                },
                {
                    brand: "莫曼顿",
                    data: [
                        {
                            date: "2017-10-12",
                            count: "87878"
                        },
                        {
                            date: "2017-10-13",
                            count: "87878"
                        },
                        {
                            date: "2017-10-14",
                            count: "87878"
                        }
                    ]
                }
            ],
            propertyData: [
                {
                    brand: "捷安特",
                    data: [
                        {
                            date: "2017-10-12",
                            count: "87878"
                        },
                        {
                            date: "2017-10-13",
                            count: "87878"
                        },
                        {
                            date: "2017-10-14",
                            count: "87878"
                        }
                    ]
                },
                {
                    brand: "莫曼顿",
                    data: [
                        {
                            date: "2017-10-12",
                            count: "87878"
                        },
                        {
                            date: "2017-10-13",
                            count: "87878"
                        },
                        {
                            date: "2017-10-14",
                            count: "87878"
                        }
                    ]
                }
            ],
            priceData: [
                {
                    brand: "捷安特",
                    data: [
                        {
                            date: "2017-10-12",
                            count: "87878"
                        },
                        {
                            date: "2017-10-13",
                            count: "87878"
                        },
                        {
                            date: "2017-10-14",
                            count: "87878"
                        }
                    ]
                },
                {
                    brand: "莫曼顿",
                    data: [
                        {
                            date: "2017-10-12",
                            count: "87878"
                        },
                        {
                            date: "2017-10-13",
                            count: "87878"
                        },
                        {
                            date: "2017-10-14",
                            count: "87878"
                        }
                    ]
                }
            ]
        };

        //获取默认时间
        function getDateArea(type) {
            var beginDate = moment().subtract(30, 'days').format("YYYY-MM-DD");
            var endDate = moment().subtract(1, 'days').format("YYYY-MM-DD");
            if (type == 1) {
                return beginDate;
            } else {
                return endDate;
            }
        }

        var filter = {
            role: window.roleInfo.role,
            roleCode: window.roleInfo.roleCode,
            beginDate: getDateArea(1),
            endDate: getDateArea(0),
            dataList: [
                {
                    name: "捷安特",
                    code: "3",
                    type: "2"
                },
                {
                    name: "莫曼顿",
                    code: "1",
                    type: "2"
                },
                {
                    name: "liv",
                    code: "2",
                    type: "2"
                },
                {
                    name: "MMT电动车",
                    code: "1",
                    type: "1"
                },
                {
                    name: "Giant电动车",
                    code: "2",
                    type: "1"
                }
            ],//型号列表
            dimension: 1,//产品类型1,品牌,2车系,3车型
            dateType: 1//时间类型
        };
        var tableFilter = {
            role: window.roleInfo.role,
            roleCode: window.roleInfo.roleCode,
            beginDate: getDateArea(1),
            endDate: getDateArea(0),
            dimension: 1,//产品类型1,品牌,2车系,3车型
            pageNo: 1,
            pageSize: 30
        };

        //请求图表数据
        function getChartsData(sendData) {
            if (sendData.dataList == "" || sendData.dataList == null) {
                alert("请选择一个品牌或车系或车型");
                return;
            }
            $("#loading2").show();
            var dfd = $.Deferred();
            var nowSend = $.extend(true, {}, sendData);
            nowSend.dataList = JSON.stringify(sendData.dataList);
            $.ajax({
                url: window.roleInfo.url1 + "giantService/report/product/productTendency",
                data: nowSend,
                dataType: "json",
                type: "post"
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    chartsData = res;
                    selectType();
                    tempChartsData = cutChartsData(chartsData, filter.dimension);
                    setChartsData();
                } else {
                    alert("result=0");
                    $("#loading2").hide();
                }
            }).fail(function () {
                alert("失败!")
            }).complete(function () {
                $("#loading2").hide();
            });
            return dfd.promise();
        }

        //请求指标数据
        function getQuotaData(sendData) {
            $("#loading2").show();
            var dfd = $.Deferred();
            $.ajax({
                url: window.roleInfo.url1 + "giantService/report/product/productEvaluateTarget",
                data: sendData
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    quotaData = res;
                    setQuotaData();
                } else {
                    alert("result=0");
                    $("#loading2").hide();
                }
            }).fail(function () {
                alert("失败!")
            }).complete(function () {
                $("#loading2").hide();
            });
            return dfd.promise();
        }

        //请求筛选数据
        function getFilterData() {
            $("#loading2").show();
            var dfd = $.Deferred();
            $.ajax({
                url: window.roleInfo.url1 + "giantService/report/selectBikeType"
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    setFilterData(res);
                } else {
                    alert("result=0");
                }
            }).fail(function () {
                alert("失败!")
            }).complete(function () {
                $("#loading2").hide();
            });
            return dfd.promise();
        }

        //请求表格数据
        function getTableData(sendData) {
            $("#loading2").show();
            var dfd = $.Deferred();
            $.ajax({
                url: window.roleInfo.url1 + "giantService/report/product/productTendencyList",
                data: sendData
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    tableData = res;
                    tempTableData = cutTableData(tableData.data, tableFilter.pageNo, tableFilter.pageSize);
                    setTableData();
                } else {
                    alert("result=0");
                }
            }).fail(function () {
                alert("失败!")
            }).complete(function () {
                $("#loading2").hide();
            });
            return dfd.promise();
        }

        //所有数据都成功之后的回调函数
        function getData() {
            $.when(
                getQuotaData(filter),
                getChartsData(filter),
                getTableData(tableFilter),
                getFilterData()
            ).then(function () {
                $("#loading1").hide();
                $("#loading2").hide();
            });
        }

        getData();

        //设置指标数据
        function setQuotaData() {
            quotaData.appearanceCount.count /= 100;
            quotaData.propertyCount.count /= 100;
            quotaData.priceCount.count /= 100;
            var dataArr = [
                quotaData.appearanceCount,
                quotaData.propertyCount,
                quotaData.priceCount
            ];
            $.fn.quotaData(dataArr);
        }

        //拆分总数据
        function cutChartsData(data, index) {
            if (index == 1) {
                return data.appearanceData;
            } else if (index == 2) {
                return data.propertyData;
            } else if (index == 3) {
                return data.priceData;
            } else {
                return null;
            }
        }

        //拆分数据
        function setChartsData() {
            defaultData();
            var legend = [];
            var xData = [];
            var serData = [];
            for (var i = 0; i < tempChartsData.length; i++) {
                legend.push(tempChartsData[i].brand);
                var temp = {
                    name: tempChartsData[i].brand,
                    type: "line",
                    smooth: true,
                    //stack: '总量',
                    data: []
                };
                for (var j = 0; j < tempChartsData[i].data.length; j++) {
                    if (i == 0) {
                        xData.push(tempChartsData[i].data[j].date);
                    }
                    temp.data.push(tempChartsData[i].data[j].count / 100);
                }
                serData.push(temp);
            }
            tempCountData.legend.data = legend;
            tempCountData.xAxis.data = xData;
            tempCountData.series = serData;
            showCharts();
        }

        //拆分表格数据
        function cutTableData(data, pageNo, pageSize) {
            var newArr = [];
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (i >= pageSize * (pageNo - 1) && i < pageSize * (pageNo)) {
                        if (data[i] != "undefined") {
                            newArr.push(data[i]);
                        }
                    }
                }
            }
            ;
            return newArr;
        };

        //设置表格数据
        function setTableData() {
            var tableList = [];
            for (var i = 0; i < tempTableData.length; i++) {
                var temp = $("<tr>" +
                    "<td>" + tempTableData[i].name + "</td>" +
                    "<td>" + tempTableData[i].appearanceScore / 100 + "</td>" +
                    "<td>" + tempTableData[i].propertyScore / 100 + "</td>" +
                    "<td>" + tempTableData[i].priceScore / 100 + "</td>" +
                    "</tr>");
                tableList.push(temp);
            }
            $(".lx-container table tbody").empty().append(tableList);
            $.fn.cutPage(Math.ceil(tableData.totalCount / 30), tableFilter.pageNo);
            $(".page-selection").show();
        }

        //选择分类
        function selectType() {
            var dataArr = [
                chartsData.appearanceData,
                chartsData.propertyData,
                chartsData.priceData
            ];
            //选择数据分类
            $("#vipClass").children().each(function (index) {
                $("#vipClass").children().eq(index).click(function () {
                    $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                    tempCountData.title.text = titleArr[index];
                    tempChartsData = dataArr[index];
                    setChartsData();
                });
            });
            //选择日期分类
            $("#dateClass").children().each(function (index) {
                $("#dateClass").children().eq(index).click(function () {
                    $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                    filter.dateType = index + 1;
                    getChartsData(filter);
                });
            });
        }

        //设置筛选条件
        function setFilterData(res) {
            var newBrand = new setBrandData("#treeBox", res);
            $("#search-btn1").bind("click", function () {
                newBrand.showMenu(this, 1);
                filter.dimension = 1;
                filter.dataList = [];
            });
            $("#search-btn2").bind("click", function () {
                newBrand.showMenu(this, 2);
                filter.dimension = 2;
                filter.dataList = [];
            });
            $("#search-btn3").bind("click", function () {
                newBrand.showMenu(this, 3);
                filter.dimension = 3;
                filter.dataList = [];
            });
            selectFilter();
        }

        //根据时间段查询
        function selectDate() {
            $(".date-select").eq(0).children(".input-group-btn").children(".btn").click(function () {
                filter.beginDate = $.fn.getUserDateArea($("#dateInput1"), 1);
                filter.endDate = $.fn.getUserDateArea($("#dateInput1"), 0);
                getChartsData(filter);
            });
            //时间2选择
            $(".date-select").eq(1).children(".input-group-btn").children(".btn").click(function () {
                tableFilter.beginDate = $.fn.getUserDateArea($("#dateInput2"), 1);
                tableFilter.endDate = $.fn.getUserDateArea($("#dateInput2"), 0);
                tableFilter.pageNo = 1;
                getTableData(tableFilter);
            });
        }

        //选页
        window.selectPage = function (n) {
            if (n > 0 && n <= Math.ceil(tableData.totalCount / 30)) {
                $.fn.cutPage(Math.ceil(tableData.totalCount / 30), n);
                tableFilter.pageNo = n;
                tempTableData = cutTableData(tableData.data, tableFilter.pageNo, tableFilter.pageSize);
                setTableData();
            } else {
                alert("没有更多了^_^");
            }
        };
        //跳转页
        $(".page-select .btn").click(function () {
            var page = parseInt($(".page-select input[type=number]").val());
            var reg = /([1-9]\d+)|[1-9]/;
            if (reg.test(page) && page > 0) {
                if (page > Math.ceil(tableData.totalCount / 30)) {
                    alert("输入的页数超过了最大页数!请重新输入!");
                } else {
                    tableFilter.pageNo = page;
                    tempTableData = cutTableData(tableData.data, tableFilter.pageNo, tableFilter.pageSize);
                    setTableData();
                }
            } else {
                alert("请输入大于0的正整数!");
            }
        });

        //下载表格
        function downloadTable() {
            $("#download").click(function () {
                var beginDate = $.fn.getUserDateArea($("#dateInput2"), 1);
                var endDate = $.fn.getUserDateArea($("#dateInput2"), 0);
                window.location.href = window.roleInfo.url1 +
                    "giantService/report/product/exportProductTendencyList?" +
                    "role=" + window.roleInfo.role +
                    "&roleCode=" + window.roleInfo.roleCode +
                    "&beginDate=" + beginDate +
                    "&endDate=" + endDate +
                    "&dimension=" + tableFilter.dimension
            });
        };

        //筛选品牌之后
        function selectFilter() {
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
            $("#search-btn4").click(function () {
                tableFilter.dimension = 1;
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                tableFilter.pageNo = 1;
                getTableData(tableFilter);
            });
            $("#search-btn5").click(function () {
                tableFilter.dimension = 2;
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                tableFilter.pageNo = 1;
                getTableData(tableFilter);
            });
            $("#search-btn6").click(function () {
                tableFilter.dimension = 3;
                $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
                tableFilter.pageNo = 1;
                getTableData(tableFilter);
            });
        }

        //初始化数据
        function defaultData() {
            tempCountData.xAxis.data = [];
            tempCountData.series = [];
            tempCountData.legend.data = [];
        }

        //展示图表数据
        function showCharts() {
            var newData = $.extend(true, {}, optionData, tempCountData);
            myEcharts.clear();
            myEcharts.setOption(newData);
            setTimeout(function () {
                myEcharts.resize();
            }, 200);
        }

        $(window).resize(function () {
            myEcharts.resize();
        });

        //初始化页面
        function initFun() {
            selectDate();
            downloadTable();
        }

        initFun();
    };
    //回调函数
    $.fn.isSign($.fn.pageData);
});