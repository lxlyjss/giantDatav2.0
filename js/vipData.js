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
            legend: {
                data: []
            },
            xAxis: {
                data: []
            },
            series: []
        };
        var chartsData, quotaData, filterData, tableData;//存储总数据
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
            froms: "",//来源列表
            type: "1",//时间类型
            countType: "1"//会员类型
        };
        var tableFilter = {
            role: window.roleInfo.role,
            roleCode: window.roleInfo.roleCode,
            beginDate: getDateArea(1),
            endDate: getDateArea(0),
            pageNo: 1,
            pageSize: 30
        };

        //请求图表数据
        function getChartsData(sendData) {
            $("#loading2").show();
            var dfd = $.Deferred();
            $.ajax({
                url: window.roleInfo.url2 + "giantService/report/userData/userLines",
                data: sendData
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    chartsData = res;
                    setChartsData();
                } else {
                    alert("result=0");
                }
            }).fail(function () {
                dfd.reject();
            }).complete(function () {
                $("#loading2").hide();
            });
            return dfd.promise();
        }

        //请求指标数据
        function getQuotaData(sendData) {
            $("#loading2").hide();
            var dfd = $.Deferred();
            $.ajax({
                url: window.roleInfo.url2 + "giantService/report/userData/keyIndex",
                data: sendData
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    quotaData = res;
                    setQuotaData();
                } else {
                    alert("result=0");
                }
            }).fail(function () {
                dfd.reject();
            }).complete(function () {
                $("#loading2").hide();
            });
            return dfd.promise();
        }

        //请求平台来源数据
        function getFilterData() {
            $("#loading2").hide();
            var dfd = $.Deferred();
            $.ajax({
                url: window.roleInfo.url1 + "giantService/report/userData/selectCondition",
                data:filter
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    filterData = res;
                    setFilterData();
                } else {
                    alert("result=0");
                }
            }).fail(function () {
                dfd.reject();
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
                url: window.roleInfo.url2 + "giantService/report/userData/userDatas",
                data: sendData
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    tableData = res
                    setTableData();
                } else {
                    alert("result=0");
                }
            }).fail(function () {
                dfd.reject();
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

        //下载表格
        function downloadTable() {
            $("#download").click(function () {
                var beginDate = $.fn.getUserDateArea($("#dateInput2"), 1);
                var endDate = $.fn.getUserDateArea($("#dateInput2"), 0);
                window.location.href = window.roleInfo.url2 +
                    "giantService/report/userData/exportUserDatas?" +
                    "role=" + window.roleInfo.role +
                    "&roleCode=" + window.roleInfo.roleCode +
                    "&beginDate=" + beginDate +
                    "&endDate=" + endDate
            });
        };
        //选页
        window.selectPage = function (n) {
            if (n > 0 && n <= Math.ceil(tableData.count / 30)) {
                $.fn.cutPage(Math.ceil(tableData.count / 30), n);
                tableFilter.pageNo = n;
                getTableData(tableFilter);
            } else {
                alert("没有更多了^_^");
            }
        };

        //设置指标数据
        function setQuotaData() {
            var dataArr = [quotaData.VipAddCount, quotaData.VipLostCount, quotaData.VipTotalCount];
            $.fn.quotaData(dataArr);
        }

        //跳转页
        $(".page-select .btn").click(function () {
            var page = parseInt($(".page-select input[type=number]").val());
            var reg = /([1-9]\d+)|[1-9]/;
            if (reg.test(page) && page > 0) {
                if (page > Math.ceil(tableData.count / 30)) {
                    alert("输入的页数超过了最大页数!请重新输入!");
                } else {
                    tableFilter.pageNo = page;
                    getTableData(tableFilter);
                }
            } else {
                alert("请输入大于0的正整数!");
            }
        });

        //设置表格数据
        function setTableData() {
            var tableList = [];
            for (var i = 0; i < tableData.list.length; i++) {
                var temp = $("<tr>\n" +
                    "<td>" + tableData.list[i].date + "</td>" +
                    "<td>" + tableData.list[i].VipAddCount + "</td>" +
                    "<td>" + tableData.list[i].VipLostCount + "</td>" +
                    "<td>" + tableData.list[i].VipTotalCount + "</td>" +
                    "</tr>");
                tableList.push(temp);
            }
            $(".lx-container table tbody").empty().append(tableList);
            $.fn.cutPage(Math.ceil(tableData.count / 30), tableFilter.pageNo);
            $(".page-selection").show();
        }

        //打开关闭平台来源选择框
        function clickPingTai() {
            $("#vipFrom").click(function (e) {
                e.stopPropagation();
                var ThisTop = $(this).offset().top + $("#content").scrollTop();
                var ThisLeft = $(this).offset().left - 230 <= 10 ? 10 : $(this).offset().left - 230;
                $(".search-box1").css({
                    "top": ThisTop + 40,
                    "left": ThisLeft
                }).show();
            });
            $(".search-box1").click(function (e) {
                e.stopPropagation();
                $(this).show();
            });
            $("#closeBox").click(function (e) {
                e.stopPropagation();
                $(".search-box1").hide();
            });
        }

        function selectType() {
            //选择会员分类
            $("#vipClass").children().each(function (index) {
                $("#vipClass").children().eq(index).click(function () {
                    $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                    filter.countType = index + 1;
                    getChartsData(filter);
                });
            });
            //选择日期分类
            $("#dateClass").children().each(function (index) {
                $("#dateClass").children().eq(index).click(function () {
                    $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
                    filter.type = index + 1;
                    getChartsData(filter);
                });
            });
        }

        //时间选择
        function dateSelect() {
            $(".date-select").eq(0).children(".input-group-btn").children(".btn").click(function () {
                filter.beginDate = $.fn.getUserDateArea($("#dateInput1"), 1);
                filter.endDate = $.fn.getUserDateArea($("#dateInput1"), 0);
                getChartsData(filter);
            });
            //时间2选择
            $(".date-select").eq(1).children(".input-group-btn").children(".btn").click(function () {
                tableFilter.beginDate = $.fn.getUserDateArea($("#dateInput2"), 1);
                tableFilter.endDate = $.fn.getUserDateArea($("#dateInput2"), 0);
                getTableData(tableFilter);
            });
        }

        //初始化数据
        function defaultData() {
            tempCountData.xAxis.data = [];
            tempCountData.series = [];
            tempCountData.legend.data = [];
        }

        //拆分数据
        function setChartsData() {
            var legend = [];
            var xData = [];
            var serData = [];
            defaultData();
            for (var i = 0; i < chartsData.data.length; i++) {
                legend.push(chartsData.data[i].fromName);
                var temp = {
                    name: chartsData.data[i].fromName,
                    type: "line",
                    smooth: true,
                    //stack: '总量',
                    data: []
                };
                for (var j = 0; j < chartsData.data[i].data.length; j++) {
                    if (i == 0) {
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

        //设置筛选条件
        function setFilterData() {
            var fromList = filterData.applicationMap;
            var fromArr = [];
            for (var i = 0; i < fromList.length; i++) {
                var temp = $("<p><label for=\"from" + i + "\">" +
                    "<input type=\"checkbox\" data-code='" + fromList[i].id + "' id=\"from" + i + "\">" +
                    "<span>" + fromList[i].applicationName + "</span>" +
                    "<span>(" + fromList[i].count + ")</span></label></p>");
                fromArr.push(temp);
            }
            $(".from-box").empty().append(fromArr);
            selectFilter();
        }

        //选择条件筛之后
        function selectFilter() {
            var fromFilter = [];
            $(".from-box input[type=checkbox]").each(function (index) {
                $(".from-box input[type=checkbox]").eq(index).on("change", function () {
                    var tempArr = [];
                    $(".from-box input[type=checkbox]").each(function (index) {
                        if ($(".from-box input[type=checkbox]").eq(index).is(":checked")) {
                            tempArr.push($(this).attr("data-code"))
                        }
                    });
                    fromFilter = tempArr;
                });
            });
            $("#fromBtn").click(function () {
                filter.froms = fromFilter.join();
                $(".search-box1").fadeOut();
                getChartsData(filter);
            });
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
            getData();
            clickPingTai();
            selectType();
            dateSelect();
            downloadTable();
        }

        initFun();
    };
    //回调函数
    $.fn.isSign($.fn.pageData);
});