<template>
    <div class="aside-right" :class="$store.state.app.rightMenuOpenStatus">
        <div class="aside-right-header">
            <div class="aside-right-headerBox headerBoxWait" :class="menuChoice==='wait'?'active':''" @click="changeRightMenu('wait')">
                <div class="headerBox color-10">
                    <i class="iconfont icon-daiban"></i>
                    <p class="ft12">待办</p>
                </div>
                <div class="box-num">
                    <div class="box-num-inner">
                        199
                    </div>
                </div>
            </div>
            <div class="aside-right-headerBox" :class="menuChoice==='notice'?'active':''" @click="changeRightMenu('notice')">
                <div class="headerBox color-3">
                    <i class="iconfont icon-xiaoxi1"></i>
                    <p class="ft12">通知</p>
                </div>
                <div class="box-num">
                    <div class="box-num-inner">
                        1
                    </div>
                </div>
            </div>
            <div class="aside-right-headerBox headerBoxWar" :class="menuChoice==='warn'?'active':''" @click="changeRightMenu('warn')">
                <div class="headerBox color-8">
                    <i class="iconfont icon-yujing"></i>
                    <p class="ft12">预警</p>
                </div>
                <div class="box-num">
                    <div class="box-num-inner">
                        99
                    </div>
                </div>
            </div>
        </div>
        <div id="aside-right-content" class="aside-right-content box-shadow dis-select">
            <div v-for="item in 10">
                <div class="divList">
                    <span>一条新消息</span>
                    <div class="bottom clearfix">
                        <div class="bottomDiv content-font-color">
                            民进党当选议员退党 怒称：这是什么政党啊！民进党在台湾地区
                        </div>
                    </div>
                    <el-button type="primary" icon="el-icon-edit" size="mini" class="box-card-btn" >立即办理</el-button>
                </div>

            </div>
        </div>
        <div class="right-menu-switch " @click="changeRightMenuOpen">
            <i class="iconfont icon-shouqi"></i>
        </div>
    </div>
</template>

<script>
    // import PerfectScrollbar from 'perfect-scrollbar';
    export default {
        name: "ZdMenuRight",
        data() {
            return {
                menuChoice:'wait',
                perfectScrollbar:{},
            }
        },
        created() {

        },
        mounted() {
            // this.$nextTick(function () {
            //     this.perfectScrollbar = new PerfectScrollbar('#aside-right-content');
            // });

        },
        watch: {},
        methods: {
            changeRightMenu(type){
                if(this.$store.state.app.rightMenuOpenStatus==='right-menu-close'){
                    this.$store.commit('changeRightMenuOpenStatus');
                }
                // this.perfectScrollbar.update();
                // document.querySelector('#aside-right-content').scrollTop = 0;
                this.menuChoice = type;

            },
            changeRightMenuOpen(){
                this.$store.commit('changeRightMenuOpenStatus');
            }
        },
        computed: {},
        components: {}
    }
</script>
<style lang="scss" scoped>
    @import "./../../assets/css/variable";
    .right-menu-open{
        padding-left: 30px;
        flex: 0 0 300px;
        .aside-right-header{
            width: 100%;
            overflow:hidden;
            height: 60px;
            position: relative;
            user-select:none;
            display: flex;
        }
        .aside-right-headerBox{
            width: 75px;
            height: 60px;
            margin-left: 20px;
            border-radius: 10px 10px 0 0 ;
            background-color: #fff;
            position: relative;
            top: 22px;
            transition: all 0.3s;
            border: 1px solid #eeeeee ;
            cursor: pointer;
        }
        .active{
            top: 1px;
        }
        .headerBox{
            margin-top: 10px;
            text-align: center;
            .iconfont{
                font-size: 24px;
            }
        }
        .aside-right-content{
            width: 100%;
            height: calc(100vh - 100px - 20px - 60px);
            background-color: #fff;
            border-radius: 20px 0 0 0 ;
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;

        }
        .divList{
            padding-top: 20px;
            margin-left: 10px;
            margin-right: 10px;
            padding-left: 10px;
            padding-right: 10px;
            width: 280px;
            height: 125px;
            border-bottom: 1px solid #ccc;
        }
        .divList span{
            font-size: 15px;
            margin-bottom: 10px;
            font-weight:bold;
        }
        .right-menu-switch{
            display: inline-block;
            width: 30px;
            height: 30px;
            position: fixed;
            right: 290px;
            bottom: 10px;
            //background-color: $color -theme;
            text-align: center;
            border-radius: 5px;
            .iconfont{
                display: inline-block;
                font-size: 18px;
                line-height: 30px;
                color: white;
                transform: rotate(180deg);
            }
        }

        .box-card-btn{
            float: right;

        }
        .bottomDiv{
            margin-top: 10px;
            text-indent: 28px;
        }
        .box-num{
            display: none;
        }
    }
    .right-menu-close{
        padding-left: 0px;
        flex: 0 0 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .aside-right-content{
            display: none;
        }
        .aside-right-headerBox{
            flex: 0 0 70px;
            width: 70px;
            height: 70px;
            background-color: white;
            margin: 30px;
            border: 1px solid #eeeeee ;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .headerBox{
                flex: 0 0 36px;
                display: inline-block;
                text-align: center;
                .iconfont{
                    font-size: 36px;
                }
            }

            p{
                display: none;
            }
            .box-num{
                position: relative;
                height: 0;
                width: 0;
                right: 63px;
                bottom: 45px;
                .box-num-inner{
                    color: white;
                    display: inline-block;
                    padding: 1px 6px;
                    border-radius: 20px;
                    background-color: $sub-color-10;
                }
            }
        }
        .right-menu-switch{
            display: none;
        }
    }
</style>
