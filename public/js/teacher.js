define(["jquery", "template", "bootstrap"], function ($, template, bootstrap) {
    $.ajax({
        type: "get",
        url: "/api/teacher",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var html = template("teaTemp", data);
            $("#teaInfo").html(html);

            // 修改启用和注销按钮
            $("#teaInfo").find(".sweichbtn").click(function () {
                var Id = $(this).closest("td");
                var teaId = Id.attr("data-id");
                var status = Id.attr("data-status");
                //console.log(status)
                //console.log(teaId)
                var that = this;
                $.ajax({
                    url: "/api/teacher/handle",
                    type: "post",
                    data: { tc_id: teaId, tc_status: status },
                    datatupe: "json",
                    success: function (data) {
                        //console.log(data)
                        Id.attr("data-status", data.result.tc_status);
                        if (data.result.tc_status == 0) {
                            $(that).html("注销")
                        } else {
                            $(that).html("启用")
                        }
                    }
                })

            })
            // 查看讲师信息
            previewTeacher();
        }

    });


    // 查看讲师功能
    function previewTeacher() {

        $("#teaInfo").find(".preview").click(function () {
            var teaId = $(this).closest("td").data("id");
            $.ajax({
                type: "get",
                url: "/api/teacher/view",
                data: { tc_id: teaId },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    // tc_hometown:"山东省|济南市|章丘市"
                    data.result.tc_hometown = data.result.tc_hometown.split("|").join("");
                    var html = template("teaModalInfo", data.result);
                    $("#teaDetail").html(html);
                }
            });
            // return false;
        });
    }
});