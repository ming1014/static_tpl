<!-- 
	PC端，模版和静态文件
 -->

 #static_h5
-----------
 ###page 页面模板
 ###test 数据
 	* page 模板数据
 	* ajax 异步数据
 ###src:静态资源，包括：css,js,tpl
 ###conf 配置文件
 	* 只允许修改deploy_test.json文件。将对应javaer的信息填写到test里。
 	* build.json为解析的文件。一般情况不需要做修改
 	* pkg.json打包路径文件。

 --------------
 
###安装jello
------------

* npm install  安装开发插件

* jello release 解析到本地的路径下

* jello server start 运行服务

* jello release -d test 解析发布到对应javaer的路径里
	- 需要在conf/deploy_test.json里配置test到指定位置

* jello release -mopd publish 解析发布到测试环境

* jello release -mopd gitTest 合并发布到测试分支到git目录，用于后端人员的获取

* jello release -Dmopd gitPublish 合并发布到线上分支。用于前端发布的分支 
	- 添加二级域名控制

