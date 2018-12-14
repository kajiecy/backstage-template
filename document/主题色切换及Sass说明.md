# 主题色切换及Sass说明

本项目主题色由 一个取色器组件控制(@/views/components/ThemePicker)

##实现思路简述：
本项目存放默认值在`$store.state.app.themeColor`中默认值为`#4251f6`，
在`@/assets/css/_variable.scss`中变量`$color-theme`也存了一份默认值用于初始化
