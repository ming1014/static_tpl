var page_save = {
    param: {
        save_index: $("#save_index"),
        content: [],
        tabContent_each: {
            mainTitle: '',
            sideTitle: '',
            payMonth: '',
            price: '',
            picUrl: '',
            uri: '',
            sku: '',
            label: '',
            type: 'goods',
            code: ''
        },
        content_list: {
            mainTitle: '',
            sideTitle: '',
            payMonth: '',
            price: '',
            picUrl: '',
            uri: '',
            sku: '',
            label: '',
            code: '',
            isShowPayMonth: '',
            isShowPrice: '',
            payMonthType: "12*12",
            priceStyle: "售价",
            isLocked: false,
            tabContent: []
        },
        each_tpl: {
            code: '',
            index: '',
            title: '',
            more: '',
            hideTitle: false,
            isLocked: false,
            content: []
        },
        tpl: []


    },
    dom: function() {
        var Dom = require("./app_index_dom.js")
        return new Dom();
    },
    init: function() {
        var param = page_save.param;
        var content_list = param.content_list;
        var tabContent_each = param.tabContent_each;
        var content = param.content;
        var instrument = require("./instrument.js");
        param.save_index.unbind("click").click(function() {
            var name_modal = $("#confirm_delete_modal");
            name_modal.find("#myModalLabel").html("首页名称");
            var appId = page_save.dom().dropzone.find(".template").eq(0).attr("appid") || "";
            var _html = '<input type = "text" placeholder = "请输入首页名字" class = "index_name" ><div class = "save_tips" style="height:40px;width: 100%;margin-left:10%;line-height: 40px;color: red;display: none;">名字不能为空</div>';
            name_modal.find(".modal-body").html(_html);
            name_modal.modal();
            name_modal.find("#index_delete_confirm").unbind("click").click(function(){
            	var index_name = name_modal.find(".index_name").val()||"";
                if(index_name.trim()==""){
                    name_modal.find(".save_tips").show();
                    return false;
                };
                name_modal.find(".index_name").click(function(){
                    $(this).find(".save_tips").hide();
                });
                page_save.save_edit(param,content_list,tabContent_each,content,instrument,index_name);
                name_modal.modal("hide");
            });
        });



    },
    save_edit: function(param,content_list,tabContent_each,content,instrument,index_name) {
    	    var dom = page_save.dom();
            var template = dom.dropzone.find(".drop_item");
            var length = template.length;
            var pattern = /.*\((.*)\)/;
            for (var i = 1; i < length; i++) {
                param.each_tpl.content = [];
                content = [];
                content_list = instrument.clone(instrument.data.content_list);
                var temp = template.eq(i);
                if (temp.attr("data-tpl") == "t1") {
                    //类目
                    content_list = instrument.clone(instrument.data.content_list);
                    var li_list = temp.find("li");
                    for (var j = 0; j < li_list.length; j++) {
                        content_list.mainTitle = li_list.eq(j).find("span").html();
                        content_list.picUrl = li_list.eq(j).find(".cate_img").css("background").match(pattern)[1];
                        content_list.uri = li_list.eq(j).attr("data-uri");
                        // content_list.isLocked = li_list.eq(j).attr("lock-status");
                        content.push(JSON.stringify(content_list));
                    }

                } else if (temp.attr("data-tpl") == "t2") {
                    //头条
                    content_list = instrument.clone(instrument.data.content_list);
                    var edit_each_click = temp.find("p");
                    for (var j = 0; j < edit_each_click.length; j++) {
                        content_list.mainTitle = edit_each_click.eq(j).find(".share_nopay").html();
                        content_list.sideTitle = edit_each_click.eq(j).find(".header_ad_content").html();
                        content_list.uri = edit_each_click.eq(j).attr("data-uri");

                        content.push(JSON.stringify(content_list));

                    }
                } else if (temp.attr("data-tpl") == "t3") {
                    //轮播广告
                    content_list = instrument.clone(instrument.data.content_list);
                    var dom = temp.find("img");
                    for (var j = 0; j < dom.length; j++) {
                        content_list.picUrl = dom.eq(j).attr("src");
                        content_list.uri = dom.eq(j).attr("data-uri");
                        // content_list.isLocked = dom.eq(j).attr("lock-status");
                        content.push(JSON.stringify(content_list));

                    }

                } else if (temp.attr("data-tpl") == "t13") {
                    //轮播商品
                    content_list = instrument.clone(instrument.data.content_list);
                    var dom = temp.find("img");
                    param.each_tpl.title = temp.find(".Carousel_title").html();
                    for (var j = 0; j < dom.length; j++) {
                    	content_list.mainTitle = temp.find(".Carousel_title").html();
                        content_list.picUrl = dom.eq(j).attr("src");
                        content_list.uri = dom.eq(j).attr("data-uri");
                        // content_list.isLocked = dom.eq(j).attr("lock-status");
                        content.push(JSON.stringify(content_list));
                    }
                }else if (temp.attr("data-tpl") == "t4" || temp.attr("data-tpl") == "t5" || temp.attr("data-tpl") == "t12") {
                    //纯图广告（一张） todo
                    content_list = instrument.clone(instrument.data.content_list);
                    var dom = temp.find("img");
                    content_list.picUrl = dom.attr("src");
                    content_list.uri = dom.attr("data-uri");
                    content.push(JSON.stringify(content_list));

                } else if (temp.attr("data-tpl") == "t6") {
                    //纯图广告（两张） todo
                    content_list = instrument.clone(instrument.data.content_list);
                    var dom = temp.find("img");
                    for (var j = 0; j < dom.length; j++) {
                        content_list.picUrl = dom.eq(j).attr("src");
                        content_list.uri = dom.eq(j).attr("data-uri");
                        content.push(JSON.stringify(content_list));

                    }
                } else if (temp.attr("data-tpl") == "t8" || temp.attr("data-tpl") == "t7") {
                    //1+2图文
                    content_list = instrument.clone(instrument.data.content_list);
                    var edit_each_click = temp.find(".edit_each_click");
                    for (var j = 0; j < edit_each_click.length; j++) {
                        content_list.mainTitle = edit_each_click.eq(j).find(".main_title").html();
                        content_list.sideTitle = edit_each_click.eq(j).find(".side_title").html();
                        content_list.payMonth = edit_each_click.eq(j).find(".pay_month").attr("src") || edit_each_click.eq(j).attr("data-com-price")||edit_each_click.eq(j).find(".pay_month").html();
                       // content_list.payMonth = edit_each_click.eq(j).find(".pay_month").attr("src") || edit_each_click.eq(j).find(".pay_month").html();
                        content_list.picUrl = edit_each_click.eq(j).find(".img_url").attr("src") || edit_each_click.eq(j).find(".img_url").css("background").match(pattern)[1];
                        content_list.uri = edit_each_click.eq(j).attr("data-uri");
                        content.push(JSON.stringify(content_list));
                    }
                } else if (temp.attr("data-tpl") == "t9" || temp.attr("data-tpl") == "t10") {
                    //横排3个或4个
                    content_list = instrument.clone(instrument.data.content_list);
                    var edit_each_click = temp.find(".edit_each_click");
                    for (var j = 0; j < edit_each_click.length; j++) {
                        content_list.mainTitle = edit_each_click.eq(j).find(".main_title").html();
                        content_list.sideTitle = edit_each_click.eq(j).find(".side_title").html();
                        content_list.picUrl = edit_each_click.eq(j).find(".img_url").css("background").match(pattern)[1];
                        content_list.uri = edit_each_click.eq(j).attr("data-uri");
                        content.push(JSON.stringify(content_list));
                    }
                } else if (temp.attr("data-tpl") == "t11") {
                    //竖向楼层导航,已经合并到竖向楼层
                } else if (temp.attr("data-tpl") == "t14") {
                    //横向商品楼层
                    content_list = instrument.clone(instrument.data.content_list);
                    tabContent_each = instrument.clone(instrument.data.tabContent_each);
                    var each_slide = temp.find(".swiper-slide");
                    param.each_tpl.title = temp.find(".landscape_header_title").html();
                    param.each_tpl.more = temp.find("p").eq(0).attr("data-more");
                    param.each_tpl.aduri = temp.find(".landscape_header_img").attr("data-uri");
                    content_list.picUrl = temp.find(".landscape_header_img").css("background").match(pattern)[1];
                    content_list.uri = temp.find(".landscape_header_img").attr("data-uri");
                    if( content_list.picUrl.indexOf("banner")>-1){
                        content_list.picUrl = "";
                    }
                    content_list.isShowPrice = temp.find(".landscape_header_img").attr("isShowPrice");
                    content_list.isshowPaymonth = temp.find(".landscape_header_img").attr("isshowPaymonth");
                    content_list.priceStyle = temp.find(".landscape_header_img").attr("pricestyle");
                    for (var j = 0; j < each_slide.length; j++) {
                        var dom = each_slide.eq(j);
                        tabContent_each.mainTitle = dom.find(".main_title").html();
                        tabContent_each.sideTitle = dom.find(".side_title").html();
                        tabContent_each.picUrl = dom.find(".img_url").css("background").match(pattern)[1] || "";
                        if(tabContent_each.picUrl.indexOf("http://cdn.ufenqi.com/cms/img/banner.png")!= -1){
                        	tabContent_each.picUrl = "";
                        }
                        tabContent_each.payMonth = dom.find(".pay_month").html();
                        tabContent_each.price = dom.find(".price").html();
                        tabContent_each.uri = dom.attr("data-uri");
                        tabContent_each.sku = dom.attr("sku");
                        tabContent_each.label = dom.attr("label");
                        content_list.tabContent.push(JSON.stringify(tabContent_each));
                    }
                    content.push(JSON.stringify(content_list));
                } else if (temp.attr("data-tpl") == "t15") {
                    //竖向楼层
                    content_list = instrument.clone(instrument.data.content_list);
                    tabContent_each = instrument.clone(instrument.data.tabContent_each);
                    var dropzone = dom.dropzone;
                    var title_list = temp.find(".swiper-container-horizontal li");
                    var orientation_content = temp.find(".orientation_content_list");
                    var length = title_list.length;
                    if(length < 3){
                        alert("要保存的竖向楼层tab不能少于3个。");
                        return false;
                    }
                    for (var m = 0; m < length; m++) {
                        content_list.mainTitle = title_list.eq(m).html();
                        for (var j = 0; j < orientation_content.eq(m).find(".edit_each_click").length; j++) {
                            var navigate_module = orientation_content.eq(m).find(".edit_each_click").eq(j);
                            if (navigate_module.find(".navigate_module").length > 0) {
                                //竖向导航,传六条
                                for (var k = 1; k < 7; k++) {
                                    tabContent_each = instrument.clone(instrument.data.tabContent_each);
                                    var each_module = navigate_module.find(".nav" + k);
                                    tabContent_each.mainTitle = navigate_module.find(".main_title").html();
                                    tabContent_each.sideTitle = navigate_module.find(".side_title").html();
                                    tabContent_each.picUrl = each_module.html();
                                    tabContent_each.uri = each_module.attr("data-uri");
                                    tabContent_each.type = "t11";
                                    content_list.tabContent.push(JSON.stringify(tabContent_each));
                                }
                            } else if (navigate_module.find(".img_module").length > 0) {
                                //纯图广告
                                tabContent_each = instrument.clone(instrument.data.tabContent_each);
                                tabContent_each.picUrl = navigate_module.find(".img_url").attr("src");
                                tabContent_each.uri = navigate_module.find(".img_url").attr("data-uri");
                                tabContent_each.type = "t12";
                                content_list.tabContent.push(JSON.stringify(tabContent_each));
                            } else if (navigate_module.find(".goods_module").length > 0) {
                                //商品
                                tabContent_each = instrument.clone(instrument.data.tabContent_each);
                                tabContent_each.type = "goods";
                                tabContent_each.sku = navigate_module.find(".goods_module").attr("sku");
                                tabContent_each.mainTitle = navigate_module.find(".main_title").html();
                                tabContent_each.sideTitle = navigate_module.find(".side_title").html();
                                tabContent_each.payMonth = navigate_module.find(".pay_month").html();
                                tabContent_each.price = navigate_module.find(".price").html();
                                tabContent_each.label = navigate_module.attr("label");
                                tabContent_each.picUrl = navigate_module.find(".img_url").css("background").match(pattern)[1];
                                tabContent_each.uri = navigate_module.attr("data-uri");
                                content_list.tabContent.push(JSON.stringify(tabContent_each));
                            }

                            //each_vertical_tab.push(content_list.tabContent);

                        }

                        content.push(JSON.stringify(content_list));
                        content_list = instrument.clone(instrument.data.content_list);
                    }

                }

                param.each_tpl.content = content;
                param.each_tpl.code = temp.attr("data-tpl") || "",
                    param.each_tpl.index = i;
                param.tpl.push(JSON.stringify(param.each_tpl));
                content = [];
                param.each_tpl = instrument.clone(instrument.data.each_tpl); //深拷贝对象
                 param.each_tpl.title = "";
            }
            console.log(JSON.stringify(page_save.param.tpl));
            console.log(page_save.param.tpl);
            var appId = page_save.dom().dropzone.find(".template").eq(0).attr("appid") || "";
            $.ajax({
                type: "post",
                url: "./saveAppHomeData",
                dataType: "json",
                data: {
                    param: JSON.stringify(page_save.param.tpl),
                    appId: appId,
                    indexName: index_name
                        //param:1
                },
                beforeSend: function() {
                    // var content = __inline("../../../handlebars/common/loading.handlebars");
                    // $("body").append(content({}));
                },
                success: function(data) {
                    page_save.param.tpl = [];
                    console.log(data);
                    alert(data.data);
                    window.localStorage.setItem("cube_item", "");
                },
                complete: function() {
                    // $(".loading_img").remove();
                },
                error: function() {
                    page_save.param.tpl = [];
                    alert("保存失败");
                }
            })
       
    }
}
module.exports = page_save;
