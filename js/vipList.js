$(function () {
    $.fn.pageData = function (){
        var resultData, filterData;
        //点击查看详细会员信息
        $.fn.readMore = function (index) {
            //$(".loading-wrapper").show();
            //判断该用户名是否有手机号,用户名是否为手机
            if (resultData.vipData[index].userTel != null && resultData.vipData[index].userTel != "") {
                if (resultData.vipData[index].userName != null && resultData.vipData[index].userName != "") {
                    $.ajax({
                        //获取消费能力接口
                        url: window.roleInfo.url1 + "giantService/report/userData/userConsumption",
                        data: {
                            username: resultData.vipData[index].userName,//用户名,是手机号才传
                            mobile: resultData.vipData[index].userTel
                        },
                        success: function (res) {
                            $(".loading-wrapper").hide();
                            if (res.result == 1) {
                                if (res.buyData.voteCount > 0) {
                                    $("#allVote").text(res.buyData.voteCount);
                                    $("#allPrice").text(res.buyData.votePrice);
                                    $("#pingjun").text(Math.ceil(res.buyData.votePrice / res.buyData.voteCount) + ".00");
                                    $("#nearBuy").text(res.buyData.nearBuy);
                                }
                                showMoreInfo();//展示数据
                            } else {
                                showMoreInfo();
                                alert("获取消费数据失败!");
                            }
                        },
                        error: function () {
                            showMoreInfo();
                        }
                    });
                } else {
                    showMoreInfo();
                }
            } else {
                showMoreInfo();
            }

            function showMoreInfo() {
                $(".moreInfo-wrapper").addClass("open-more").fadeIn(500);
                var data = resultData.vipData[index];
                $("#nick").text(data.nickName);
                $("#tel").text(data.userTel);
                $("#email").text(data.userEmail);
                $("#from").text(data.applicationMap);
                //初始化消费数据
                $("#allVote").text("0");
                $("#allPrice").text("0.00");
                $("#pingjun").text("0.00");
                $("#nearBuy").text(0);

                if (data.userPicture != "" && data.userPicture != null) {
                    $(".vip-img-box").css({
                        "background": "url(" + data.userPicture + ")",
                        "backgroundSize": "100%"
                    });
                } else {
                    $(".vip-img-box").css({
                        "background": "url(img/touxiangbg.jpg) no-repeat",
                        "backgroundSize": "100%"
                    });
                }
                $("#role>td").text(data.roleName);
                $("#jigou>td").text(data.storeName);
                $("#userName>td").text(data.userName);
                $("#realName>td").text(data.realName);
                $("#nickName>td").text(data.nickName);
                $("#userSex>td").text(data.userSex);
                $("#userTel>td").text(data.userTel);
                $("#userEmail>td").text(data.userEmail);
                $("#userCity>td").text(data.userCity);
                $("#userAddress>td").text(data.userAddress);
                $("#userStatus>td").text(data.userStatus);
                $("#registerDate>td").text(data.registerDate);
                $("#userFrom>td").text(data.userFrom);
                $("#userBirthday>td").text(data.userBirthday);
                $("#historyPhone>td").text(data.historyPhone);
                $("#AppRegisterDate>td").text(data.appRegister);
                $("#point>td").text(data.point);
                $("#something>td").text(data.something);
                $("#lastTimeLogin>td").text(data.lastLoginDate);
                var temp = data.tagList.map(function (a) {
                    return a.substring(0, a.indexOf("["))
                });
                $("#tagList>td").text(temp.join());
                if (data.qrList.length > 0) {
                    var qrBindList = [];
                    for (var i = 0; i < data.qrList.length; i++) {
                        var temp = $("<tr>" +
                            "<td>" + data.qrList[i].vinno + "</td>" +
                            "<td>" + data.qrList[i].QRcodeStoreName + "</td>" +
                            "<td>" + data.qrList[i].QRcodeBindDate + "</td>" +
                            "</tr>");
                        qrBindList.push(temp);
                    }
                    $("#qrBind table tbody").empty().append(qrBindList);
                } else {
                    $("#qrBind table tbody").empty();
                }
                if (data.clubActivity.length > 0) {
                    var joinList = [];
                    for (var i = 0; i < data.clubActivity.length; i++) {
                        var temp = $("<tr>" +
                            "<td>" + data.clubActivity[i].activity + "</td>" +
                            "<td>" + data.clubActivity[i].time + "</td>" +
                            "</tr>");
                        joinList.push(temp);
                    }
                    $("#joinClub table tbody").empty().append(joinList);
                } else {
                    $("#joinClub table tbody").empty();
                }
            }

            //给添加标签添加index
            $("#addTag").attr("userId", index);
        };
        $("#addTag").click(function () {
            if ($("#tagInput").val() == "") {
                alert("请输入标签名称!");
                return;
                if ($("#tagInput").val().length > 10) {
                    alert("标签名不能超过20个字符!");
                    return;
                }
            }
            var index = $("#addTag").attr("userId");
            $.ajax({
                url: window.roleInfo.url1 + "giantService/report/userData/addLabel",
                data: {
                    code: 11,
                    userId: resultData.vipData[index].id,
                    labelName: $("#tagInput").val()
                },
                type: "post",
                dataType: "json"
            }).done(function (res) {
                if (res.result == 1) {
                    $("#tagList td").append("," + $("#tagInput").val());
                    alert("添加成功!");
                } else {
                    alert("添加失败!result=0");
                }
            });
        });
        var filter = {
            role: window.roleInfo.role,
            roleCode: window.roleInfo.roleCode,
            page: 1,
            pageNum: 30,
            labelIds: "",//标签id
            applicationIds: "",//平台id
            searchName: ""//搜索关键词
        };
        //选页
        window.selectPage = function (n) {
            if (n > 0 && n <= Math.ceil(resultData.vipCount / 30)) {
                $.fn.cutPage(Math.ceil(resultData.vipCount / 30), n);
                filter.page = n;
                getTableData(filter);
            } else {
                alert("没有更多了^_^");
            }
        };

        //请求筛选条件数据
        function getFilterData() {
            $("#loading2").show();
            var dfd = $.Deferred();
            $.ajax({
                url: window.roleInfo.url1 + "giantService/report/userData/selectCondition",
                data: filter
            }).done(function (res) {
                if (res.result == 1) {
                    dfd.resolve(res);
                    filterData = res;
                    setFilterData();
                } else {
                    alert("result=0");
                }
            }).complete(function () {
                $("#loading2").hide();
            });
            return dfd.promise();
        }

        //获取后台数据,页面初始化
        function getTableData(filter) {
            $("#loading2").show();
            var dfd = $.Deferred();
            $.ajax({
                url: window.roleInfo.url1 + "giantService/report/userData/userList",
                data: filter,
                type: "post",
                dataType: "json"
            }).done(function (res) {
                $("#filterBox").hide();
                if (res.result == 1) {
                    dfd.resolve(res);
                    resultData = res;
                    setTableData();
                } else {
                    alert("result=0");
                }
            }).complete(function () {
                $("#loading2").hide();
            });
            return dfd.promise();
        }

        //所有数据都成功之后的回调函数
        function getData() {
            $.when(
                getFilterData(),
                getTableData(filter)
            ).then(function () {
                $("#loading1").hide();
                $("#loading2").hide();
            });
        }

        //展示数据
        function setTableData() {
            $.fn.cutPage(Math.ceil(resultData.vipCount / 30), filter.page);
            $(".page-selection").show();
            var pageData = resultData.vipData;
            var tableList = [];
            for (var i = 0; i < pageData.length; i++) {
                var tempTable = $("<tr style=\"text-align: center;\">" +
                    "<td>" + pageData[i].userName + "</td>" +
                    "<td>" + pageData[i].nickName + "</td>" +
                    "<td>" + pageData[i].userSex + "</td>" +
                    "<td>" + pageData[i].userTel + "</td>" +
                    "<td>" + pageData[i].userEmail + "</td>" +
                    "<td>" + (pageData[i].userStatus == "0" ? "启用" : "禁用") + "</td>" +
                    "<td>" + pageData[i].registerDate + "</td>" +
                    "<td>" + pageData[i].applicationName + "</td>" +
                    "<td><a href=\"javascript:;\" onclick='$.fn.readMore(" + i + ")'>详细</a></td>" +
                    "</tr>");
                tableList.push(tempTable);
            }
            $(".vip-container table tbody").empty().append(tableList);
        }

        //设置条件筛选
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
            setTagFilter(filterData.labelData);
            selectFilter();
        };

        //设置标签列表
        function setTagFilter(data) {
            var tagList = data;
            var tagArr = [];
            for (var i = 0; i < tagList.length; i++) {
                var temp = $("<p><label for=\"tag" + i + "\">" +
                    "<input type=\"checkbox\" data-code='" + tagList[i].id + "' id=\"tag" + i + "\">" +
                    "<span>" + tagList[i].labelName.substring(0, tagList[i].labelName.indexOf("[")) + "</span>" +
                    "<span>(" + tagList[i].count + ")</span></label></p>");
                tagArr.push(temp);
            }
            $(".tag-box").empty().append(tagArr);
        }

        //选择条件筛之后
        function selectFilter() {
            var fromFilter = [];
            var tagFilter = [];
            $(".from-box input[type=checkbox]").each(function (index) {
                $(".from-box input[type=checkbox]").eq(index).on("change", function () {
                    var tempArr = [];
                    $(".from-box input[type=checkbox]").each(function (index) {
                        if ($(".from-box input[type=checkbox]").eq(index).is(":checked")) {
                            tempArr.push($(this).attr("data-code"));
                        }
                    });
                    fromFilter = tempArr;
                });
            });

            $(".tag-box input[type=checkbox]").each(function (index) {
                $(".tag-box input[type=checkbox]").eq(index).on("change", function () {
                    var tempArr = [];
                    $(".tag-box input[type=checkbox]").each(function (index) {
                        if ($(".tag-box input[type=checkbox]").eq(index).is(":checked")) {
                            tempArr.push($(this).attr("data-code"));
                        }
                    });
                    tagFilter = tempArr;
                });
            });
            $("#filterSearch").click(function () {
                filter.applicationIds = fromFilter.join();
                filter.labelIds = tagFilter.join();
                filter.searchName = "";
                getTableData(filter);
            });
        }

        //查找标签的方法
        function findTag() {
            $("#findTag input").on("input", function () {
                var findText = $(this).val();
                var nowArr = [];
                for (var i = 0; i < filterData.labelData.length; i++) {
                    if (filterData.labelData[i].labelName.indexOf(findText) != -1) {
                        nowArr.push(filterData.labelData[i]);
                    }
                }
                setTagFilter(nowArr);
            });
        }

        findTag();
        //跳转页
        $(".page-select .btn").click(function () {
            var page = parseInt($(".page-select input[type=number]").val());
            var reg = /([1-9]\d+)|[1-9]/;
            if (reg.test(page) && page > 0) {
                if (page > Math.ceil(resultData.vipCount / 30)) {
                    alert("输入的页数超过了最大页数!请重新输入!");
                } else {
                    filter.page = page;
                    getTableData(filter);
                }
            } else {
                alert("请输入大于0的正整数!");
            }
        });

        //搜索查询
        function getSearchData() {
            $("#searchName").click(function () {
                filter.searchName = $("#searchInput").val();
                filter.applicationIds = "";
                filter.labelIds = "";
                filter.page = 1;
                getTableData(filter);
            });
        }

        //点击条件筛选
        function clickFilter() {
            $("#tagBtn").click(function (e) {
                e.stopPropagation();
                var ThisTop = $(this).offset().top;
                var ThisLeft = $(this).offset().left - 230 <= 10 ? 10 : $(this).offset().left - 230;
                $(".search-box").css({
                    "left": ThisLeft,
                    "top": ThisTop + 40
                })
                $(".search-box").addClass("search-open").show();
            });
            $(".search-box").click(function (e) {
                e.stopPropagation();
                $(this).show();
            });
            $("#closeBox").click(function (e) {
                e.stopPropagation();
                $(".search-box").hide();
            });
            $("body").click(function (e) {
                e.stopPropagation();
                $(".search-box").hide();
            });
        }

        //初始化数据
        function initFun() {
            getData();
            clickFilter();
            getSearchData();
        }
        initFun();
    };
    //回调函数
    $.fn.isSign($.fn.pageData);
});