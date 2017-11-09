function setAreaData(ele,data) {
    this.setting = {
        check: {
            enable: true,
            chkboxType: {"Y": "", "N": ""}
        },
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: function (treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("treeBox");
                zTree.checkNode(treeNode, !treeNode.checked, null, true);
                return false;
            },
            onCheck: function (e, treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("treeBox"),
                    nodes = zTree.getCheckedNodes(true),
                    noCheckNode = zTree.getCheckedNodes(false),
                    disNode = zTree.getNodesByParam("chkDisabled", true);
                //判断超过10个不可选
                if (nodes.length >= 10) {
                    for (var i = 0; i < noCheckNode.length; i++) {
                        zTree.setChkDisabled(noCheckNode[i], true)
                    }
                } else {
                    for (var i = 0; i < disNode.length; i++) {
                        zTree.setChkDisabled(disNode[i], false)
                    }
                }
            }
        }
    };
    this.select = [];
    this.zNodes = [];
    this.jsonData = data;
    this.setJsonData = function (type) {
        this.zNodes = [];
        console.log(this.jsonData)
        for (var i = 0; i < this.jsonData.list.length; i++) {
            var temp1 = {
                id: (i + 1) * 2000, pId: 0,
                name: this.jsonData.list[i].name,
                code: this.jsonData.list[i].code,
                nocheck: type == 1 ? false : true
            };
            for (var j = 0; j < this.jsonData.list[i].list.length; j++) {
                var temp2 = {
                    id: (i + 1) * 1000 + (j + 1), pId: (i + 1) * 2000,
                    name: this.jsonData.list[i].list[j].name,
                    code: this.jsonData.list[i].list[j].code,
                    nocheck: type == 2 ? false : true
                };
                for (var k = 0; k < this.jsonData.list[i].list[j].list.length; k++) {
                    var temp3 = {
                        id: (i + 1) * 10000 + (j + 1) * 1000 + (k + 1),
                        pId: (i + 1) * 1000 + (j + 1),
                        name: this.jsonData.list[i].list[j].list[k].name,
                        code: this.jsonData.list[i].list[j].list[k].code,
                        nocheck: type == 3 ? false : true
                    };
                    this.zNodes.push(temp3);
                }
                this.zNodes.push(temp2);
            }
            this.zNodes.push(temp1);
        }
        console.log(this.zNodes)
        $.fn.zTree.init($(ele), this.setting, this.zNodes);
    };
    this.beforeClick = function (treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeBox");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    };
    this.onCheck = function (e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeBox"),
            nodes = zTree.getCheckedNodes(true),
            noCheckNode = zTree.getCheckedNodes(false),
            disNode = zTree.getNodesByParam("chkDisabled", true);
        //判断超过10个不可选
        if (nodes.length >= 10) {
            for (var i = 0; i < noCheckNode.length; i++) {
                zTree.setChkDisabled(noCheckNode[i], true)
            }
        } else {
            for (var i = 0; i < disNode.length; i++) {
                zTree.setChkDisabled(disNode[i], false)
            }
        }
    };
    this.type = "";
    this.showMenu = function (This, type) {
        this.type = type;
        var cityObj = $(This);
        var cityOffset = $(This).offset();
        var scrollTop = $("#content").scrollTop();
        $("#menuContent").css({
            left: cityOffset.left - 230 <= 10 ? 10 : cityOffset.left - 230 + "px",
            top: cityOffset.top + cityObj.outerHeight() + scrollTop + "px"
        }).slideDown("fast");
        $("#menuContent").slideDown("fast");
        $("body").bind("mousedown", this.onBodyDown.bind(this));
        this.setJsonData(type);
    };
    this.hideMenu = function () {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", this.onBodyDown);
    };
    this.onBodyDown = function (event) {
        if (!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
            this.hideMenu();
        }
    };
};
//选择品牌车系车型
function setBrandData(ele,data) {
    this.setting = {
        check: {
            enable: true,
            chkboxType: {"Y": "", "N": "s"}
        },
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: function (treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("treeBox");
                zTree.checkNode(treeNode, !treeNode.checked, null, true);
                return false;
            },
            onCheck: function (e, treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("treeBox"),
                    nodes = zTree.getCheckedNodes(true),
                    noCheckNode = zTree.getCheckedNodes(false),
                    disNode = zTree.getNodesByParam("chkDisabled", true);
                //判断超过10个不可选
                if (nodes.length >= 10) {
                    for (var i = 0; i < noCheckNode.length; i++) {
                        zTree.setChkDisabled(noCheckNode[i], true)
                    }
                } else {
                    for (var i = 0; i < disNode.length; i++) {
                        zTree.setChkDisabled(disNode[i], false)
                    }
                }
            }
        }
    };
    this.select = [];
    this.zNodes = [];
    this.jsonData = data;
    this.setJsonData = function (type) {
        this.zNodes = [];
        console.log(this.jsonData);
        for (var i = 0; i < this.jsonData.list.length; i++) {
            var temp1 = {
                id: (i + 1) * 2000, pId: 0, name: this.jsonData.list[i].name,
                brandCode: this.jsonData.list[i].code,
                brandName: this.jsonData.list[i].name,
                brandType: this.jsonData.list[i].type,
                nocheck: type==1?false:true
            };
            for (var j = 0; j < this.jsonData.list[i].list.length; j++) {
                var temp2 = {
                    id: (i + 1) * 1000 + (j + 1), pId: (i + 1) * 2000, name: this.jsonData.list[i].list[j].name,
                    brandCode: this.jsonData.list[i].list[j].code,
                    brandName: this.jsonData.list[i].list[j].name,
                    brandType: this.jsonData.list[i].list[j].type,
                    nocheck: type==2?false:true
                };
                for (var k = 0; k < this.jsonData.list[i].list[j].list.length; k++) {
                    var temp3 = {
                        id: (i + 1) * 10000 + (j + 1) * 1000 + (k + 1),
                        pId: (i + 1) * 1000 + (j + 1),
                        name: this.jsonData.list[i].list[j].list[k].name,
                        brandCode: this.jsonData.list[i].list[j].list[k].code,
                        brandName: this.jsonData.list[i].list[j].list[k].name,
                        brandType: this.jsonData.list[i].list[j].list[k].type,
                        nocheck: type==3?false:true
                    };
                    this.zNodes.push(temp3);
                }
                this.zNodes.push(temp2);
            }
            this.zNodes.push(temp1);
        }
        console.log(this.zNodes)
        $.fn.zTree.init($(ele), this.setting, this.zNodes);
    };
    this.beforeClick = function (treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeBox");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    };
    this.showMenu = function (This,type) {
        var cityObj = $(This);
        var cityOffset = $(This).offset();
        var scrollTop = $("#content").scrollTop();
        $("#menuContent").css({
            left: cityOffset.left - 230 <= 10 ? 10 : cityOffset.left - 230 + "px",
            top: cityOffset.top + cityObj.outerHeight() + scrollTop + "px"
        }).slideDown("fast");
        $("#menuContent").slideDown("fast");
        $("body").bind("mousedown", this.onBodyDown.bind(this));
        this.setJsonData(type);
    };
    this.hideMenu = function () {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", this.onBodyDown);
    };
    this.onBodyDown = function (event) {
        if (!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
            this.hideMenu();
        }
    };
};

