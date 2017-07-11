define(["jquery","cookie"],function($){
    $("#loginId").click(function(){
         console.log(11)
        $.ajax({
            type : 'post',
            url : '/api/login',
            data : $('#form').serialize(),
            dataType : 'json',
            success : function(data){
                if(data.code == 200){

                    //  将用户数据包存在cookIE中
                    $.cookie("loginInfo",JSON.stringify(data.result),{path:"/"});
                    location.href = '/index/index';
                }
            },
        });
        return false;
       });
      
})