var app_index_dom = function() {
    //app首页项目元素大块划分 四块----头部，左边部分（包括模板，切换菜单），右边预览部分，右边弹出编辑部分
    var popover = $(".popover");
    var dropzone = $("#dropzone");
    var header_conatainer = $("#header_conatainer");
    var sidebar = $(".sidebar");
    return {
        popover: popover,
        dropzone: dropzone,
        header: header_conatainer,
        sidebar: sidebar
    }
}
module.exports = app_index_dom;
