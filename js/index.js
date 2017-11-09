$(function (){
    $.fn.isSign();
    var quotaData1 = {
        result:"1",
        vipAddCount: 333,
        qrAddCount: 878,
        appAddCount: 895,
        clubAddCount: 686,
        webAddCount: 6656,
        vipTotalCount: 87845,
        qrTotalCount:9653,
        appTotalCount:9256,
        clubTotalCount:9756,
        webTotalCount:9696
    };
    var quotaData2 = {
        QrAddActivation: {//qrcode激活数量
            count: 8714,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        QrTotalActivation:{//历史累计激活数量
            count: 8284,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        QrAddBind:{//qrcode绑定数量
            count: 8384,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        QrTotalBind:{//历史累计绑定量
            count: 8744,
            day: 0,
            week: -0.23,
            month: 0.63
        }
    };
    var quotaData3 = {
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
    var quotaData4 = {
        Evaluation: {//门店总评价
            count: 8384,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        EvaluationCount:{//评价次数
            count: 8754,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        Service:{//服务态度评价
            count: 8774,
            day: 0.32,
            week: -0.23,
            month: 0.63
        },
        Mechanic:{//技师水平评价
            count: 8384,
            day: 0.32,
            week: -0.23,
            month: 0.63
        }
    };
    //设置筛选条件
    var filter = {
        role:window.roleInfo.role,
        roleCode:window.roleInfo.roleCode
    };
    //请求数据1
    function getQuotaData1(){
        $.ajax({
            url:window.roleInfo.url2+"giantService/report/userData/userNumber",
            data:filter
        }).done(function (res){
            if(res.result == 1){
                quotaData1 = res;
                setQuotaData1();
            }else{
                alert("请求数据失败!");
            }
        }).fail(function (){
            alert("fail");
        });
    }
    //请求数据2
    function getQuotaData2(){
        $.ajax({
            url:window.roleInfo.url2+"giantService/report/userData/userChange",
            data:filter
        }).done(function (res){
            if(res.result == 1){
                quotaData2 = res;
                setQuotaData2();
            }else{
                alert("请求数据失败!");
            }
        }).fail(function (){
            alert("fail");
        });
    }
    //请求数据3
    function getQuotaData3(){
        $.ajax({
            url:window.roleInfo.url1+"giantService/report/product/productSaleTarget",
            data:filter
        }).done(function (res){
            if(res.result == 1){
                console.log(res);
                quotaData3 = res;
                setQuotaData3();
            }else{
                alert("请求数据失败!");
            }
        }).fail(function (){
            alert("fail");
        });
    }
    //请求数据4
    function getQuotaData4(){
        $.ajax({
            url:window.roleInfo.url2+"giantService/report/userData/userChange",
            data:filter,
        }).done(function (res){
            if(res.result == 1){
                quotaData4 = res;
                setQuotaData4();
            }else{
                alert("请求数据失败!");
            }
        }).fail(function (){
            alert("fail");
        });
    }
    //所有数据都成功之后的回调函数
    function getData(){
        $("#loading1").show();
        $.when(
            getQuotaData1(),
            getQuotaData2(),
            getQuotaData3(),
            getQuotaData4()
        ).then(function (){
            $("#loading1").hide();
        });
    }
    //设置数据
    function setQuotaData1(){
        var quotaData = quotaData1;
        var quotaBox = $("#ProductData").children("div");
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
        //1
        quotaBox.eq(0).children("p").eq(1).text(quotaData.totalPrice.count/100);
        setData(quotaBox.eq(0).children("p").eq(2).children(".count"), quotaData.totalPrice.day);
        setData(quotaBox.eq(0).children("p").eq(3).children(".count"), quotaData.totalPrice.week);
        setData(quotaBox.eq(0).children("p").eq(4).children(".count"), quotaData.totalPrice.month);

        setArrow(quotaBox.eq(0).children("p").eq(2).children(".arrow"), arrow(quotaData.totalPrice.day));
        setArrow(quotaBox.eq(0).children("p").eq(3).children(".arrow"), arrow(quotaData.totalPrice.week));
        setArrow(quotaBox.eq(0).children("p").eq(4).children(".arrow"), arrow(quotaData.totalPrice.month));
        //2
        quotaBox.eq(1).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(1).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(1).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(1).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(1).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(1).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(1).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
        //3
        quotaBox.eq(2).children("p").eq(1).text(quotaData.bikeCount.count);
        setData(quotaBox.eq(2).children("p").eq(2).children(".count"), quotaData.bikeCount.day);
        setData(quotaBox.eq(2).children("p").eq(3).children(".count"), quotaData.bikeCount.week);
        setData(quotaBox.eq(2).children("p").eq(4).children(".count"), quotaData.bikeCount.month);

        setArrow(quotaBox.eq(2).children("p").eq(2).children(".arrow"), arrow(quotaData.bikeCount.day));
        setArrow(quotaBox.eq(2).children("p").eq(3).children(".arrow"), arrow(quotaData.bikeCount.week));
        setArrow(quotaBox.eq(2).children("p").eq(4).children(".arrow"), arrow(quotaData.bikeCount.month));
        //4
        quotaBox.eq(3).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(3).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(3).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(3).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(3).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(3).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(3).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
    }
    //设置数据
    function setQuotaData2(){
        var quotaData = quotaData2;
        var quotaBox = $("#ProductData").children("div");
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
        //1
        quotaBox.eq(0).children("p").eq(1).text(quotaData.totalPrice.count/100);
        setData(quotaBox.eq(0).children("p").eq(2).children(".count"), quotaData.totalPrice.day);
        setData(quotaBox.eq(0).children("p").eq(3).children(".count"), quotaData.totalPrice.week);
        setData(quotaBox.eq(0).children("p").eq(4).children(".count"), quotaData.totalPrice.month);

        setArrow(quotaBox.eq(0).children("p").eq(2).children(".arrow"), arrow(quotaData.totalPrice.day));
        setArrow(quotaBox.eq(0).children("p").eq(3).children(".arrow"), arrow(quotaData.totalPrice.week));
        setArrow(quotaBox.eq(0).children("p").eq(4).children(".arrow"), arrow(quotaData.totalPrice.month));
        //2
        quotaBox.eq(1).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(1).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(1).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(1).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(1).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(1).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(1).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
        //3
        quotaBox.eq(2).children("p").eq(1).text(quotaData.bikeCount.count);
        setData(quotaBox.eq(2).children("p").eq(2).children(".count"), quotaData.bikeCount.day);
        setData(quotaBox.eq(2).children("p").eq(3).children(".count"), quotaData.bikeCount.week);
        setData(quotaBox.eq(2).children("p").eq(4).children(".count"), quotaData.bikeCount.month);

        setArrow(quotaBox.eq(2).children("p").eq(2).children(".arrow"), arrow(quotaData.bikeCount.day));
        setArrow(quotaBox.eq(2).children("p").eq(3).children(".arrow"), arrow(quotaData.bikeCount.week));
        setArrow(quotaBox.eq(2).children("p").eq(4).children(".arrow"), arrow(quotaData.bikeCount.month));
        //4
        quotaBox.eq(3).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(3).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(3).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(3).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(3).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(3).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(3).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
    }
    //设置数据
    function setQuotaData3(){
        var quotaData = quotaData3;
        var quotaBox = $("#ProductData").children("div");
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
        //1
        quotaBox.eq(0).children("p").eq(1).text(quotaData.totalPrice.count/100);
        setData(quotaBox.eq(0).children("p").eq(2).children(".count"), quotaData.totalPrice.day);
        setData(quotaBox.eq(0).children("p").eq(3).children(".count"), quotaData.totalPrice.week);
        setData(quotaBox.eq(0).children("p").eq(4).children(".count"), quotaData.totalPrice.month);

        setArrow(quotaBox.eq(0).children("p").eq(2).children(".arrow"), arrow(quotaData.totalPrice.day));
        setArrow(quotaBox.eq(0).children("p").eq(3).children(".arrow"), arrow(quotaData.totalPrice.week));
        setArrow(quotaBox.eq(0).children("p").eq(4).children(".arrow"), arrow(quotaData.totalPrice.month));
        //2
        quotaBox.eq(1).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(1).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(1).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(1).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(1).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(1).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(1).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
        //3
        quotaBox.eq(2).children("p").eq(1).text(quotaData.bikeCount.count);
        setData(quotaBox.eq(2).children("p").eq(2).children(".count"), quotaData.bikeCount.day);
        setData(quotaBox.eq(2).children("p").eq(3).children(".count"), quotaData.bikeCount.week);
        setData(quotaBox.eq(2).children("p").eq(4).children(".count"), quotaData.bikeCount.month);

        setArrow(quotaBox.eq(2).children("p").eq(2).children(".arrow"), arrow(quotaData.bikeCount.day));
        setArrow(quotaBox.eq(2).children("p").eq(3).children(".arrow"), arrow(quotaData.bikeCount.week));
        setArrow(quotaBox.eq(2).children("p").eq(4).children(".arrow"), arrow(quotaData.bikeCount.month));
        //4
        quotaBox.eq(3).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(3).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(3).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(3).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(3).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(3).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(3).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
    }
    //设置数据
    function setQuotaData4(){
        var quotaData = quotaData4;
        var quotaBox = $("#ProductData").children("div");
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
        //1
        quotaBox.eq(0).children("p").eq(1).text(quotaData.totalPrice.count/100);
        setData(quotaBox.eq(0).children("p").eq(2).children(".count"), quotaData.totalPrice.day);
        setData(quotaBox.eq(0).children("p").eq(3).children(".count"), quotaData.totalPrice.week);
        setData(quotaBox.eq(0).children("p").eq(4).children(".count"), quotaData.totalPrice.month);

        setArrow(quotaBox.eq(0).children("p").eq(2).children(".arrow"), arrow(quotaData.totalPrice.day));
        setArrow(quotaBox.eq(0).children("p").eq(3).children(".arrow"), arrow(quotaData.totalPrice.week));
        setArrow(quotaBox.eq(0).children("p").eq(4).children(".arrow"), arrow(quotaData.totalPrice.month));
        //2
        quotaBox.eq(1).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(1).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(1).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(1).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(1).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(1).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(1).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
        //3
        quotaBox.eq(2).children("p").eq(1).text(quotaData.bikeCount.count);
        setData(quotaBox.eq(2).children("p").eq(2).children(".count"), quotaData.bikeCount.day);
        setData(quotaBox.eq(2).children("p").eq(3).children(".count"), quotaData.bikeCount.week);
        setData(quotaBox.eq(2).children("p").eq(4).children(".count"), quotaData.bikeCount.month);

        setArrow(quotaBox.eq(2).children("p").eq(2).children(".arrow"), arrow(quotaData.bikeCount.day));
        setArrow(quotaBox.eq(2).children("p").eq(3).children(".arrow"), arrow(quotaData.bikeCount.week));
        setArrow(quotaBox.eq(2).children("p").eq(4).children(".arrow"), arrow(quotaData.bikeCount.month));
        //4
        quotaBox.eq(3).children("p").eq(1).text(quotaData.productCount.count);
        setData(quotaBox.eq(3).children("p").eq(2).children(".count"), quotaData.productCount.day);
        setData(quotaBox.eq(3).children("p").eq(3).children(".count"), quotaData.productCount.week);
        setData(quotaBox.eq(3).children("p").eq(4).children(".count"), quotaData.productCount.month);

        setArrow(quotaBox.eq(3).children("p").eq(2).children(".arrow"), arrow(quotaData.productCount.day));
        setArrow(quotaBox.eq(3).children("p").eq(3).children(".arrow"), arrow(quotaData.productCount.week));
        setArrow(quotaBox.eq(3).children("p").eq(4).children(".arrow"), arrow(quotaData.productCount.month));
    }
});