define(["jquery", "template","bootstrap"], function ($,template,bootstrap) {
    $.ajax({
        type: "get",
        url:"/api/teacher",
        dataType:"json",
        success:function(data){
            console.log(data);
            var html=template("teaTemp",data);
            $("#teaInfo").html(html);
            // 查看讲师信息
            previewTeacher();
        }

    });


    // 查看讲师功能
    function previewTeacher(){
        $("#teaInfo").find(".preview").click(function(){
            var teaId=$(this).closest("td").data("id");
            $.ajax({
                type:"get",
                url:"/api/teacher/view",
                data:{tc_id:teaId},
                dataType:"json",
                success:function(data){
                    console.log(data);
                    // tc_hometown:"山东省|济南市|章丘市"
                    data.result.tc_hometown=data.result.tc_hometown.split("|").join("");
                   var html=template("teaModalInfo",data.result);
                   $("#teaDetail").html(html);
                }
            });
            // return false;
        });
    }
});