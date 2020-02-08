### react-casual-cli, 不依赖create-react-app的脚手架, 配置精简 ###

### 使用步骤 ### 

1.新建文件夹 npm init -y

2.npm install react-casual-cli / yarn add react-casual-cli

3.在node_modules中找到react-casual-cli, 拖到主目录

4.cd react-casual-cli 

5.npm install yarn 

6.yarn

7.yarn start

### GitHub https://github.com/zhanglijie5997/react-casual-cli ###

### 插件集成 ###

1. 集成babel

2. 集成图片压缩工具

3. 集成sass

4. 集成eslint

5. 集成css js 代码分割

6. 集成TreeShake

7. 集成gzip压缩

8. 使用providePlugin,  自动加载模块，不必在每个文件中导入React ### 

🔥 打包优化等方面构建提升 🔥

### 可能会遇到的问题 ###

1. 如果只更改了webpack的配置, 由于 HardSourceWebpackPlugin 插件的原因, 
   
   需要手动更改一下项目的任意内容, 这也是这个插件的弊端😅

### version ###

# v1.0.x 
   v1.0.0 第一次发布版本  
  
   v1.0.1 一些构建性能的产检配置  
  
   v1.0.2 一些信息的更改  
  
   v1.0.3 README.md 更改  
     
   v1.0.4 测试图片优化  

   v1.0.5 alias别名配置

   v1.0.6 webpack一些配置改为可配置化

   v1.0.7 webpack环境变量一些配置变得可配置化

   v1.0.8 webpack一些配置的更改, 构建插件的增加

   v1.0.9 webpack proxy && css行内注释报错问题