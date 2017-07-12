define(["jquery", "template"], function ($, template) {
    // 编辑功能
    // 操作接口参数
    var str = location.search;
    var strr = str.substr(1);
    var arr = strr.split("&")
    for (var i = 0; i < arr.length; i++) {
        var lisarr = arr[i].split("=")
        var lis = lisarr[1]
    }
    if (lis) {
        //  发送数据
        $.ajax({
            url: "/api/teacher/edit",
            type: "get",
            data: { tc_id: lis },
            success: function (data) {
                console.log(data)
                data.result.a = "编辑讲师"
                var html = template("template", data.result);
                $("#list").html(html);
                //提交
                tijiao("/api/teacher/update")
            }
        })
    } else {
        var html = template("template", { a: "添加讲师", tc_gender: 0 });
        $("#list").html(html);
        //  提交
        tijiao("/api/teacher/add")
    }



    //  添加功能 
    function tijiao(url) {
        $("#btn").click(function () {
            $.ajax({
                url: url,
                type: "post",
                data: $("#form").serialize(),
                dataType: "json",
                success: function (data) {
                    // console.log(data)
                    location.href = "/teacher/list"

                }
            })
        })

    }
})