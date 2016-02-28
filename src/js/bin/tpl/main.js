var main = {
    param: {
        cnv_tpl: document.getElementById("cnv_tpl"),
        dashboard: document.getElementById("dashboard"),
        tpl_index: document.getElementById("tpl_index"),
        back_db: document.getElementById("back_db"),
        content_div: document.getElementById("content_div"),
        tpl_menu_left: document.getElementById("tpl_menu_left"),
        small_box: $(".brick.small"),
        modal_conent: $(".modal-content")

    },
    init: function() {
        window.onload = function() {
            var w = $(window).width();
            var h = $(window).height();
            $(tpl_menu_left).css("height", $(content_div).height() + "px");
            $(dashboard).show();
        }
        this.param.cnv_tpl.onclick = function() {
            dashboard.style.display = "none";
            tpl_index.style.display = "block";
        }
        this.param.back_db.onclick = function() {
            tpl_index.style.display = "none";
            dashboard.style.display = "block";
        }
        var small_box = this.param.small_box;
        /**
         ** 选择模板类型点击
         */
        $("#js_header_switch").find("a").click(function() {
            var index = $(this).index();
            switch (index) {
                case 0:
                    small_box.css({
                        "height": "180px",
                        "width": "120px"
                    });
                    break;
                case 1:
                    small_box.css({
                        "width": "288px",
                        "height": "180px"
                    });
                    break;
                case 2:
                    small_box.css({
                        "height": "180px",
                        "width": "120px"
                    });
                    break;
                case 3:
                    small_box.css({
                        "width": "288px",
                        "height": "180px"
                    });
                    break;
                default:
                    break;
            }
        });

        this.modal_top(this.param.modal_conent);
    },
    modal_top: function(el) {
        var win_h = $(window).height();
        var modal_h = el.height();
        if (modal_h < win_h - 20) {
            el.css("margin-top", (win_h - modal_h) / 2 + "px");
        } else {
            el.css({
                "max-height": win_h - 20 + "px",
                "margin-top": "10px"
            })
        }
    }
}

module.exports = main.init;
// main.init();
