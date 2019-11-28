## mpvue小程序工程mpvue-xcx
#### 一、pull代码之后使用方法
##### 1、安装vue-cli
  	npm install -g vue-cli

##### 2、加载依赖文件
  	npm install

##### 3、启动开发环境工程
    npm run dev
	  
##### 4、启动测试环境工程
    npm run uat

##### 5、打包开发环境代码
    npm run build:dev

##### 6、打包测试环境代码
    npm run build:uat

##### 7、打包正式环境代码
    npm run build:prod

##### 4、使用微信开发工具打开mpvue-xcx工程即可看到效果

#### 二、学习参考：从零开始初始化mpvue-xcx工程

##### 1、安装vue命令行
    npm install -g vue-cli

##### 2、创建一个基于 mpvue-quickstart 模板的新项目，同时支持[mpvue-entry](https://github.com/F-loat/mpvue-entry)（集中式页面配置，自动生成各页面的入口文件，优化目录结构，支持新增页面热更新）
    vue init F-loat/mpvue-quickstart mpvue-xcx

##### 3、安装依赖
    cd mpvue-xcx
    npm install

##### 4、使用微信开发工具打开mpvue-xcx工程即可看到效果

##### 5、安装vuex
    npm i vuex -S

##### 6、使vue支持scss

###### 6.1、安装相应的装载器
    npm i node-sass -D
    npm i sass-loader -D
    npm i style-loader -D
    npm i css-loader -D

###### 6.2、在webpack.base.conf.js中配置规则
	{
  		test: /\.scss$/,
  		include: '/src/',
  		use: ['style-loader', 'css-loader', 'sass-loader']
	}

###### 6.3、在vue文件下的style设置lang="scss"
    <style lang="scss" scoped></style>

##### 7、安装[flyio](https://github.com/wendux/fly) - 同时支持浏览器、小程序、Node、Weex的基于Promise的跨平台http请求库，可以让您在多个端上尽可能大限度的实现代码复用
    npm i flyio -S
