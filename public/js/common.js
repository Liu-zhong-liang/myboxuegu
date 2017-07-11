define(['jquery',"template","cookie"], function($,template) {
//  侧边栏点击事件
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

//  退出功能点击事件
	$("#logout").click(function(){
           $.ajax({
               url:"/api/logout",
               dataType:"json",
               type:"post",
               success:function(data){
                  if(data.code == 200){
                    //  点击退出时要把用户名删掉
                    $.removeCookie("loginInfo",{path:"/"});  
                    location.href = '/index/login';
                }
               }
           })
       })
       //  获取邓丽页面中储存在cookie中的数据
	    var Info=$.cookie("loginInfo");
	   //  构造模板引擎
        var tpl='<div class="avatar img-circle">'
                +'<img src="{{tc_avatar}}">'
                +'</div>'
                +'<h4>{{tc_name}}</h4>'
        //  以为我们在cookie中储存的是字符串，模板引擎中我们要用的是对象
        //   并且当我们删除了后套输入一个空对象，不然报错        
         var html=template.render(tpl,Info?JSON.parse(Info):{});
           //console.log(Info);             //  字符串
         //console.log(JSON.parse(Info));   //  对象
         $(".aside .profile").html(html)
          //当没有用户登录记录时，其他人员无法访问内部页面
         if(!$.cookie("PHPSESSID")&&location.pathname!="/"&&location.href!="/"){
             location.href="/"
         }
});
	