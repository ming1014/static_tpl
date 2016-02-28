var tpl_url = window.static_url;
seajs.config({
    // 路径
    base: window.static_url,
    alias: {
        'handlebars': window.static_url + '/src/js/common/handlebars-v3.js',
        'main': window.static_url + '/src/js/bin/app/main.js',
        'index': window.static_url + '/src/js/bin/app/index.js',
        "edit": window.static_url + '/src/js/bin/app/edit.js',
        "history": window.static_url + '/src/js/bin/app/history_index.js',
        "assignment": window.static_url + '/src/js/bin/app/assignment.js',
        "swiper": window.static_url + '/src/js/common/swiper.jquery.js',
        "ajaxfileupload": window.static_url + '/src/js/common/ajaxfileupload.js',
        "slide": window.static_url + '/src/js/bin/app/slide.js',
        "app_index_dom": window.static_url + '/src/js/bin/app/app_index_dom.js',
        "data_picker": window.static_url + '/src/js/bootstrap/bootstrap-datetimepicker.js'
    },
    charset: 'utf-8',
    timeout: 20000
});
seajs.use('index');
define(function(require) {
    window.Handlebars = require("handlebars");
    var m = require('main');
    m.init();
    $(".sidebar").find("[data-tpl=t3]").trigger("click");
    require("./page_save.js").init();
    require("./slide.js").init();
    var Dom = require("app_index_dom");
    var dom = new Dom();
    var datetimepicker = require("data_picker");

    date=new Date();
    var startDate1 = date.toLocaleDateString();
    if(date.getHours()==23){
        startDate1=(new Date(date.valueOf()+1*24*60*60*1000)).toLocaleDateString();
    }else{
        startDate1=date.toLocaleDateString();
    };
    
    $('.form_date').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        startDate:startDate1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        startDate:"10:00",
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

     var add_select=$("<select></select>")
     add_select.attr("id","selectId")
     $('.form_time').replaceWith(add_select);
    
     var timeList=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
    
     $("#selectId").change(function(){
        $("#dtp_input3").attr("value",$("option:selected").text())
     })
     $('.form_date').datetimepicker().on('changeDate', function(){
      $("#selectId").empty();  
      select_day = $("#dtp_input2").val().split("-")[2];
      for(var i=0;i<24;i++){
            var e=$("<option value=''></option>");
            if(select_day==date.getDate()){
                if(i>date.getHours()&&date.getMinutes()==0){
                    e.attr("value",timeList[i]);
                    e.text(timeList[i]);
                    $("#selectId").append(e);
                }else if(i>date.getHours()&&i<23&&date.getMinutes()>0){
                    e.attr("value",timeList[i+1]);
                    e.text(timeList[i+1]);
                    $("#selectId").append(e);
                }
            }else{
                    e.attr("value",timeList[i]);
                    e.text(timeList[i]);
                    $("#selectId").append(e);   
            }
        }
        $("#dtp_input3").val($("#selectId").find("option").eq(0).text());
    });
    
});
              