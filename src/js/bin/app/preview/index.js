var tpl_url = window.static_url;
seajs.config({
    // 路径
    base: window.static_url,
    alias: {
        'index': window.static_url + '/src/js/bin/app/preview/index.js',
        "preview": window.static_url + '/src/js/bin/app/preview/preview.js'
    },
    // paths: {
    //      '/static': tpl_url
    // },
    charset: 'utf-8',
    timeout: 20000
});
seajs.use('index');
define(function(require) {
    require("preview").init();
});
