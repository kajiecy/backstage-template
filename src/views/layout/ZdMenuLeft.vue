<template>
    <aside class="aside-body" :class="$store.state.app.leftMenuOpenStatus">
        <header class="header-body">
                <i class="iconfont icon-gongyinglianjinrong"></i>
                <span class="company-text dis-select">
                    卡杰后台管理
                </span>
        </header>
        <div class="main-body">
            <div class="content">
                <div class="content_head dis-select">
                    <img src="http://qiniu.kajie88.com/28913648.jpg" width="100%" height="100%" alt="头像" >
                </div>
                <div class="content_name dis-select">张之南</div>
                <div class="content_role dis-select">经办人</div>
                <div class="content_company dis-select">江苏众达供应链科技有限公司</div>
            </div>
        </div>
        <div id="div-menu" class="div-menu">
            <template v-for="(item,index) of tableData">
                <div :class="item.isActive?'is_active':''" class="div-menu-item div-menu-item-body dis-select pointer" :key="index">
                    <div class="div-menu-item-body-inner" @click="pushViews(item.route)">
                        <!--<i :class="item.icon"></i>-->
                        <i :class="'iconfont icon-shujutongji'"></i><br>
                        <span class="menu-text text_clamp2">{{item.menuitem}}</span>
                    </div>
                </div>
            </template>


            <div class="div-menu-item dis-select pointer div-menu-fold" @click="changeMenuOpen()">
                <!--<i :class="item.icon"></i>-->
                <div class="div-menu-item-body-inner">
                    <i :class="'iconfont icon-shouqi'"></i><br>
                    <span class="menu-text text_clamp2">收起菜单</span>
                </div>
            </div>

        </div>
        <div class="foot dis-select">
            Copyright © 2012-2018 XXXXX <br>
            宁ICP备8888888号-1
        </div>
    </aside>
</template>

