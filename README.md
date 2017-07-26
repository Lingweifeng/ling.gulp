gulp工作流
---------------------------------------------------------------------------
一.下载所有依赖包：
```
npm install
```
以下插件需要单独下载下：
```
npm install gulp-spritesmith
```
二.进入开发模式：
```
gulp dev
```
1.监测html/js/css文件，浏览器自动刷新：使用browserSync插件<br>
2.sass自动编译<br>
3.sprite雪碧图自动生成：请向images/sprite文件夹添加或删除一个icon，触发gulp sprite任务，自动更新sprite.png/sprite.scss<br>

三.进入打包模式，所有文件都将打包到dist目录：
```
gulp build
```
1.usemin自动生成并引用压缩文件(js/css生成带md5后缀的.min文件)<br>
2.images文件夹图片压缩<br>
3.小图片使用base64(详见首页示例)<br>
---------------------------------------------------------------------------
注意：如果需要单项目使用(即根目录下生成静态资源)projectName和publicPath需设置为空，即：
```
var projectName = '',
    publicPath = '';
```