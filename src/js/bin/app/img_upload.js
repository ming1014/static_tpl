var img_upload = {
    init: function(click_el, preview_el, callback) {
        click_el.unbind("change").on("change",function(evt) {
            // 如果浏览器不支持FileReader，则不处理
            var preview_dom = preview_el || $(this).prev();
            var callback = callback || function() {};
            if (!window.FileReader) return;
            var files = evt.target.files;
            for (var i = 0, f; f = files[i]; i++) {
                if (!f.type.match('image.*')) {
                    continue;
                }
                // //限制传一张
                // if (i > 0) {
                //     return;
                // }
                var reader = new FileReader();
                //解决jquery 文件change事件
                var _html = click_el.prop("outerHTML");
                click_el.before(_html);
                img_upload.init(click_el.prev(), preview_el, callback);
                click_el.remove();
                reader.onload = (function(theFile) {
                    var id = "#" + click_el.attr("id");
                    var ajaxfileupload = require("../../common/ajaxfileupload.js");
                    // return function(e) {
                        ajaxfileupload({
                            preview_el: preview_dom,
                            click_el: click_el,
                            url: './upload', //用于文件上传的服务器端请求地址  
                            secureuri: false, //一般设置为false  
                            fileElementId: click_el.attr("id"), //文件上传控件的id属性  
                            dataType: 'json'//返回值类型 一般设置为json  
                            // success: function(data, status) //服务器成功响应处理函数  
                            //     {
                            //         alert(data);
                            //         var data = JSON.parse(data.data);
                            //         if (data.imageUrl != "") {
                            //             $(preview_dom).attr("src", data.imageUrl).animate({
                            //                 opacity: 1
                            //             }, "fast", "swing");
                            //         }
                            //     }
                        });
                         //click_el = click_el.clone();
                         



                    // };
                })(f);
                reader.readAsDataURL(f);
            }
        });
    }

}
module.exports = img_upload;
