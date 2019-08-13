$(function () {
    //1.全选和取消全选
    $(".checkAll").click(function () {
        //如果当前元素为选中状态
        if ($(this).attr("checked")) {
            //修改取消选中
            $(this).removeAttr("checked").attr("src", "/static/images/cart/product_normal.png");
            $(".checkItem").removeAttr("checked").attr("src", "/static/images/cart/product_normal.png");
            //与底部全选联动
            $(".checkAll").removeAttr("checked").attr("src", "/static/images/cart/product_normal.png");

        } else {
            $(this).attr("checked", "true").attr("src", "/static/images/cart/product_true.png");
            $(".checkItem").attr("checked", "true").attr("src", "/static/images/cart/product_true.png");
            $(".checkAll").attr("checked", "true").attr("src", "/static/images/cart/product_true.png");
        }
        /*
         1.为全选按钮添加点击事件,事件函数中,判断当前按钮是否是选中状态,（查看是否存在checked属性值）
         2.如果当前元素存在checked属性值,说明本身为选中状态,需要修改为取消选中.（移除checked属性.修改状态标识：
         更改图片路径）
         3.根据全选按钮的状态获取商品按钮,统一调整状态标识和图片路径
         */
    });

    //2.反选,只要有一个商品未选择,全选按钮取消
    $(".checkItem").click(function () {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked").attr("src", "/static/images/cart/product_normal.png");
        } else {
            $(this).attr("checked", "true").attr("src", "/static/images/cart/product_true.png");
        }
        //被选中的商品数量,等于商品元素的个数,视为全选
        if ($(".checkItem[checked]").length === $(".checkItem").length) {
            //当包含checked属性的数组长度等于所有商品数组长度视为全选
            $(".checkAll").attr("checked", "true").attr("src", "/static/images/cart/product_true.png");
        } else {
            $(".checkAll").removeAttr("checked").attr("src", "/static/images/cart/product_normal.png");
        }
    });


    //移除操作
    $(".item .action").click(function () {
        var name = $(this).parents(".item").children(".gname").children(".fileName").text();
        $(this).parents(".item").children(".download").children(".deleName").val(name);
        //移除整个商品记录
        // $(this).parents(".item").remove();
    });

    //下载操作
    $(".item .down").click(function () {
        var name = $(this).parents(".item").children(".gname").children(".fileName").text();
        $(this).parents(".item").children(".download").children(".downName").val(name);
    });


    //导航栏鼠标移动变色
    $(".middle img").on("mouseover", function () {
        $(".middle img").prop("src", "/static/images/header/search2.png")
    });
    $(".middle img").on("mouseout", function () {
        $(".middle img").prop("src", "/static/images/header/search.png")
    });
    $(".search-nav ul li:first img").on("mouseover", function () {
        $(".search-nav ul li:first img").prop("src", "/static/images/header/care1.png")
    });
    $(".search-nav ul li:first img").on("mouseout", function () {
        $(".search-nav ul li:first img").prop("src", "/static/images/header/care.png")
    });
    $("#i1").on("mouseover", function () {
        $("#i1").prop("src", "/static/images/header/order1.png")
    });
    $("#i1").on("mouseout", function () {
        $("#i1").prop("src", "/static/images/header/order.png")
    });
    $("#i2").on("mouseover", function () {
        $("#i2").prop("src", "/static/images/header/shop_car1.png")
    });
    $("#i2").on("mouseout", function () {
        $("#i2").prop("src", "/static/images/header/shop_car.png")
    });
    //
    //  //上传文件为空时不允许提交
    // $("form").submit(function () {
    //     console.log($("[name=files]"));
    //     if ($("[name=files]").val()) {
    //         alert("用户名密码不能为空！")
    //     }else{
    //         console.log("123")
    //     }
    // });
});

