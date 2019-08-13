$(function () {
    //监听用户名是否为空,获取焦点监控
    $("[name=uname]").focus(function () {
        if ($(this).val() === "") {  //判断输入框内容是否为空
            $(this).next().removeClass("hideStyle");
        } else {
            $(this).next().addClass("hideStyle");
        }
    }).blur(function () {   //失去焦点监控
        if ($(this).val() === "") {
            $(this).next().removeClass("hideStyle");
        } else {
            $(this).next().addClass("hideStyle");
        }
    }).bind("input", function () {  //监听用户名框是否有内容,只要有内容就不提示
        if ($(this).val().length !== 0) {
            $(this).next().addClass("hideStyle");
        } else if ($(this).val().length === 0) {
            $(this).next().removeClass("hideStyle");
        }
    });

    //监听第一次密码是否为空,获取焦点监控
    $("[name=upwd]").focus(function () {
        if ($(this).val() === "") {
            $(this).next().removeClass("hideStyle");
        } else {
            $(this).next().addClass("hideStyle");
        }
    }).blur(function () {   //失去焦点监控
        if ($(this).val() === "") {
            $(this).next().removeClass("hideStyle");
        } else {
            $(this).next().addClass("hideStyle");
        }
    }).bind("input", function () {  //监听密码框是否有内容,只要有内容就不提示
        if ($(this).val().length !== 0) {
            $(this).next().addClass("hideStyle");
        } else if ($(this).val().length === 0) {
            $(this).next().removeClass("hideStyle");
        }
    });

    //监听两次密码是否相同,获取焦点监控
    $("[name=confirmPwd]").focus(function () {
        pwd = $(this).parent().prev().children()[1].value;
        if ($(this).val() !== pwd) {
            $(this).next().removeClass("hideStyle");
        } else {
            $(this).next().addClass("hideStyle");
        }
    }).blur(function () {   //失去焦点监控
        if ($(this).val() !== pwd) {
            $(this).next().removeClass("hideStyle");
        } else {
            $(this).next().addClass("hideStyle");
        }
    }).bind("input", function () {
        pwd = $(this).parent().prev().children()[1].value;
        if ($(this).val() === pwd) {
            $(this).next().addClass("hideStyle");
        } else {
            $(this).next().removeClass("hideStyle");
        }
    });


    //用户名为空时不允许提交
    $("form").submit(function () {
        if ($("[name=uname]").val() === "" || $("[name=upwd]").val() === "") {
            alert("用户名密码不能为空！")
        }
    });


});