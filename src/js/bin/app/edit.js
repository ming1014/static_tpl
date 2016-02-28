"use strict";
var TimeFn = null;
var temp_t15_content = "";
var edit_tpl = {
    param: {
        uploadJs: {},
        switchJs: {}
    },
    t15_click_goods_content: [{
       sku: '',
       main_title: '主标题',
       side_title:  "主标题",
       pay_month_type: "月供",
       pay_month: "0x12",
       price_style: "售价",
       price: 3500,
       uri: "",
       pic_url: "",
       is_show_paymonth: "true",
       is_show_price: "true"
    }],
    t15_click_ad_content: [{
      uri:'',
      pic_url:''
    }],
    dom: function() {
        var Dom = require("./app_index_dom.js")
        return new Dom();
    },
    init: function(el) {
        var popover = edit_tpl.dom().popover;
        edit_tpl.upload_dom(popover);
        edit_tpl.normal_bind(el);
        edit_tpl.composite_bind(popover.find(".lock-change"), popover.find(".fa-plus-square"), popover.find(".fa-minus-square"), popover.find(".img_upload"));
        edit_tpl.option();
        edit_tpl.input_focus(); 
    },
    // h5 原生url提示
    option: function() {
        $(".option_Type").change(function() {
            var select = $(".option_Type option:selected").text();
            if (select == "H5") {
                $(".option_Type").parent().prev().find("input").val("http://")
            } else if (select == "原生") {
                $(".option_Type").parent().prev().find("input").val("ufenqi://m.app.com")
            }
        })
    },
    // 文本框聚焦
    input_focus: function(){
            var pop_input=edit_tpl.dom().popover.find("input[type=text]");
            pop_input.click(function(){
            	var _this = $(this);
                _this.focus();
                _this.select(); 
            })
    },
    //上传图片，可初始化多个dom对象上传并预览,key为点击上传dom,value为预览dom
    upload_dom: function(popover) {
        if (popover.find(".cate_img").length > 0) {
            for (var i = 0; i < popover.find(".img_upload").length; i++) {
                var each = popover.find(".img_upload").eq(i);
                edit_tpl.upload_img(
                    [each, each.prev(".cate_img") || null], [popover.find(".summit_picture"), popover.find(".Upload_file")], [popover.find(".summit_picture1"), popover.find(".Upload_file1")]
                );
            }
        } else if (popover.find(".summit_picture").length > 0) {
            edit_tpl.upload_img(
                [popover.find(".summit_picture"), popover.find(".Upload_file")], [popover.find(".summit_picture1"), popover.find(".Upload_file1")]
            );
        } else if (popover.find(".summit_picture1").length > 0) {
            edit_tpl.upload_img(
                [popover.find(".summit_picture"), popover.find(".Upload_file")], [popover.find(".summit_picture1"), popover.find(".Upload_file1")]
            );
        }
    },
    //遍历上传参数
    upload_img: function() {
        var u = require("./img_upload.js");
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof Array && arguments[i].length >= 2) {
                u.init(arguments[i][0], arguments[i][1]);
            }
        }
    },
    composite_bind: function(lock_btn, add_btn, delete_btn, img_upload) {
        /**
         ** 锁定
         **/
        lock_btn.click(function() {
            var _this = $(this);
            if (_this.hasClass("fa-lock")) {
                _this.addClass("fa-unlock").removeClass("fa-lock").attr("data-original-title","去解锁");;
            } else {
                _this.addClass("fa-lock").removeClass("fa-unlock").attr("data-original-title","去锁定");;
            }
        });
        
        /**
        **类目选项编辑
        **/
        edit_tpl.dom().popover.find(".each_select").unbind("change").change(function(){
           var _this = $(this);
           var select_dom = _this.children('option:selected');
           _this.parents("tr").find(".cate_name").val(select_dom.val());
           _this.parents("tr").find(".cate_img").attr("src",select_dom.attr("picuri"));
           _this.parents("tr").find(".cate_uri").val(select_dom.attr("uri"));
        });
        /**
         **添加行
         **/
        edit_tpl.dom().popover.find(".fa-plus-square").unbind("click").click(function() {
        	var _this = $(this);
        	if(_this.parents(".t1_edit_popover").length > 0){
	        	$.ajax({
	                type: "get",
	                dataType: "json",
	                url: "./getItems",
	                success: function(data) {
			            var t1_add = __inline("../../../handlebars/app_index/t1_dropdown.handlebars");
			            var t1_content = t1_add({data:data.data});
			            var popover = edit_tpl.dom().popover;
			            var one_row = _this.parents("tr");
			            var clone_row = one_row.clone();
			            clone_row.find(".cate_img").attr("src","http://cdn.ufenqi.com/cms/img/120x120.png");
			            one_row.after(clone_row)
			                .next()
			                .find("td input,td textarea")
			                .val("")
			                .attr("placeholder", "请输入");
			            one_row.next().find("td").eq(0).append(t1_content);
			            edit_tpl.composite_bind(clone_row.find(".lock-change"), clone_row.find(".fa-plus-square"), clone_row.find(".fa-minus-square"), clone_row.find(".img_upload"));
			            edit_tpl.upload_dom(popover);
			            require("./main.js").lock();
			            clone_row.find(".each_select").unbind("change").change(function(){
			               var select_dom = $(this).children('option:selected');
                           clone_row.find(".cate_name").val(select_dom.val());
                           clone_row.find(".cate_img").attr("src",select_dom.attr("picuri"));
                           clone_row.find(".cate_uri").val(select_dom.attr("uri"));
			            });




	                }

	        	});
	        }else{
	        	    var popover = edit_tpl.dom().popover;
		            var one_row = $(this).parents("tr");
		            var clone_row = one_row.clone();
		            clone_row.find(".cate_img").attr("src","http://cdn.ufenqi.com/cms/img/banner.png");
		            one_row.after(clone_row)
		                .next()
		                .find("td input,td textarea")
		                .val("")
		                .attr("placeholder", "请输入");
		            edit_tpl.composite_bind(clone_row.find(".lock-change"), clone_row.find(".fa-plus-square"), clone_row.find(".fa-minus-square"), clone_row.find(".img_upload"));
		            edit_tpl.upload_dom(popover);
		            require("./main.js").lock();
			 };
             edit_tpl.pop_scroll();
        });
        /**
         **删除当前行
         **/
        delete_btn.click(function() {
            var el = $(this).parents("tr");
            if ($(this).parents(".popover").find(".popover-title").html() == "类目模板") {
                if ($(this).parents(".ui-sortable").find("tr").length <= 4) {
                    alert("类目条目不能少于4条");
                    return false;
                }
            }
            if (el.siblings().length > 0) {
                el.find("td").animate({
                    height: "0px",
                    width: "0px",
                    padding: "0px"
                }, "fast", "swing", function() {
                    el.remove();
                });
            } else {
                el.find("td input,td textarea").val("").attr("placeholder", "请输入");
            }
        });

    },
    normal_bind: function(el) {
        var popover = edit_tpl.dom().popover;
        var dropzone = edit_tpl.dom().dropzone;
        edit_tpl.upload_dom(popover);
        //edit_tpl.param.uploadJs.init(popover.find(".summit_picture1"),popover.find(".Upload_file1"));
        dropzone.find(".orientation_drag").sortable({
            items: '#dropzone .orientation_drag .edit_each_click',
            sort: function() {}
        });
        popover.find(".form-horizontal").sortable({
            items: '.header-input',
            opacity: 0.6,
            update: function() {
                var input = popover.find(".header-input");
                var length = input.length;
                for (var i = 0; i < length; i++) {
                    input.eq(i).find(".switch_index").html(i + 1);
                }
            }
        });

        edit_tpl.orientation_header_del();
        edit_tpl.orientation_content_add();

        //竖向楼层头部（小块）编辑
        dropzone.find(".orientation_header_li").unbind("dblclick").dblclick(function(e) {
            e.stopPropagation();
            clearTimeout(TimeFn);
            edit_tpl.dom().popover.remove();
            var _this = $(this);
            var index = _this.index();
            dropzone.find(".orientation_header_li").removeClass("index-active");
            _this.addClass("index-active");
            dropzone.find(".orientation_content_list").hide();
            dropzone.find(".orientation_content_list").eq(index).show();
        });  

        popover.find("#orientation_header_add").click(function(){
            edit_tpl.orientation_header_add_one($(this));
            require("./assignment.js").vertical_floor_header_save("vertical_floor_header", $("#dropzone").find(".vertical_title_ul"), edit_tpl.dom().popover);
        });
        var assignment = require("./assignment.js");
        popover.find(".orientation_edit").click(function() {
            var content = __inline("../../../handlebars/app_index/picture_text.handlebars");
            var el_content = __inline("../../../handlebars/cube/t15_1.handlebars");
            el.html(el_content({}));
            click_after(content({}));   
        });
        popover.find(".orientation_change").unbind("click").click(function() {
            var content, el_content, url_type;
            temp_t15_content = el.prop("outerHTML");
            if (el.find(".img_module").length > 0) {
                edit_tpl.t15_click_ad_content = require("./auto_fill.js")(el, "orientation_ad");
                el_content = __inline("../../../handlebars/cube/t15_11.handlebars");
                content = __inline("../../../handlebars/app_index/orientation_ad.handlebars");
                content = content({data: edit_tpl.t15_click_ad_content[0]});
                url_type = "orientation_ad";
                el.css("background", "white").html(el_content({data: edit_tpl.t15_click_ad_content}));
                click_after(content, url_type);
            } else if (el.find(".navigate_module").length > 0) {
                el_content = __inline("../../../handlebars/cube/t15_10.handlebars");
                content = __inline("../../../handlebars/app_index/orientation_navigate.handlebars");
                url_type = "orientation_nav";
                el.css("background", "white").addClass("zdfq").html(el_content({}));
                click_after(content({}), url_type);
            } else {
                edit_tpl.t15_click_goods_content = require("./auto_fill.js")(el, "orientation_goods");
                el_content = __inline("../../../handlebars/cube/t15_9.handlebars");
                content = __inline("../../../handlebars/app_index/orientation_goods.handlebars");
                url_type = "orientation_goods";
                el.css("background", "white").html(el_content({data: edit_tpl.t15_click_goods_content}));
                click_after(content({}), url_type);
            }

            edit_tpl.render(url_type, el);
            require("./assignment.js").init(url_type, el);
        });
        popover.find(".orientation_remove").click(function() {
            if (el.next("li").length != 0 || el.prev("li").length != 0) {
                popover.remove();
                el.animate({
                    width: "0px",
                    height: "0px"
                }, "fast", "swing", function() {
                    el.remove();
                })
            } else {
                alert("就剩一个了，不能删除。");
            }
        });
        popover.find(".orientation_add").click(function() {
            var content = __inline("../../../handlebars/app_index/orientation_goods.handlebars");
            click_after(content({}));
        });
        popover.find(".navigate_ad").click(function() {
            var content = __inline("../../../handlebars/app_index/orientation_ad.handlebars");
            var el_content = __inline("../../../handlebars/cube/t15_11.handlebars");
            el.css("background", "white").html(el_content({data: edit_tpl.t15_click_ad_content}));
            click_after(content({data:edit_tpl.t15_click_ad_content[0]}), "orientation_img");
            edit_tpl.render("orientation_img", el);
        });
        popover.find(".navigate_nav").click(function() {
            var content = __inline("../../../handlebars/app_index/orientation_navigate.handlebars");
            var el_content = __inline("../../../handlebars/cube/t15_2.handlebars");
            el.css("background", "white").addClass("zdfq").html(el_content({}));
            click_after(content({}), "orientation_nav");
            edit_tpl.render("orientation_nav", el);
        });
        popover.find(".navigate_goods").click(function() {
            var content = __inline("../../../handlebars/app_index/orientation_goods.handlebars");
            var el_content = __inline("../../../handlebars/cube/t15_9.handlebars");
            el.css("background", "white").html(el_content({data: edit_tpl.t15_click_goods_content}));
            click_after(content({}), "orientation_goods");
            edit_tpl.render("orientation_goods", el);
        });
        var click_after = function(content, urlType) {
            edit_tpl.dom().popover.find(".popover-content").html(content);
            edit_tpl.pop_scroll();
            edit_tpl.normal_bind(el);
            assignment.init(urlType, el);
        }
    },
    orientation_content_add: function() {
        //竖向楼层添加商品编辑
        var dropzone = edit_tpl.dom().dropzone;
        require("./assignment.js").template_cancel();
        // dropzone.find(".orientation_content_add").find("i").unbind("click").click(function(){
        //       var square_empty = dropzone.find(".square_empty").clone().eq(0);
        //       dropzone.find(".orientation_content_add").before(square_empty);
        //       edit_tpl.render("vertical_floor",square_empty);
        //   });
    },
    orientation_header_add_one: function(el) {
        var pr = el.parents(".form-group");
        var temp_dom = pr.prev().clone();
        var str = parseInt(temp_dom.find(".switch_index").html());
        var temp_distinct = parseInt(temp_dom.attr("data-distinct").replace(/[^0-9]/ig, ""));
        var max_narrow = 0;
        //新增处理冲突
        for (var i = 0; i < $(".popover").find(".header-input").length; i++) {
            var each_number = parseInt($(".popover").find(".header-input").eq(i).attr("data-distinct").replace(/[^0-9]/ig, ""));
            var max_narrow = (each_number - temp_distinct > max_narrow) ? (each_number - temp_distinct) : max_narrow;
        }
        temp_dom.attr("data-distinct", "part" + (temp_distinct + max_narrow + 1)).find(".switch_index").html(++str);
        pr.before(temp_dom);
        //require("./assignment.js").vertical_floor_header_save("vertical_floor_header",$("#dropzone").find(".vertical_title_ul"),edit_tpl.dom().popover);
        edit_tpl.orientation_header_del();
    },

    //竖向楼层头部标签删除
    orientation_header_del: function() {
        var popover = edit_tpl.dom().popover;
        popover.find(".orientation_header_del .fa-minus-square").click(function() {
            var pr = $(this).parents(".form-group");
            var header_input = pr.parents(".form-horizontal").find(".header-input");
            var count = header_input.length;
            if (pr.next().hasClass("header-input") || pr.prev().hasClass("header-input")) {
                pr.animate({
                    width: "0px",
                    height: "0px"
                }, "fast", "swing", function() {
                    if (pr.index() < count - 1) {
                        for (var i = pr.index() + 1; i < count; i++) {
                            var current_number = parseInt(header_input.eq(i).find(".switch_index").html());
                            header_input.eq(i).find(".switch_index").html(--current_number);
                        }
                    }
                    pr.remove();
                })
            }
        });
    },
    pop_scroll: function() {
        var popover = edit_tpl.dom().popover;
        var top_h = popover.css("top");
        top_h = parseInt(top_h.substring(0, top_h.length - 2));
        var content_h = popover.height();
        var win_h = $(window).height();
        if (top_h + content_h > win_h - 110) {
            popover.find(".popover-content").css({
                "max-height": win_h - 80 - top_h + "px",  
                "overflow-y": "scroll"
            });
        }
    },
    render: function(url_type, el) {
        var tpl, title, content;
        var close_pop_btn = "<span class='close_pop_btn' style='float:right;right:10px;top:5px;cursor:pointer;'>X</span>";
        var Auto_fill = require("./auto_fill.js");
        var data = new Auto_fill(el, url_type);
        switch (url_type) {
            case "category":
                title = "类目编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/category.handlebars");
                edit_tpl.pop_ajax(true, el, tpl, title, "./getItems", "category");
                break;
            case "carousel_goods":
                title = "轮播商品编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/carousel_goods.handlebars");
                break;
            case "header_ad":
                title = "头条编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/header_ad.handlebars");
                break;
            case "carousel":
                title = "轮播图编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/carousel.handlebars");
                break;
            case "picture":
                title = "首页管理——通栏广告位图片在右编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/picture.handlebars");
                break;
            case "onetwo_text_pic1":
                title = "图文广告位编辑 " + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/picture_text_many.handlebars");
                break;
            case "onetwo_text_pic2":
                title = "图文广告位编辑 " + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/picture_text.handlebars");
                break;
            case "vertical_floor":
                title = "竖向商品楼层" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/orientation_step1.handlebars");
                break;
            case "one_row_three_four":
                title = "一排横向编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/one_row_three_four.handlebars");
                break;
            case "navigate":
                title = "导航编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/navigate.handlebars");
                break;
            case "vertical_floor_header":
                title = "竖向模板头部编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/orientation_header.handlebars");
                break;
            case "only_pic_big":
                title = "广告位高编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/only_pic_big.handlebars");
                break;
            case "only_pic_small":
                title = "广告位高编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/only_pic_small.handlebars");
                break;
            case "two_samll_pic":
                title = "一行两个广告图片编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/two_samll_pic.handlebars");
                break;
            case "navigate_pic":
                title = "坑位导航编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/navigate_pic.handlebars");
                break;
            case "landscape_header_img":
                title = "横向楼层图片内容编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/landscape_header_img.handlebars");
                break;
            case "landscape_header_title":
                title = "横向头部标题编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/landscape_header_title.handlebars");
                break;
            case "landscape_content":
                title = "横向楼层具体编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/landscape_content.handlebars");
                break;
            case "orientation_goods":
                title = "竖向楼层商品编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/orientation_goods.handlebars");
                break;
            case "orientation_nav":
                title = "竖向楼层导航编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/orientation_navigate.handlebars");
                break;
            case "orientation_goods":
                title = "竖向楼层商品编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/orientation_goods.handlebars");
                break;
            case "orientation_img":
                title = "竖向楼层单张图片广告编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/orientation_ad.handlebars");
                break;


            default:
                title = "默认编辑" + close_pop_btn;
                tpl = __inline("../../../handlebars/app_index/category.handlebars");
        }
        if (url_type != "category") {
            edit_tpl.load_html(el, tpl({
                data: data
            }), title, url_type);
        }
    },
    pop_ajax: function(is_required, el, tpl, title, ajax_url, url_type) {
        if (!is_required) {
            edit_tpl.load_html(el, tpl({}));
        } else {
            $.ajax({
                type: "get",
                dataType: "json",
                url: ajax_url,
                success: function(data) {
                	var pattern = /.*\((.*)\)/;
        	        var li_list = el.find("li");
        	        var exist_data = [];
                	for(var m = 0;m<li_list.length;m++){
                        var status = (li_list.eq(m).attr("lock-status") == "true" || li_list.eq(m).attr("lock-status") == undefined)?"fa-unlock":"fa-lock";
                        var lock_tips = (status == "fa-lock")?"去锁定":"去解锁";
                        var pic_uri = "";
                        try{
                            pic_uri = li_list.eq(m).find(".cate_img").css("background").match(pattern)[1];
                        }catch(e){
                            pic_uri = "";
                        }
                		var each_t1 = {
                			uri: li_list.eq(m).attr("data-uri"),
                			picUri: pic_uri,
                			title: li_list.eq(m).find("span").html(),
                            lock_switch: status,
                            lock_tips:lock_tips
                		}
                		exist_data.push(each_t1);
                	 }

                    var t1_add = __inline("../../../handlebars/app_index/t1_dropdown.handlebars");
                    var t1_content = t1_add({data:data.data});

                　　 var objE = document.createElement("div");
                　　 objE.innerHTML = tpl({data: exist_data});
                　　 var after_dom = $(objE).children();
                    var tr_list = after_dom.find(".t1_edit_popover tr");
                    for(var m = 0;m<tr_list.length;m++){
                        tr_list.eq(m).find("td").eq(0).append(t1_content);
                    }
                    var out_str = after_dom.prop("outerHTML");                     
                    //类目特殊情况
                    if (url_type == "category") {
                        // if (!data.data || data.data.length == 0) {
                        //     var tpl2 = __inline("../../../handlebars/app_index/category_static.handlebars");
                        //     edit_tpl.load_html(el, tpl2({}), title, url_type);
                        // } else {
                            edit_tpl.load_html(el, out_str, title, url_type);
                        // }
                    }
                }
            });
        }

    },
    load_html: function(el, content, title, url_type) {
        var trigger = "manual";
        if (url_type == "orientation_goods") {
            //edit_tpl.dom().popover.remove();
            edit_tpl.dom().popover.find(".popover-content").html(content);
            edit_tpl.init(el);
            require("./assignment.js").init(url_type,el);
            //根据sku获取商品信息  t15用
                edit_tpl.dom().popover.find(".sku").blur(function() {
                    require("./assignment.js").read_sku_info($(this).val(), edit_tpl.dom().popover);
                });

        }
        el.popover({
            html: true,
            title: title,
            trigger: trigger,
            content: content,
            container: 'body',
            animation: "true"
        }).on("click", function() {
            edit_tpl.dom().popover.remove();
            edit_tpl.dom().dropzone.find(".edit_each_click").css("border", "0px");
            el.css("border", "2px dotted red");
            el.popover("show");
            var popover = edit_tpl.dom().popover;
            //t15头部标题点击弹出框延迟300毫秒,单击现行。
            if(el.hasClass("vertical_title_ul")){
              clearTimeout(TimeFn);
              edit_tpl.dom().popover.hide();
              TimeFn = setTimeout(function(){
                  edit_tpl.dom().popover.show();
              },300);
            }
            if (url_type == "orientation_goods") {
                edit_tpl.dom().popover.find(".sku").blur(function() {
                    require("./assignment.js").read_sku_info($(this).val(), edit_tpl.dom().popover);
                });
            }
            popover.find(".popover-content").html(content);
            if (url_type == "vertical_floor_header") {
                var li_list = el.find("li");
                var length = li_list.length;
                for (var i = 0; i < length - 1; i++) {
                    edit_tpl.orientation_header_add_one(popover.find("#orientation_header_add"));
                }
                for (var j = 0; j < length; j++) {
                    popover.find(".header-input input").eq(j).val(li_list.eq(j).html());
                     popover.find(".header-input textarea").eq(j).val(li_list.eq(j).attr("skus"));
                    popover.find(".header-input").eq(j).attr("data-distinct", li_list.eq(j).attr("data-distinct"));
                }

            }
            popover.find(".close_pop_btn").unbind("click").click(function() {
                popover.remove();
                if (url_type == "orientation_img" || url_type == "orientation_goods" || url_type == "orientation_nav" || url_type == "orientation_ad") {
                    url_type = "vertical_floor";
                }
                // if(el.parents(".orientation_content_list").length>0){
                //     el.prop("outerHTML",temp_t15_content);

                // }
                edit_tpl.render(url_type, el);
            });
            
            
            popover.find(".edit_quit").unbind("click").click(function(){
                el.css("border","0px");
            });
          

            popover.find(".edit_add_row").unbind("click").click(function(){
            	var default_content = __inline("../../../handlebars/cube/t6_1.handlebars");
            	el.parents(".template").find(".t6_clear_both").before(default_content({}));
            	var each_data_click = el.parents(".template").find(".edit_each_click");
            	var length = each_data_click.length;
            	edit_tpl.render("two_samll_pic",each_data_click.eq(length-1));
                edit_tpl.render("two_samll_pic",each_data_click.eq(length-2));
            });

            popover.find(".t6_delete").unbind("click").click(function(){
                var current_index = el.index();
                var pa = el.parents(".template");
                if(pa.find("img").length >2){
	                if(Math.ceil(current_index%2)==0){
	                	pa.find("img").eq(current_index).remove();
	                	pa.find("img").eq(current_index).remove();
	                }else{
	                	pa.find("img").eq(current_index).remove();
	                	pa.find("img").eq(current_index - 1).remove();
	                }
                }

                popover.remove();
            });

            //初始化解锁，未解锁弹出提示
            popover.find('.lock-change').tooltip();
            edit_tpl.init(el);
            require("./assignment.js").init(url_type, el);
            popover.find(".edit_sort_zone").sortable({
                items: '.tr_sortable',
                sort: function() {}
            });
        })
    }

}
module.exports = edit_tpl;
