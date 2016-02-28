"use strict";
var app_index = {
    param: {
        remove_btn: $(".drop_item").find(".remove"),
        template: $(".sidebar .template"),
        main: $(".content .main"),
        add_index_page: $("#add_index_page"),
        left_content: $(".sidebar .content")
    },
    dom: function() {
        var Dom = require("./app_index_dom.js")
        return new Dom();
    },
    init: function() {
        var self = app_index;
        var param = self.param;
        self.onload();
        self.lock();
        var dropzone = self.dom().dropzone;
        require("history")();
        var edit = require("edit");
        // self.cube_storage();
        dropzone.sortable({
            items: '.drop_item',
            opacity: 0.6, //拖动时，透明度为0.6
            //revert: true,  
            sort: function() {},
            update: function(){
                dropzone.find(".drop_item").eq(0).after(dropzone.find("[data-tpl=t3]"));
                dropzone.append(dropzone.find("[data-tpl=t15]"));

            }
        });
        param.main.css("max-height", $(window).height() - 61 + "px");
        self.remove_bind().carousel();

        app_index.dom().header.find(".live_preview").click(function() {
            var pre_str = dropzone.parents("#preview_all_content").html();
            window.localStorage.setItem("preview_content", pre_str);
            window.open("./preview");
        });
        
        //启动页面
        app_index.dom().sidebar.find(".tc_1").click(function(){
            var start_modal = $("#confirm_delete_modal");
            var i=require("./img_upload.js");
            var start_page_content = __inline("../../../handlebars/start_page/start_page.handlebars");
            start_modal.find("#myModalLabel").html("app首页启动页");
            $.ajax({
              type:"get",
              dataType:"json",
              url:"./getAppHAdvertisement",
              success:function(data){
                start_modal.find(".index_img_upload").attr("src",data.data.adPicUri);
                start_modal.find(".modal-body").html(start_page_content({data:data.data}));
                start_modal.find(".modal-dialog").removeClass("modal-sm");
                start_modal.modal();
                i.init(start_modal.find(".img_upload"),start_modal.find(".cate_img"));
                start_modal.find(".btn-default").click(function(){
                    start_modal.find(".modal-dialog").addClass("modal-sm");
                });  
                app_index.lock();
                $('.index_page_date').datetimepicker({
                    language: 'zh-CN',
                    weekStart: 1,
                    todayBtn: 1,
                    autoclose: 1,
                    startDate:(new Date()).toLocaleDateString(),
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0
                });
                $('.index_page_time').datetimepicker({
                    language: 'zh-CN',
                    weekStart: 1,
                    todayBtn: 1,
                    autoclose: 1,
                    startDate:(new Date()).toLocaleDateString(),
                    todayHighlight: 1,
                    startView: 1,
                    minView: 0,
                    maxView: 1,
                    forceParse: 0
                });
                start_modal.find("#index_delete_confirm").unbind("click").click(function(){
                    var dtp_input2 = $("#dtp_input2").val();
                    var dtp_input3 = $("#dtp_input3").val();
                    if(dtp_input2=="" || dtp_input3 == ""){
                        alert("请选择正确的发布时间");
                        return false;
                    }  
                  var time = dtp_input2 + " " + dtp_input3 + ":00";
                  var ad_uri = start_modal.find(".uri").val();
                  // if(ad_uri.trim()==""){
                  //   alert("跳转地址不能为空");
                  //   return false;
                  // }
                  $.ajax({
                    type:"post",
                    url:"./addOrUpdateAdPic",
                    data:{
                      adPicUri:start_modal.find(".index_img_upload").attr("src"),
                      adType:start_modal.find(".start_edit_zone").attr("adtype"),
                      id:start_modal.find(".start_edit_zone").attr("adid"),
                      executeTime:start_modal.find(".ad_duration_time").val(),
                      adUri:ad_uri,
                      adStartTime: time
                    },
                    success:function(data){
                      console.log(data);
                      if(JSON.parse(data).success == true){
                        alert("首页设定发布成功。");
                        start_modal.modal("hide");
                      }else{
                        alert("首页设定发布失败.");
                      }
                    }
                  });
                });
              }

            })
           
            start_modal.find(".fa-minus-square").click(function(){
                if($(this).parents(".row").siblings().length>0){
                    $(this).parents(".row").remove();
                }             
            });

            var plus=start_modal.find(".fa-plus-square")
            plus.click(function(){
                $(this).parents(".row").after($(this).parents(".row").clone(function(){
                    plus=start_modal.find(".fa-plus-square");
                }));
                require("./edit.js").upload_dom(start_modal);
            });
        });  
        /**
         **点击clone节点
         **/
        param.template.unbind("click").click(function() {
            app_index.dom().popover.remove();
            var _this = $(this);
            var dropzone = app_index.dom().dropzone;
            if(_this.attr("data-tpl") == "t3" && dropzone.find("[data-tpl=t3]").length > 0){
                alert("首页轮播图只能有一个。");
                return false;
            }else if(_this.attr("data-tpl") == "t15" && dropzone.find("[data-tpl=t15]").length > 0){
                alert("首页竖向楼层只能有一个");
                return false;
            }
            var content = _this.clone().append(param.remove_btn.eq(0).clone()).css("height", "0px");
            dropzone.append(content);
            var height = _this.height();
            content.animate({
                height: (height + 15) + "px"
            }, "fast", "swing");
            self.refresh().remove_bind().carousel();
            var edit_each_click = content.find(".edit_each_click");
            if (edit_each_click.length < 1) {
                edit_each_click = content;
            }
            var edit = require("./edit.js");
            for (var i = 0; i < edit_each_click.length; i++) {
                edit.render(edit_each_click.eq(i).attr("data-edit"), edit_each_click.eq(i));
            }
            if (_this.attr("data-tpl") == "t14") {
                require("./slide.js").init('#dropzone');
                dropzone.find("[data-tpl=t14]").hover(function() {
                    dropzone.find(".swipe_button").show().animate({
                        opacity: 1
                    }, "normal", "swing");
                }, function() {
                    $("#dropzone .swipe_button").animate({opacity:0},"normal","swing");
                });
            }
            if (_this.attr("data-tpl") == "t15") {
                dropzone.find(".fa-plus-square").click(function() {
                    var clone_dom = $(this).parents(".orientation_content_add").prev().clone();
                    $(this).parents(".orientation_content_add").before(clone_dom);
                    edit.render("vertical_floor", $(this).parents(".orientation_content_add").prev());
                });
            }

            if (_this.attr("data-tpl") == "t3") {
              app_index.carousel();

            }

            if(dropzone.find("[data-tpl=t15]").length>0){
                dropzone.find("[data-tpl=t15]").before(content);
            }

            //dropzone.find("[data-tpl=t3]").find(".remove").remove();

            dropzone.find(".swiper-wrapper").sortable({
                items: '.swiper-wrapper li',
                sort: function() {}
            });
            app_index.cube_storage();
        });   
        /**
         ** 点击新建首页
         **/
        var sidebar = app_index.dom().sidebar;
        // sidebar.find("[data-tpl=t3]").trigger("click");
        sidebar.find("#add_index_page").click(function() {
            dropzone.find(".template").remove();
            sidebar.find(".sidebar-wrapper li").removeClass("active");
            $(this).addClass("active");
            param.left_content.children().hide();
            sidebar.find("#cube_div").slideDown();
            sidebar.find("[data-tpl=t3]").trigger("click");//触发轮播
        });
    },

    // 解锁/开锁
    lock:function(){
         $(".switch_lock").unbind().click(function(){
             var _this = $(this);
             if(_this.hasClass("fa-lock")) {
                    _this.addClass("fa-unlock").removeClass("fa-lock").attr("data-original-title","去解锁");

             }else{
                    _this.addClass("fa-lock").removeClass("fa-unlock").attr("data-original-title","去锁定");
             }
        });
    },

    onload: function() {
        window.onload = function() {
            var edit_storage = window.localStorage.getItem("cube_item") || "";
            if (edit_storage != "") {
                // $("#dropzone").html(edit_storage);
                // $(".carousel_container").css("height","auto");
            }
        }
    },
    cube_storage: function() {
        var cube_str = $("#dropzone").html();
        window.localStorage.setItem("cube_item", cube_str);
    },
    /**
     ** 刷新数据（用于clone或删除之后）
     **/
    refresh: function() {
        this.param.remove_btn = $(".drop_item").find(".remove");
        return this;
    },
    /**
     **删除模块
     **/
    remove_bind: function() {
        var self = this;
        self.param.remove_btn.click(function(e) {
            e.stopPropagation();
            app_index.dom().popover.remove();
            $(this).parent(".drop_item").animate({
                height: "0px",
                width: "0px"
            }, "fast", "swing", function() {
                $(this).remove();
            });
            self.refresh();
        });
        return this;
    },
    /**
     **轮播模块
     **/
    carousel: function() {
        $('.carousel').carousel({
            interval: 2000
        });
        return this;
    }
}
module.exports = app_index;
