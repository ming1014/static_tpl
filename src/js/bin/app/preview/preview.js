var preview = {
    init: function() {
        var str = window.localStorage.getItem("preview_content");
        var container = $("#preview_container");
        container.html(str);
        container.find('.carousel').carousel({
            interval: 1000
        });
        var orientation_content_list = container.find(".orientation_content_list");
        container.find(".orientation_header_li").unbind("click").click(function(){
        	container.find(".orientation_header_li").css("border-bottom","0px");
        	var _this = $(this);
        	_this.css("border-bottom","2px solid red");
        	var index = _this.index();
        	orientation_content_list.hide();
        	orientation_content_list.eq(index).show();


        });
    }
}
module.exports = preview;
