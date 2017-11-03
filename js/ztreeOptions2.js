
var setting = {
    check: {
        enable: true,
        chkboxType: {"Y":"", "N":""}
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
        beforeClick: beforeClick,
        onCheck: onCheck
    }
};
var zNodes = [];
var jsonData;
$.getJSON("http://localhost:4396/giantData-v2/data.min.json",function (res){
    jsonData = res;

});
function getJsonData(type){
    zNodes = [];
    for(var i = 0; i < jsonData.list.length;i++){
        var temp1 = {
            id:(i+1)*2000, pId:0, name:jsonData.list[i].dictName,
            nocheck:true,dictCode:jsonData.list[i].dictCode,
            dictName:jsonData.list[i].dictName,nocheck:type==1?false:true
        };
        for(var j = 0; j < jsonData.list[i].list.length;j++){
            var temp2 = {
                id:(i+1)*1000+(j+1), pId:(i+1)*2000, name:jsonData.list[i].list[j].dictName,
                nocheck:true,dictCode:jsonData.list[i].list[j].dictCode,
                dictName:jsonData.list[i].list[j].dictName,nocheck:type==2?false:true
            };
            for(var k = 0; k < jsonData.list[i].list[j].list.length;k++){
                var temp3 = {
                    id:(i+1)*10000+(j+1)*1000+(k+1), pId:(i+1)*1000+(j+1), name:jsonData.list[i].list[j].list[k].dictName,
                    nocheck:true,dictCode:jsonData.list[i].list[j].list[k].dictCode,
                    dictName:jsonData.list[i].list[j].list[k].dictName,nocheck:type==3?false:true
                };
                zNodes.push(temp3);
            }
            zNodes.push(temp2);
        }
        zNodes.push(temp1);
    }
    $.fn.zTree.init($("#treeBox"), setting, zNodes);
}

// var zNodes =[
//     {id:1, pId:0, name:"GCK",nocheck:true},
//     {id:11, pId:1, name:"GCK经销商1"},
//     {id:12, pId:1, name:"GCK经销商2"},
//     {id:13, pId:1, name:"GCK经销商3"},
//     {id:14, pId:1, name:"GCK经销商4"},
//     {id:15, pId:1, name:"GCK经销商5"},
//     {id:16, pId:1, name:"GCK经销商6"},
//     {id:2, pId:0, name:"GCC",nocheck:true},
//     {id:21, pId:2, name:"GCC经销商1"},
//     {id:22, pId:2, name:"GCC经销商2"},
//     {id:23, pId:2, name:"GCC经销商3"},
//     {id:24, pId:2, name:"GCC经销商4"},
//     {id:25, pId:2, name:"GCC经销商5"},
//     {id:3, pId:0, name:"GCT",nocheck:true},
//     {id:31, pId:3, name:"GCT经销商1"},
//     {id:32, pId:3, name:"GCT经销商2"},
//     {id:33, pId:3, name:"GCT经销商3"},
//     {id:34, pId:3, name:"GCT经销商4"},
//     {id:35, pId:3, name:"GCT经销商5"}
// ];
function beforeClick(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeBox");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}

function onCheck(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeBox"),
        nodes = zTree.getCheckedNodes(true),
        noCheckNode = zTree.getCheckedNodes(false),
        disNode = zTree.getNodesByParam("chkDisabled",true);
    //判断超过10个不可选
    if(nodes.length >= 10){
        for(var i = 0; i < noCheckNode.length;i++){
            zTree.setChkDisabled(noCheckNode[i],true)
        }
    }else{
        for(var i = 0; i < disNode.length;i++){
            zTree.setChkDisabled(disNode[i],false)
        }
    }
}

function showMenu(This,type) {
    var cityObj = $(This);
    var cityOffset = $(This).offset();
    var scrollTop = $("#content").scrollTop();
    $("#menuContent").css({left:cityOffset.left-230<=10?10:cityOffset.left-230 + "px", top:cityOffset.top + cityObj.outerHeight() + scrollTop + "px"}).slideDown("fast");
    $("#menuContent").slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
    getJsonData(type);
}
$("#filterBtn").click(function (){
    var zTree = $.fn.zTree.getZTreeObj("treeBox"),
        nodes = zTree.getCheckedNodes(true),
        filterList = [];
    for(var i = 0; i < nodes.length;i++){
        filterList.push(nodes[i].dictCode);
    }
    console.log(filterList)
});
function hideMenu() {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
        hideMenu();
    }
}
