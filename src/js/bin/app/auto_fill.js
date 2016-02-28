var auto_fill = function(el, url_type) {
    var data = [];
    var pattern = /.*\((.*)\)/;
    if (url_type == "header_ad") {
        //头条
        var p = el.find("p");
        var length = p.length;
        for (var i = 0; i < length; i++) {
            var temp = p.eq(i);
            var each_data = {
                uri: temp.attr("data-uri"),
                title: temp.find(".share_nopay").html(),
                content: temp.find(".header_ad_content").html()
            }
            data.push(each_data);
        }
    } else if (url_type == "carousel") {
        //轮播图片
        var slide_div = el.find(".slide_div");
        var length = slide_div.length;
        for (var i = 0; i < length; i++) {
            var temp = slide_div.eq(i);
            var lock_status = (temp.find("img").attr("lock-status") == "true")?"fa-unlock":"fa-lock";
            var lock_title = (lock_status == "fa-lock")?"去锁定":"去解锁";

            var each_data = {
                pic_url: temp.find("img").attr("src"),
                uri: temp.find("img").attr("data-uri"),
                lock_status: lock_status,
                lock_title:lock_title
            }
            data.push(each_data);
        }
    }  else if (url_type == "carousel_goods") {
        //轮播商品
        var slide_div = el.find(".slide_div");
        var length = slide_div.length;
        for (var i = 0; i < length; i++) {
            var temp = slide_div.eq(i);
            var lock_status = (temp.find("img").attr("lock-status") == "true")?"fa-unlock":"fa-lock";
            var lock_title = (lock_status == "fa-lock")?"去锁定":"去解锁";
            var each_data = {
                pic_url: temp.find("img").attr("src"),
                uri: temp.find("img").attr("data-uri"),
                lock_status: lock_status,
                lock_title:lock_title
            }
            data.push(each_data);
        }
    }else if (url_type == "only_pic_big" || url_type == "only_pic_small" || url_type == "two_samll_pic") {
        var each_data = {
            pic_url: el.find("img").attr("src") || el.attr("src"),
            uri: el.find("img").attr("data-uri") || el.attr("data-uri")
        }
        data.push(each_data);
    } else if (url_type == "onetwo_text_pic2" || url_type == "onetwo_text_pic1" || url_type == "one_row_three_four") {
    	var pic_url,titile_tips;
    	try{
            pic_url = el.find(".img_url").css("background").match(pattern)[1];
    	}catch(e){
            pic_url = "";
    	}
        
        if(el.parents(".template").attr("data-tpl")=="t9"){
           titile_tips = "不能超过7个字";
        }else if(el.parents(".template").attr("data-tpl")=="t10"){
           titile_tips = "不能超过4个字";
        }
        var each_data = {
            main_title: el.find(".main_title").html(),
            side_title: el.find(".side_title").html() || "",
            pay_month_title: el.find(".pay_month_title").html() || "",
            pay_month: el.find(".pay_month").html() || "",
            uri: el.attr("data-uri") || "",
            pic_url: pic_url,
            pic_url1: el.find(".pay_month").attr("src"),
            pic_url2: el.find(".img_url").attr("src") || "",
            titile_tips:titile_tips
        }
        data.push(each_data);
    } else if (url_type == "landscape_header_title") {
        //横向楼层标题
        var each_data = {
            main_title: el.find(".landscape_header_title").html(),
            uri: el.attr("data-uri")
        }
        data.push(each_data);
    } else if (url_type == "landscape_header_img") {
        var each_data = {
            sku: el.attr("sku"),
            skus:el.attr("skus"),
            pic_url: el.css("background").match(pattern)[1] || "",
            uri: el.attr("data-uri"),
            price_title: el.attr("pricestyle")
        }
        data.push(each_data);
    } else if (url_type == "landscape_content" || url_type == "orientation_goods") {
        var each_data = {
            sku: el.attr("sku") || el.find(".goods_module").attr("sku"),
            main_title: el.find(".main_title").html(),
            side_title: el.find(".side_title").html() || "",
            pay_month_type: el.find(".pay_month_title").html(),
            pay_month: el.find(".pay_month").html(),
            price_style: el.find(".price").html() || el.find(".price_title").html(),
            price: el.find(".price").html() || el.find(".total_price").html(),
            uri: el.attr("data-uri") || "",
            pic_url: el.find(".img_url").css("background").match(pattern)[1] || "",
            is_show_paymonth: "true",
            is_show_price: "true"
        }
        data.push(each_data);
    }else if (url_type == "orientation_img" || url_type == "orientation_ad") {
        var each_data = {
            uri: el.attr("data-uri") || "",
            pic_url: el.find(".img_url").attr("src") || ""
        }
        data.push(each_data);

    }

    return data;
}

module.exports = auto_fill;
