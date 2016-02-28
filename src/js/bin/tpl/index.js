var public_url = window.static_ui;
seajs.config({
    // 路径
    base: window.static_url,
    alias: {
        'index': '/static/src/js/bin/tpl/index.js',
        'main': '/static/src/js/bin/tpl/main.js'
    },
    paths: {
        'public': public_url
    },
    charset: 'utf-8',
    timeout: 20000
});
seajs.use('index');

define(function(require) {
    var m = require("main");
    m();
});