<script>
    // import PerfectScrollbar from 'perfect-scrollbar';
    export default {
        name: "ZdMenuLeft",
        data() {
            return {
                perfectScrollbar:{},
            }
        },
        created() {

        },
        mounted() {
            //刷新时根据路由名称 渲染 menu的active
            this.$store.commit('changeChildMenuActive',{routerName:this.$route.name});
        },
        watch: {
            '$route'(newVal){
                this.$store.commit('changeChildMenuActive',{routerName:newVal.name});
            }
        },
        methods: {
            changeMenuOpen(){
                this.$store.commit('changeLeftMenuOpenStatus');
            },
            pushViews(routerName){
                this.$router.push({name:routerName});
            }
        },
        computed: {
            //首页面的数据从vuex中取出
            tableData() {
                /**
                 * computed 此时仅监听 this.$store.state.menuObj.parentIndex 和 this.$store.state.menuObj.asideMenuInfo 更改flag是 两个变量的地址都不变
                 * 因此此时我选择添加一个count 每次执行操作是增加修改count 实现对象监听联动
                 */
                let data = this.$store.getters.getAsideMenuInfo;
                if (data != null && data.length > 0 && data[this.$store.getters.getParentIndex] != null) {
                    return data[this.$store.getters.getParentIndex].childMenus;
                } else {
                    return [];
                }
            },
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
    @import "../../../../../ZD/Vue-项目/vue-zhongda-base/src/assets/css/variable";
    .aside-body.left-menu-open{
        /*transition: all 0.5s;*/
        flex: 0 0 300px;
        .header-body{
            position: relative;
            height: 55px;
            margin:20px 0 0 30px;
            font-size: 24px;
            color: #fff;
            line-height: 55px;
        }
        span.company-text{
            margin-left: 10px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        .main-body{
            padding-top: 45px;
            height: 255px;
        }
        .content{
            color:#fff;
            width: 160px;
            margin:0 auto ;
            text-align: center;
        }
        .content_head{
            margin:0 auto ;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow:0 0 20px #888888;
            overflow: hidden;
        }
        .icon-gongyinglianjinrong{
            font-size: 55px;
        }
        .content_name{
            margin-top: 20px;
            font-size: 14px;
        }
        .content_role{
            margin-top: 12px;
            font-size: 12px;
        }
        .content_company{
            margin-top: 12px;
            font-size: 12px;
        }
        .div-menu{
            display: flex;
            text-align: center;
            flex-wrap:wrap;
            justify-content:flex-start;
            align-content:flex-start;
            padding: 15px 15px 10px 35px;
            overflow-y: auto;
            height: calc(100vh - 85px - 225px - 40px - 28px);
            position: relative;
            .div-menu-item{
                display: flex;
                flex-direction:column;
                justify-content: space-around;
                flex: 0 0 85px;
                height: 85px;
                margin: 15px 15px;
                padding-top: 5px;
                color: #445a77;
                .iconfont{
                    font-size: 22px;
                }
                span{
                    font-size: 12px;
                    display: inline-block;
                    padding: 5px 5px;
                }
                &:hover,&.is_active{
                    //background-color: $color -theme;
                    border-radius: 10px;
                    box-shadow:2px 2px 10px #888888;;
                    .iconfont,span{
                        color: white;
                    }
                }
            }
            .div-menu-fold{
                .iconfont,span{
                    //color: $color- theme;
                    opacity:0.8;
                    filter:Alpha(opacity=80); /* IE8 以及更早的浏览器 */
                }
            }
        }

        .foot{
            font-size: 12px;
            width: 300px;
            position: fixed;
            bottom: 0;
            text-align: center;
            color: #C9C8C8;
        }
    }
    .aside-body.left-menu-close{
        /*transition: all 0.5s;*/
        flex: 0 0 80px;
        /*flex-direction:column;*/
        /*align-items:stretch;*/
        margin-right: 0;
        /*background-color: $color- theme;*/
        .header-body{
            width: 80px;
            height: 80px;
            text-align: center;
            margin-top:18px;
            .icon-gongyinglianjinrong{
                font-size: 40px;
                line-height: 80px;
                color: white;
                display: inline-block;
            }
        }
        .div-menu{
            height: calc(100vh - 133px - 98px - 20px);
            display: flex;
            flex-direction: column;
            align-items:center;
            position: relative;
            .div-menu-item-body{
                flex: 0 0 45px;
                width: 45px;
                text-align: center;
                /*border: 1px solid #f0f0f0;*/
                margin: 5px 0;
                border-radius: 10px;
                .iconfont{
                    font-size: 22px;
                    display: inline-block;
                    padding: 10px 0;
                    color: rgba(255,255,255,0.60);
                }
                position: relative;
                z-index: 9;
                &:hover,&.is_active{
                    /*background-color: $color -theme;*/
                    border-radius: 10px;
                    /*box-shadow:2px 2px 10px #888888;*/
                    filter:brightness(90%) ;
                    .iconfont,span{
                        color: white;
                        filter:brightness(220%);

                    }
                }

                &:hover{
                    /*width: 100px;*/
                    .div-menu-item-body-inner{
                        text-align: left;
                        position: relative;
                        width: 120px;
                        /*background-color: $color -theme;*/
                        border-radius: 10px;
                        filter:brightness(90%) ;
                        z-index: 999;

                        padding-left: 10px;
                        box-shadow:2px 2px 10px #eeeeee;;
                    }
                    br{
                        display: none;
                    }
                    .menu-text{
                        display: inline-block;
                        margin-left: 10px;
                    }

                }
            }
        }
        .main-body{
            width: 80px;
            height: 80px;
            position: fixed;
            bottom: 65px;
            .content_head{
                width: 45px;
                height: 45px;
                margin:10px auto ;
                border-radius: 50%;
                background-color: #fff;
                box-shadow:0 0 20px #888888;
                overflow: hidden;
            }
        }

        .div-menu-fold{
            width: 80px;
            position: fixed;
            bottom: 0;
            left: 0;
            text-align: center;
            padding: 20px;
            .iconfont,span{
                color: rgba(255,255,255,0.60);
                font-size: 26px;
                display: inline-block;
                transform:rotate(180deg);
            }
        }
        .company-text,
        .foot,
        .main-body .content_name,
        .main-body .content_role,
        .main-body .content_company,
        .div-menu .menu-text
        {
            display: none;
        }
    }
</style>
