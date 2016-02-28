var assignment = {
    /**
     ** type:点击保存的类型 el:保存之后发生变化的对象
     **/
    init: function(url_type, el) {
        assignment.template_save(url_type, el);
        assignment.template_cancel();
    },
    dom: function() {
        var Dom = require("./app_index_dom.js")
        return new Dom();
    },
    template_save: function(url_type, el) {
        //var edit_confirm = $(".edit_confirm");
        //确认按钮点击
        var popover = assignment.dom().popover;
        popover.find(".edit_confirm").unbind("click").click(function() {
            el.css("border","0px");
            if (url_type == "category") {
                assignment.category_save(url_type, el, popover);
            } else if (url_type == "header_ad") {
                assignment.header_ad_save(url_type, el, popover);

            } else if (url_type == "only_pic_big" || url_type == "only_pic_small" || url_type == "navigate_pic") {
                assignment.only_pic_save(url_type, el, popover);

            } else if (url_type == "two_samll_pic") {
                assignment.two_samll_pic_save(url_type, el, popover);

            } else if (url_type == "onetwo_text_pic1") {
                assignment.onetwo_text_pic1_save(url_type, el, popover);

            } else if (url_type == "onetwo_text_pic2" || url_type == "one_row_three_four") {
                assignment.onetwo_text_pic2_save(url_type, el, popover);

            } else if (url_type == "navigate") {
                assignment.navigate_save(url_type, el, popover);

            } else if (url_type == "landscape_header_img") {
                assignment.landscape_header_img_save(url_type, el, popover);

            } else if (url_type == "landscape_header_title") {
                assignment.landscape_header_title_save(url_type, el, popover);

            } else if (url_type == "carousel") {
                assignment.carousel_save(url_type, el, popover);

            }else if (url_type == "carousel_goods") {
                assignment.carousel_goods_save(url_type, el, popover);

            } else if (url_type == "landscape_content") {
                assignment.landscape_content_save(url_type, el, popover);

            } else if (url_type == "vertical_floor_header") {
                assignment.vertical_floor_header_save(url_type, el, popover);

            } else if (url_type == "orientation_goods") {
                assignment.orientation_goods_save(url_type, el, popover);

            } else if (url_type == "orientation_nav") {
                assignment.orientation_nav_save(url_type, el, popover);

            } else if (url_type == "orientation_img") {
                assignment.orientation_img_save(url_type, el, popover);

            } else if (url_type == "orientation_ad") {
                //竖向楼层广告
                assignment.orientation_ad_save(url_type, el, popover);

            }
            popover.remove();
            if (url_type == "orientation_img" || url_type == "orientation_goods" || url_type == "orientation_nav" || url_type == "orientation_ad") {

                url_type = "vertical_floor";
            }
            require("./edit.js").render(url_type, el);
            var cube_str = $("#dropzone").html();
            window.localStorage.setItem("cube_item", cube_str);
        });

    },

    orientation_ad_save: function(url_type, el, popover) {
        el.find(".img_url").attr("src", popover.find(".Upload_file1").attr("src"))
            .attr("data-uri", popover.find(".uri").val());
    },

    read_sku_info: function(sku, popover) {
        var sku = popover.find(".sku").val() || "";
        if (sku != "") {
            sku = sku.replace(/\s+/g, "");
            $.ajax({
                type: "get",
                url: "./getGoodsBylist",
                dataType: "json",
                data: {
                    goodsIds: sku
                },
                success: function(data) {
                    if (data.code != 200) {
                        alert(data.msg);
                        return;
                    } else {
                        popover.find(".main_title").val(data.data[0].name);
                        popover.find(".pay_month").val(data.data[0].monthPayment);
                        popover.find(".price").val(data.data[0].price);
                        popover.find(".uri").val(data.data[0].uri);
                        popover.find(".Upload_file1").attr("src", data.data[0].picUri).css("opacity", 1);
                    }
                }
            })
        }
    },

    orientation_goods_save: function(url_type, el, popover) {
        var sku = popover.find(".sku").val() || "";
        assignment.same_set(["main_title", "side_title", "pay_month", "price"], el);
        el.find(".goods_module").attr("sku", sku);
        el.attr("data-uri", popover.find(".uri").val());
        assignment.bg_css(el.find(".shouji1"), popover.find(".Upload_file1").attr("src"), "80%");
    },

    orientation_img_save: function(url_type, el, popover) {
        var img = popover.find(".Upload_file1").attr("src") || "";
        var uri = popover.find(".uri").val();
        if (img != "") {
            el.find(".img_url").attr("src", img);
            el.find(".img_url").attr("data-uri", uri);
        }
    },

    orientation_nav_save: function(url_type, el, popover) {
        el.find(".main_title").html(popover.find(".main_title").val());
        el.find(".side_title").html(popover.find(".side_title").val());
        for (var i = 1; i < 7; i++) {
            el.find("li").attr("skus",popover.find("textarea").eq(i-1).val());
            el.find(".nav" + i).html(popover.find(".title" + i).val());
            el.find(".nav" + i).attr("data-uri", popover.find(".uri" + i).val());
        }
    },

    //竖向商品楼层标题编辑
    vertical_floor_header_save: function(url_type, el, popover) {
        var input = popover.find("input");
        var li_list = el.find("li");
        var clone_li = li_list.eq(0).clone();
        var edit = require("./edit.js");
        for (var i = 0; i < input.length; i++) {
            var temp_distinct = popover.find(".header-input").eq(i).attr("data-distinct");
            if (li_list.length <= i) {
                el.append(clone_li.attr("data-distinct", temp_distinct));
                var tpl = __inline("../../../handlebars/cube/t15_4.handlebars");
                var content = tpl({});
                var vertical_each_contentList = el.parents(".template").find(".vertical_each_contentList");
                if(vertical_each_contentList.length<1){
                    vertical_each_contentList = el.parents(".template").find(".t15_content_list");
                }
                vertical_each_contentList.append(content);
                edit.render("vertical_floor", vertical_each_contentList.find("ul").eq(i).find("li").eq(0));
                var length = vertical_each_contentList;
                vertical_each_contentList.find("ul").eq(i).attr("data-distinct", temp_distinct).
                find(".fa-plus-square").click(function() {
                    var clone_dom = $(this).parents(".orientation_content_add").prev().clone();
                    $(this).parents(".orientation_content_add").before(clone_dom);
                    edit.render("vertical_floor", $(this).parents(".orientation_content_add").prev());
                });
            }
            el.find("li").eq(i).html(input.eq(i).val());
        }
        if (li_list.length > i) {
            for (i; i < li_list.length; i++) {
                li_list.eq(i).remove();
            }
        }


        //批量查询sku数据，sku数目相对于之前增加则批量加，反之，批量减
        var p = 0;
        var h = 0;
        var k = 0;
        set_each_t15_content(k);
        function set_each_t15_content(k){
            var temp_skus = popover.find("textarea").eq(h).val();
            if(temp_skus != ""){
                $.ajax({
                    type: "get",
                    url: "./getGoodsBylist",
                    dataType: "json",
                    data: {
                        goodsIds:  popover.find("textarea").eq((++h)-1).val()
                    },
                    success: function(data){
                        ++p;
                        el.find("li").eq(p-1).attr("skus",popover.find("textarea").eq(p-1).val());
                        var search_length = data.data.length;
                        var each_contentList =  el.parents(".template").find(".orientation_content_list").eq(p-1);
                        var each_box_content = each_contentList.find(".goods_module");
                        if(search_length < each_box_content.length){
                            for(var n = search_length; n < each_box_content.length; n++){
                                each_box_content.eq(n).parents("li").remove();
                            }
                        }else{
                            for(var n = each_box_content.length; n < search_length; n++){
                                var append_content = __inline("../../../handlebars/cube/t15_5.handlebars");
                                each_contentList.find(".orientation_content_add").before(append_content({}));
                            }
                        } 
                        var temp_data_arr = [];                       
                        for(var m = 0; m < each_contentList.find(".goods_module").length; m++){
                            var temp_box = each_contentList.find(".goods_module").eq(m);
                            temp_data_arr[0] = data.data[m];
                            var _html = __inline("../../../handlebars/cube/t15_goods_repeat.handlebars");
                            var _str = _html({data:temp_data_arr});
                            temp_box.parents("li").prop("outerHTML",_str);
                            //assignment.read_sku_info(temp_box.attr("sku"), edit_tpl.dom().popover);
                            require("./edit.js").render("orientation_goods",each_contentList.find(".goods_module").eq(m).parents("li"))
                        }

                        if(k<popover.find("input").length){
                          set_each_t15_content(++k);
                        }
                    }
                })
            }
        }








    },
    //横向商品楼层具体编辑
    landscape_content_save: function(url_type, el, popover) {
        assignment.same_set(["main_title", "pay_month"], el);
        el.attr("data-uri", popover.find(".ad_uri").val());
        el.attr("label", popover.find(".label").val());
        el.find(".price").html(popover.find(".total_price").val());
        el.find(".pay_month").html(popover.find(".pay_month").val());
        el.find(".pay_month_title").html(popover.find(".pay_month_title").val());
        el.find(".pricestyle").html(popover.find(".price_title").val());
        assignment.bg_css(el.find(".img_url"), popover.find(".Upload_file1").attr("src"), "100%");
    },

    //轮播编辑
    carousel_save: function(url_type, el, popover) {
        el.find(".new_add").remove();
        var tr_list = popover.find(".each_list");
        var origin_slide_div = el.find(".slide_div");
        for(var j = 1;j< origin_slide_div.length;j++){
            origin_slide_div.eq(1).remove();
            origin_slide_div.eq(j).remove();
            el.find(".carousel-indicators li").eq(j).remove();
        }
        var dot_li = el.find(".carousel-indicators li");
        for(var k = 1;k<dot_li.length;k++){
            el.find(".carousel-indicators li").eq(k).remove();
        }
        for (var i = 0; i < tr_list.length; i++) {
            var lock_status = (tr_list.eq(i).find(".fa-unlock").length>0)?true:false;
        	var clone_dom = el.find(".slide_div").eq(0).clone().removeClass("active").addClass("new_add");
            var temp = tr_list.eq(i);
            var uri = temp.find(".cate_uri").val();
            var cate_img = temp.find(".cate_img").attr("src");
            if (i == 0) {
                el.find(".img_data").attr({
                    "data-uri": uri,
                    "src": cate_img,
                    "lock-status":lock_status
                });
            } else {
                clone_dom.find(".img_data").attr({
                    "data-uri": uri,
                    "src": cate_img,
                    "lock-status":lock_status
                });
                el.find(".carousel-inner .slide_div").eq(i).remove();
                el.find(".carousel-inner").append(clone_dom);
            }
            if(i>=1){
            	el.find(".carousel-indicators li").eq(i).remove();
            	el.find(".carousel-indicators").append('<li data-target="#carousel-example-generic" data-slide-to='+ i +' class=""></li>');
            }
        }
        el.find(".slide_div").eq(0).addClass("active");
        el.find('.carousel').carousel({
            interval: 2000
        });

    },

    //轮播商品编辑
    carousel_goods_save: function(url_type, el, popover){
        el.find(".new_add").remove();
        el.find(".Carousel_title").html(popover.find(".t13_title").val());
        var tr_list = popover.find(".each_list");
        var origin_slide_div = el.find(".slide_div");
        for(var j = 1;j< origin_slide_div.length;j++){
            origin_slide_div.eq(1).remove();
            origin_slide_div.eq(j).remove();
            el.find(".carousel-indicators li").eq(j).remove();
        }
        var origin_slide_div = el.find(".slide_div");
        for(var j = 1;j< origin_slide_div.length;j++){
            origin_slide_div.eq(1).remove();
        }
        var dot_li = el.find(".carousel-indicators li");
        for(var k = 1;k<dot_li.length;k++){
            el.find(".carousel-indicators li").eq(k).remove();
        }
        for (var i = 0; i < tr_list.length; i++) {
            var lock_status = (tr_list.eq(i).find(".fa-unlock").length>0)?true:false;
        	var clone_dom = el.find(".slide_div").eq(0).clone().removeClass("active").addClass("new_add");
            var temp = tr_list.eq(i);
            var uri = temp.find(".cate_uri").val();
            var cate_img = temp.find(".cate_img").attr("src");
            if (i == 0) {
                el.find(".img_data").attr({
                    "data-uri": uri,
                    "src": cate_img,
                    "lock-status":lock_status
                });
            } else {
                clone_dom.find(".img_data").attr({
                    "data-uri": uri,
                    "src": cate_img,
                    "lock-status":lock_status
                });
                el.find(".carousel-inner").append(clone_dom);
            }
            if(i>=1){
            	el.find(".carousel-indicators li").eq(i).remove();
            	el.find(".carousel-indicators").append('<li data-target="#carousel-example-generic" data-slide-to='+ i +' class=""></li>');
            }
        }
        el.find(".slide_div").eq(0).addClass("active");
        el.find('.carousel').carousel({
            interval: 2000
        });
    },

    //横向头部内容编辑
    landscape_header_img_save: function(url_type, el, popover) {
        var sku = popover.find(".sku_input").val();
        var img_uri = popover.find(".ad_uri").val();
        var pricestyle = popover.find(".price_title").val();
        el.attr("pricestyle",pricestyle);
        el.attr("data-uri", img_uri);
        assignment.bg_css(el, popover.find(".Upload_file1").attr("src"), "100%");
        el.attr("sku", sku);
        if (sku != "") {
            $.ajax({
                type: "get",
                url: "./getGoodsBylist",
                dataType: "json",
                data: {
                    goodsIds: sku
                },
                success: function(data) {
                    if (data.code != 200) {
                        alert(data.msg);
                        return;
                    } else {
                        var tpl = __inline("../../../handlebars/cube/t14_1.handlebars");
                        var content = tpl({
                            data: data.data
                        });
                        var pa = el.parents(".drop_item").find(".swiper-wrapper");
                        pa.html(content);
                        require("./slide.js").init("#dropzone");
                        var temp = $(".landscape_render");
                        var edit = require("./edit.js");
                        for (var i = 0; i < temp.length; i++) {
                            edit.render("landscape_content", temp.eq(i));
                        }
                        if ($(".is_show_pay_month").prop("checked", true)) {
                            pa.find(".pay_month_div").show();
                            pa.find(".price_div").hide();
                            el.attr("isshowPaymonth", "true");
                            el.attr("isShowPrice", "false");
                        } else {
                            pa.find(".pay_month_div").hide();
                            pa.find(".price_div").show();
                            el.attr("isshowPaymonth", "false");
                            el.attr("isShowPrice", "true");
                        }
                        el.attr("priceStyle", popover.find(".price_title").val());
                    }
                }
            })
        }



    },
    //横向头部标题
    landscape_header_title_save: function(url_type, el, popover) {
        el.find(".landscape_header_title").html(popover.find(".floor_title").val());
        var more = popover.find(".floor_more").val();
        if (more == undefined || more == "") {
            el.find(".more").remove();
        }
        el.attr("data-uri", more);
        el.attr("data-more", more);

    },
    //导航保存
    navigate_save: function(url_type, el) {
        var popover = $(".popover");
        el.find(".main_title").html(popover.find(".main_title").val());
        el.find(".side_title").html(popover.find(".side_title").val());
        for (var i = 1; i < 7; i++) {
            el.find(".nav" + i).html(popover.find(".nav" + i).val());
            el.find(".nav" + i).attr("uri", popover.find(".uri" + i).val());
        }
    },
    
    //t7 t8价格样式，便于传输后台
    com_price: function(popover){
        var input_1=popover.find(".input_1").val();
        var input_3=popover.find(".input_3").val();
        var input_red=popover.find(".input_red").val();               
        var input_data=input_1+'<font size="30" color="#FF0033">'+input_red+'</font>'+input_3;
        return input_data;
    },
    //一加二图文第一张
    onetwo_text_pic1_save: function(url_type, el) {
        var popover = $(".popover");
        el.attr("data-uri", popover.find(".ad_uri").val());
        assignment.same_set(["main_title", "side_title"], el);
        el.find(".pay_month").attr("src", popover.find(".Upload_file").attr("src"));
        el.find(".img_url").attr("src", popover.find(".Upload_file1").attr("src"));
        el.attr("data-com-price",assignment.com_price(popover));
    },


    //一加二图文第二，三张
    onetwo_text_pic2_save: function(url_type, el) {
        var popover = $(".popover");
        if(url_type == "one_row_three_four"){
            assignment.same_set(["main_title", "side_title"], el);
        }else{
            assignment.same_set(["main_title", "side_title", "pay_month"], el);
        }
        el.attr("data-uri", popover.find(".ad_uri").val());
        el.find(".pay_month_title").html(popover.find(".input_1").val());
        assignment.bg_css(el.find(".img_url"), popover.find(".Upload_file1").attr("src"), "100%");
        el.attr("data-com-price",assignment.com_price(popover));
        el.find(".qi_last").html(popover.find(".input_3").val());
    },
    two_samll_pic_save: function(url_type, el, popover) {
        var url = popover.find(".Upload_file1").attr("src") || "";
        var uri = popover.find(".ad_uri").val();
        el.attr("data-uri", uri);
        if (url != "") {
            el.attr("src", url);
        }
    },
    //纯图片(广告)保存
    only_pic_save: function(url_type, el, popover) {
        var url = popover.find(".Upload_file1").attr("src") || "";
        var uri = popover.find(".ad_uri").val();
        el.find("img").attr("data-uri", uri);
        if (url != "") {
            el.find("img").attr("src", url);
        }
    },
    /**
     **类目保存
     **/
    category_save: function(url_type, el, popover) {
        var edit_form = popover.find(".edit_sort_zone");
        var each_tr = edit_form.find("tr");
        var _html = "";
        for (var i = 0; i < each_tr.length; i++) {
        	var lock_status = (each_tr.eq(i).find(".fa-unlock").length>0)?true:false;
            _html += '<li lock-status='+lock_status+' data-uri ='+ each_tr.eq(i).find(".cate_uri").val()+'><a class="first-list-images1 cate_img" style="background:url(' + each_tr.eq(i).find(".cate_img").attr("src") +
                ')"></a><span>' + each_tr.eq(i).find(".cate_name").val() + '</span></li>';
        }
        popover.hide();
        el.find("ul").html(_html);
        assignment.bg_css(el.find(".first-list-images1"), null, "");
    },

    //头条保存
    header_ad_save: function(url_type, el, popover) {
        el.find(".from_second").remove();
        var header_ad = el.find(".Staging-headlines");
        var clone_dom = el.find("p").eq(0).clone();
        el.find("p").remove();
        el.append(clone_dom);
        var first_p = el.find("p").eq(0);
        var tr_list = popover.find(".ui-sortable").find("tr");
        el.find(".from_second").remove();
        for (var i = 0; i < tr_list.length; i++) {
            var title = tr_list.eq(i).find(".cate_name").val();
            var desp = tr_list.eq(i).find(".cate_desp").val();
            var uri = tr_list.eq(i).find(".cate_uri").val();
            if (i == 0) {
                first_p.find(".header_ad_content").html(desp);
                first_p.find(".share_nopay").html(title);
                first_p.attr("data-uri", uri);
            } else {
                var obj = first_p.clone();
                //first_p.next("p").remove();
                obj.find(".header_ad_content").html(desp);
                obj.find(".share_nopay").html(title);
                obj.attr("data-uri", uri);
                el.append(obj.addClass("from_second").hide());
            }
        }
    },

    //取消编辑
    template_cancel: function() {
        var popover = assignment.dom().popover;
        var edit_quit = popover.find(".edit_confirm").next();
        edit_quit.click(function() {
            popover.remove();
        });
        require("./main.js").init();
    },
    //常用背景样式
    bg_css: function(el, url, size) {
        if (url != null) {
            el.css("background", "url(" + url + ")");
        }
        el.css({
            "background-size": size,
            "background-repeat": "no-repeat",
            "background-position": "center center"
        })
    },
    //相同属性赋值
    same_set: function(arr, el) {
        if (arr instanceof(Array)) {
            var length = arr.length;
            var popover = assignment.dom().popover;
            for (var i = 0; i < length; i++) {
                el.find("." + arr[i]).html((popover.find("." + arr[i]).val()).trim());
            }
        }
    }

}
module.exports = assignment;
