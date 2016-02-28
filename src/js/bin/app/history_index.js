"use strict";
var history_index = {
    init: function() {
        history_index.render();
    },
    current_history_index: 0,
    dom: function() {
        var Dom = require("./app_index_dom.js")
        return new Dom();
    },
    render: function() {
        var tpl = __inline("../../../handlebars/app_index/history_index.handlebars");
        var sidebar = history_index.dom().sidebar;
        var history_btn = sidebar.find("#history_li_btn");
        history_btn.unbind("click").click(function() {
            $.ajax({
                type: "get",
                url: "./getHistoryAppHomes",
                dataType: "json",
                success: function(data) {
                    var content = tpl({
                        data: data.data
                    });
                    history_index.dom().popover.remove();
                    history_index.load_handlebars(history_btn, content);
                }
            });
        });
    },
    load_handlebars: function(history_btn, content) {
        var sidebar = history_index.dom().sidebar;
        sidebar.find(".sidebar-wrapper li").removeClass("active");
        history_btn.addClass("active");
        var history_content = sidebar.find(".history-content");
        var switch_content = sidebar.find("#left_switch_content");
        if (history_content.length < 1) {
            switch_content.append(content).children().hide();
        } else {
            history_content.remove();
            switch_content.append(content).children().hide();
        }
        switch_content.find(".history-content").slideDown(function() {
            if (sidebar.find(".edit_sort_zone").height() > 450) {
                sidebar.find(".edit_sort_zone").css({
                    "max-height": "450px",
                    "overflow-y": "scroll"
                });
            }


            var each_row = sidebar.find(".edit_sort_zone tr");
            var length = each_row.length;
            for (var i = 0; i < length; i++) {
                var button_status = each_row.attr("button-name");
                var status = button_status.split(",");
                var temp = each_row.eq(i);
                if (temp.find("td").eq(2).html().trim() == "待发布") {
                    temp.find(".history_publish").hide();
                    temp.find(".history_offline").show();
                }else if (temp.find("td").eq(2).html().trim() == "发布") {
                    temp.find(".history_publish").hide();
                    temp.find(".history_offline").hide();
                }
                var pub_status = false;
                var unpub_status = false;
                for (var j = 0; j < status.length; j++) {
                    if (status[j] == "publish") {
                        pub_status = true;
                    }
                    if (status[j] == "unpublish") {
                        unpub_status = true;
                    }
                }
                if (pub_status == false) {
                    temp.find(".history_publish").remove();
                } else if (unpub_status == false) {
                    temp.find(".history_offline").remove();
                }

            }

            sidebar.find('.fa').tooltip();
            // history_index.dom().dropzone.find("[data-tpl=t3]").find(".remove").remove();

        });
        if (history_content.height() >= 500) {
            history_content.css("overflow-y", "scroll");
        }

        history_content.find("[data-id="+history_index.current_history_index+"]").parents("tr").css("opacity",0.6);



        // var remove_btn = sidebar.find(".history_remove");
        // remove_btn.click(function(){
        // 	var remove_dom = $(this).parents("tr");
        // 	remove_dom.find("td").animate({height:"0px",width:"0px",padding:"0px"},"fast","swing",function(){
        // 		remove_dom.remove();
        // 	})
        // });

        //历史模板发布
        sidebar.find(".history_publish").click(function() {
            $("#dtp_input2").val(new Date(date.valueOf()).toLocaleDateString().replace(/\//g,"-"));
            $("#dtp_input3").val("");
            var _this = $(this);
            var appId = _this.attr("data-id");
            var appVersion = _this.attr("data-version");
         
            $("#myModal").modal();
            $(".publish_confirm").unbind("click").click(function() {
                var dtp_input2 = $("#dtp_input2").val();
                var dtp_input3 = $("#dtp_input3").val();
                if(dtp_input2=="" || dtp_input3 == ""){
                    alert("请选择正确的发布时间");
                    return false;
                }
                var time = dtp_input2 + " " + dtp_input3 + ":00";
                $.ajax({
                    type: "get",
                    dataType: "json",
                    url: "./publishAppHome",
                    data: {
                        appID: appId,
                        appVersion: appVersion,
                        effectTime: time
                    },
                    success: function(data) {
                        $('#myModal').modal('hide');
                        if(data.success == true){
                            history_index.dom().sidebar.find("#history_li_btn").trigger("click");
                        	// _this.parents("td").prev().html("待发布");
                         //    _this.hide();
                         //    _this.next().show();
                        }
                        alert(data.data);
                    }
                });
            });
        });

        //已发布模板下架
        sidebar.find(".history_offline").click(function() {
            var _this = $(this);
            var offline_modal = $("#confirm_delete_modal");
            offline_modal.find(".myModalLabel").html("下架当前所选首页");
            offline_modal.find(".modal-body").html("确认下架，下架之后将不会再自动发布。");
            offline_modal.modal();
            offline_modal.find("#index_delete_confirm").unbind("click").click(function() {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    url: "./unPublish",
                    data: {
                        appID: _this.attr("data-id"),
                        appStatus: _this.attr("data-version")

                    },
                    success: function(data) {
                        offline_modal.modal("hide");
                        _this.hide();
                        _this.prev().show();
                        if(data.success == true){
                            history_index.dom().sidebar.find("#history_li_btn").trigger("click");
                            //_this.parents("td").prev().html("未发布");
                        }
                        //alert(data.data);

                    }
                });
            });

        });
       

        //历史模板删除
        sidebar.find(".history_remove").click(function() {
            // var appId = _this.attr("data-id");
            // var appVersion = _this.attr("data-version");
             var _this = $(this);
            var delete_modal = $("#confirm_delete_modal");
            if(_this.parents("td").prev().html().trim()=="发布"){
            	delete_modal.find(".myModalLabel").html('<i class="fa fa-exclamation-triangle"></i>温馨提示');
                delete_modal.find(".modal-body").html("发布的内容必须下架之后才能删除。");
                delete_modal.modal();
                delete_modal.find("#index_delete_confirm").click(function(){
                    delete_modal.modal("hide");
                });
                return false;
            }else{
            	delete_modal.find(".myModalLabel").html("删除所选首页");
                delete_modal.find(".modal-body").html("确认删除吗？删除的内容将不可恢复。");
            }

            delete_modal.modal();
            var appId = _this.attr("data-id");
            var appStatus = _this.parents("tr").find("td").eq(2).html();
            delete_modal.find("#index_delete_confirm").unbind("click").click(function() {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    url: "./deleteAppHome",
                    data: {
                        appID: appId,
                        appStatus: appStatus

                    },
                    success: function(data) {
                        delete_modal.modal("hide");
                        var remove_dom = _this.parents("tr");
                        remove_dom.find("td").animate({
                            height: "0px",
                            width: "0px",
                            padding: "0px"
                        }, "fast", "swing", function() {
                            remove_dom.remove();
                        });
                    }
                });
            });

        });

    //  详情
        sidebar.find(".history_more").click(function() {
                    
                    var delete_modal = $("#confirm_delete_modal");
                    delete_modal.modal();
                    var content=__inline("../../../handlebars/app_index/index_detail.handlebars")
                    delete_modal.find(".modal-body").html(content({}));  
                    delete_modal.find("#myModalLabel").html("详细信息");
                    var _this = $(this);
		            var data = [];
		            var each_data = {
		              appStatus: _this.attr("appStatus"),
		              appVersion:_this.attr("appVersion"),
		              createDate:_this.attr("createDate"),
		              createUser:_this.attr("createUser"),
		              effectTime:_this.attr("effectTime"),
		              id:_this.attr("appId"),
		              indexName:_this.attr("indexName")
		            }
		            data.push(each_data);
                    var delete_modal = $("#confirm_delete_modal");
                    delete_modal.modal();
                    var content=__inline("../../../handlebars/app_index/index_detail.handlebars")
                    delete_modal.find(".modal-body").html(content({data:data}));
                    
                    delete_modal.find("#index_delete_confirm").click(function(){
                            delete_modal.modal('hide');
                        })
                    });
        //历史模板编辑
        sidebar.find(".history_edit").click(function() {
        	var _this = $(this);
            if(_this.parents("tr").find("td").eq(2).html().trim() == "待发布"){
                alert("待发布的首页不能修改，必须下架之后才能再次编辑");
                return;
            }
            var id = _this.attr("data-id");
            history_index.current_history_index = id;
            $.ajax({
                type: "get",
                dataType: "json",
                url: "./getAppDataByAppID",
                data: {
                    appID: id
                },
                success: function(data) {
                    var data = data.data;
                    var tpl, content_list = "";
                    var dropzone = history_index.dom().dropzone;
                    dropzone.find(".template").remove();
                    var sidebar = history_index.dom().sidebar;
                    sidebar.find(".history-content").hide();
                    sidebar.find("#cube_div").show();
                    for (var i = 0; i < data.length; i++) {
                        var temp = data[i];
                        if (temp.tplCode == "t1") {
                            tpl = __inline("../../../handlebars/cube/t1.handlebars");

                        } else if (temp.tplCode == "t2") {
                            tpl = __inline("../../../handlebars/cube/t2.handlebars");

                        } else if (temp.tplCode == "t3") {
                            tpl = __inline("../../../handlebars/cube/t3.handlebars");

                        } else if (temp.tplCode == "t4") {
                            tpl = __inline("../../../handlebars/cube/t4.handlebars");

                        } else if (temp.tplCode == "t5") {
                            tpl = __inline("../../../handlebars/cube/t5.handlebars");

                        } else if (temp.tplCode == "t6") {
                            tpl = __inline("../../../handlebars/cube/t6.handlebars");

                        } else if (temp.tplCode == "t7") {
                            tpl = __inline("../../../handlebars/cube/t7.handlebars");

                        } else if (temp.tplCode == "t8") {
                            tpl = __inline("../../../handlebars/cube/t8.handlebars");

                        } else if (temp.tplCode == "t9") {
                            tpl = __inline("../../../handlebars/cube/t9.handlebars");

                        } else if (temp.tplCode == "t10") {
                            tpl = __inline("../../../handlebars/cube/t10.handlebars");

                        } else if (temp.tplCode == "t11") {
                            tpl = __inline("../../../handlebars/cube/t11.handlebars");

                        } else if (temp.tplCode == "t12") {
                            tpl = __inline("../../../handlebars/cube/t12.handlebars");

                        } else if (temp.tplCode == "t13") {
                            tpl = __inline("../../../handlebars/cube/t13.handlebars");

                        } else if (temp.tplCode == "t14") {
                            tpl = __inline("../../../handlebars/cube/t14.handlebars");

                        } else if (temp.tplCode == "t15") {
                            tpl = __inline("../../../handlebars/cube/t15.handlebars");
                        }
                        var content = tpl({
                            data: data[i]
                        });
                        if (temp.tplCode == "t7") {
                            var content_dom = history_index.parseDom(content);
                            content_dom.attr("appId",data[i].appId);
                            var each_t7_content = data[i].content;
                            for (var m = 0; m < each_t7_content.length; m++) {
                                var temp = each_t7_content[m];
                                var com_pay_month = temp.payMonth.split(",");
                                var data_com_price = com_pay_month[0]+'<font size="30" color="#FF0033">'+com_pay_month[1]+'</font>'+com_pay_month[2];
                                content_dom.find(".edit_each_click").eq(m).attr("data-com-price",data_com_price);
                                content_dom.find("qi_last").html(com_pay_month[2]);
                            }
                             content = content_dom.prop("outerHTML");

                        }
                        if (temp.tplCode == "t8") {
                        	 //特殊情况 1+2图文
                        	var content_dom = history_index.parseDom(content);
                        	content_dom.attr("appId",data[i].appId);
                        	var each_t8_content = data[i].content;
	                        for (var m = 0; m < each_t8_content.length; m++) {
	                            var temp = each_t8_content[m];
	                            content_dom.find(".main_title").eq(m).html(temp.mainTitle);
	                            content_dom.find(".side_title").eq(m).html(temp.sideTitle);
	                            content_dom.find(".edit_each_click").eq(m).attr("data-uri", temp.uri);
	                            if (m == 0) {
	                                content_dom.find(".pay_month").eq(m).attr("src", temp.payMonth);
	                                content_dom.find(".img_url").eq(m).attr("src", temp.picUri);
	                            } else {
                                   //  var input_data=input_1+'<font size="30" color="#FF0033">'+input_red+'</font>'+input_3;
                                    var com_pay_month = temp.payMonth.split(",");
                                    var data_com_price = com_pay_month[0]+'<font size="30" color="#FF0033">'+com_pay_month[1]+'</font>'+com_pay_month[2];
                                    content_dom.find(".edit_each_click").eq(m).attr("data-com-price",data_com_price);
	                                content_dom.find(".pay_month").eq(m).html(temp.payMonth);
                                    content_dom.find("qi_last").html(com_pay_month[2]);
	                                content_dom.find(".img_url").eq(m).css({
	                                	"background":"url("+ temp.picUri +") no-repeat",
	                                	"background-size":"contain"
	                                })
	                            }
	                        }
	                        content = content_dom.prop("outerHTML");
                        }



                        if (temp.tplCode == "t15") {
	                        //特殊情况 竖向楼层
	                     	var content_dom = history_index.parseDom(content);
	                     	content_dom.attr("appId",data[i].appId);
                        	var each_t15_content = data[i].content;
	                        for(var m = 0; m < each_t15_content.length; m++){
	                        	var temp = each_t15_content[m];
	                        	var header_title = '<li class = "orientation_header_li" skus = '+ (temp.skus || "")+'>'+temp.mainTitle+'</li>';
    		                    var each_ul = '<ul class = "orientation_drag orientation_content_list" style = "display:none;">'+
				                '</ul>';
	                        	content_dom.find("[data-edit = vertical_floor_header]").append(header_title);
                                if(m > 0){
                                    content_dom.find(".t15_content_list").append(each_ul);
                                }
	                        	content_dom.find(".orientation_content_list").eq(0).show();
	                        	var ul_dom = content_dom.find(".orientation_content_list").eq(m);
	                        	for(var l = 0;l<temp.goodsContent.length;l++){
	                        		var each_temp = temp.goodsContent[l];
	                        		if(each_temp.type && each_temp.type == "t11"){
	                        			//导航栏
	                        			 var t15_tpl = __inline("../../../handlebars/cube/t15_6.handlebars");
	                        			 var three_dom = history_index.parseDom(t15_tpl({}));
	                        			 three_dom.find(".main_title").html(each_temp.mainTitle);
	                        			 three_dom.find(".side_title").html(each_temp.sideTitle);
	                        			var k = l+6,count = 1;
	                        			for(l;l<k;l++){
                                            var picUri = "";
                                            var data_uri = "";
                                            try{
                                                picUri = temp.goodsContent[l].picUri;
                                                data_uri = temp.goodsContent[l].uri;
                                            }catch(e){

                                            }
	                        				three_dom.find(".nav"+count).html(picUri);
	                        				three_dom.find(".nav"+count).attr("data-uri",data_uri);
                                            ++count;
	                        			}
                                        if(k==l){
                                            --l;
                                        }
	                        		}else if(each_temp.type && each_temp.type == "t12"){
	                        			//图片 todo
	                        			 var t15_tpl = __inline("../../../handlebars/cube/t15_8.handlebars");
	                        			 var three_dom = t15_tpl({data:each_temp});
	                        		}else{
	                        			//商品
	                        			 var t15_tpl = __inline("../../../handlebars/cube/t15_7.handlebars");
	                        			 var three_dom = history_index.parseDom(t15_tpl({}));
	                        			 three_dom.find(".main_title").html(each_temp.mainTitle);
	                        			 three_dom.find(".side_title").html(each_temp.sideTitle);
	                        			 three_dom.find(".pay_month").html(each_temp.payMonth);
                                         three_dom.find(".goods_module").attr("sku",each_temp.sku);
	                        			 three_dom.find(".price").html(each_temp.price);
	                        			 three_dom.attr("data-uri",each_temp.uri);
	                        			 three_dom.find(".img_url").css("background","url("+each_temp.picUri+") no-repeat")
	                        			                           .css("height","140px");
	                        		}
	                        		ul_dom.append(three_dom);
	                        		ul_dom.find(".shouji1").css("background-size","contain");
	                        	}
                                content_dom.find(".orientation_content_list").eq(m).append('<div class="orientation_content_add tc">'+
                                        '<i class="fa fa-plus-square"></i>'+
                                    '</div>');
	                        }
	                        content = content_dom.prop("outerHTML");

	                    }

                        content_list += content;
                    }
                    dropzone.append(content_list);
                    dropzone.find(".t15_img_url, .t8_right_img").css("background-size","contain");
                    dropzone.find("[data-tpl=t9]").find(".img_url").css("height","93px");
                    dropzone.find(".rose-left").eq(1).addClass("rose-right").removeClass("rese-left");
                    dropzone.find(".template").css("height", "auto");
                    dropzone.find(".carousel_container").css("height","auto !imporatnt");
                    dropzone.find("[data-tpl=t15]").css("height","auto");
                    var url_type = dropzone.find(".template").attr("data-tpl");
                    if (url_type == "t3" || url_type == "t13") {
                        var temp_list = dropzone.find(".template");
                        var temp = temp_list.eq(0);
                        temp.find(".slide_dot").eq(0).addClass("active");
                        temp.find(".slide_div").eq(0).addClass("active");
                    }

                    //月供统一处理
                    var pay_month_list = dropzone.find(".pay_month");
                    for(var h = 0;h<pay_month_list.length;h++){
                        var content = pay_month_list.eq(h).html();
                        if(content.indexOf(",")!=-1){
                            var content_1 = content.split(",")[1];
                            var content_0 = content.split(",")[0];
                            pay_month_list.eq(h).html(content_1);
                            pay_month_list.eq(h).prev(".pay_month_title").html(content_0);
                        }
                    }
                    //t15添加模块
                    dropzone.find("[data-tpl=t15]").find(".fa-plus-square").click(function() {
                        var clone_dom = $(this).parents(".orientation_content_add").prev().clone();
                        $(this).parents(".orientation_content_add").before(clone_dom);
                        require("./edit.js").render("vertical_floor", $(this).parents(".orientation_content_add").prev());
                    });
                    
                    //t14左右滑动
                    var slide = require("./slide.js");
                    dropzone.find("[data-tpl=t14]").hover(function() {
                        dropzone.find("[data-tpl=t14] .swipe_button-t14").show().animate({
                            opacity: 1
                        }, "normal", "swing",function(){
                            dropzone.find(".swiper-button-t14").unbind("click").click(function(){
                                alert("111");
                            });

                        });
                    }, function() {
                       // $("#dropzone .swipe_button").animate({opacity:0},"fast","swing");
                    });
                   
                    dropzone.find(".orientation_content_list li").css("border","0px");
                    dropzone.find("[data-tpl=t3]").find(".slide_div").eq(0).addClass("active");
                    dropzone.find("[data-tpl=t13]").find(".slide_div").eq(0).addClass("active");
                    var revision_dom = dropzone.find(".edit_each_click");
                    var edit = require("./edit.js");
                    for(var c = 0;c<revision_dom.length;c++){
                    	edit.render(revision_dom.eq(c).attr("data-edit"),revision_dom.eq(c));
                    }
                    edit.normal_bind($(".index_t15").find(".edit_each_click").eq(0));
                    require("./slide.js").init("#dropzone");
                    var main = require("./main.js");
                    main.init();
                    dropzone.find(".remove").click(function(e) {
			            e.stopPropagation();
			            history_index.dom().popover.remove();
			            $(this).parent(".drop_item").animate({
			                height: "0px",
			                width: "0px"
			            }, "fast", "swing", function() {
			                $(this).remove();
			            });
			       });

                  dropzone.find(".t15_img_url").css("background-size","contain");
                }
            })

        });
    },
    parseDom: function(arg) {
	　　 var objE = document.createElement("div");
	　　 objE.innerHTML = arg;
	　　 return $(objE).children();
	}

}

module.exports = history_index.init;
