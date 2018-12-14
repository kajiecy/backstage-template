# 项目结构及相关js说明.md

## 主题结构

```
vue-zhongda-base
├──document            //相关文档所在目录
├──node_modules         //js库
├──public               //入口文件
├──src                  //源码所在位置
|   ├──assets           //静态资源目录
|   ├──directives       //自定义指令
|   ├──filters          //vue过滤器
|   ├──router           //路由配置文件
|   ├──store            //vuex配置文件
|   ├──utils            //工具包js
|   ├──views            //页面文件
|   |    ├common         //常规页面
|   |    ├components     //组件库
|   |    ├layout         //框架组件
|   |    ├...            //业务文件省略
|   ├──App.vue          //vue入口文件
|   ├──main.js          //入口js
|  ...
```
## runTimeScript.js
所在位置 src/utils/runTimeScript.js

此文件的init()会在Vue实例声明是调用一次，需要运行时调用的脚本请下载此脚本下。

