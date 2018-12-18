<template>
    <div class="div-header" :class="$store.state.app.leftMenuOpenStatus">
        <div class="dis_table wd100">
            <div class="dis_table_cell textleft">
                <div v-for="(item,index) in navData" :key="index" class="header-menu color-theme-font"
                     :class="index===0?'is_active':''">
                    <i class="iconfont" :class="item.icon"></i>
                    <div>{{item.menuitem}}</div>
                </div>
            </div>
            <div class="dis_table_cell textright vertical-top innertable-right">
                <div class="dis_table inline-block">
                    <div class="dis_table_cell select_icon">
                        <i class="iconfont icon-chanpinxuanze"></i>
                    </div>
                    <div class="dis_table_cell">
                        <el-select
                                class="select_product"
                                id="select_product"
                                :filterable="false"
                                v-if="$store.getters.getLoginInfo.productList.length!==0"
                                v-model="productSelect" placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in $store.getters.getLoginInfo.productList"
                                    :key="index"
                                    :label="item.productName"
                                    :value="item.productCode">
                            </el-option>
                        </el-select>
                    </div>

                    <div class="dis_table_cell header-menu-right menu-right-popover">
                        <el-popover
                                placement="bottom-end"
                                width="200"
                                trigger="click"
                                :visible-arrow="false"
                                @show="popoverShow"
                                @hide="popoverHide"
                                popper-class="menu-popover-body"
                        >
                            <div class="popover-inner dis-select">
                                <template v-for="(item,index) in shortcutMenuData">
                                    <div :key="index" class="title-div">
                                        <div>{{item.menuitem}}</div>
                                    </div>
                                    <template v-if="item.childMenus">
                                        <div class="option-div pointer" v-for="(_item,_index) in item.childMenus" :key="index+'-'+_index">
                                            <i class="iconfont icon-kuaijiecaidan" :class="getColors()"></i>
                                            <div>{{_item.menuitem}}</div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                            <el-button slot="reference" plain class="menu-item-popover dis-select pointer inline-block"
                                       :class="popoverOption.openStatus?'is_open':''">
                                <i class="iconfont icon-quanbucaidan"></i>
                            </el-button>
                        </el-popover>

                    </div>
                    <div class="dis_table_cell header-menu-right">
                        <div style="position: relative;height: 0px;width: 0px;z-index: 0">
                            <i class="iconfont icon-zhutise" @click="clickPicker"></i>
                        </div>
                        <theme-picker ref="themePicker"></theme-picker>
                    </div>
                    <div class="dis_table_cell header-menu-right">
                        <i class="iconfont icon-tuichu"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<div class="div-header"></div>-->
</template>

<script>
    import ThemePicker from '@/views/components/ThemePicker'

    export default {
        name: "ZdHeader",
        data() {
            return {
                productSelect: 'option1',
                popoverOption: {
                    openStatus: false,
                }
            }
        },
        created() {

        },
        mounted() {

        },
        watch: {},
        methods: {
            clickPicker() {
                console.log(this.$refs.themePicker)
                this.$refs.themePicker.$el.click();

            },
            popoverShow() {
                console.log('show')
                this.popoverOption.openStatus = true;
            },
            popoverHide() {
                console.log('hide')
                this.popoverOption.openStatus = false;
            },
            getColors(){
                return 'color-'+(Math.random()*10+1).toFixed(0);
            }
        },
        computed: {
            //首页面的数据从vuex中取出
            navData() {
                /**
                 * computed 此时仅监听 this.$store.state.menuObj.parentIndex 和 this.$store.state.menuObj.asideMenuInfo 更改flag是 两个变量的地址都不变
                 * 因此此时我选择添加一个count 每次执行操作是增加修改count 实现对象监听联动
                 */
                this.$store.getters.getCount;
                let data = this.$store.getters.getAsideMenuInfo;
                if (data != null && data.length > 0) {
                    return this.$store.getters.getAsideMenuInfo;
                } else {
                    return [];
                }
            },
            shortcutMenuData() {
                console.log(this.$store.state.menuFramework.asideMenuInfo || [])
                return this.$store.state.menuFramework.asideMenuInfo || [];
            },
        },
        components: {
            ThemePicker,
        }
    }
</script>

<style lang="scss" scoped>
    @import "./../../assets/css/variable";

    .div-header {
        flex: 0 0 100px;
        margin-bottom: 20px;
    }

    .header-menu {
        display: inline-block;
        padding: 20px 10px 20px 10px;
        cursor: pointer;
        transition: all 0.8s;
    }

    .menu-popover-body {
        .popover-inner {
            padding: 0 0;
            .title-div {
                border-bottom: 1px solid #dddddd;
                color: #909399;
                padding-left: 25px;
                height: 10px;
                margin-bottom: 15px;
                margin-top: 5px;
                div {
                    display: inline-block;
                    background-color: white;
                    padding: 0 8px;
                }
            }
            .option-div{
                display: inline-block;
                margin: 2px 7px 2px 7px;

                font-size: 12px;
                .iconfont{
                    display: inline-block;
                    margin-right: 5px;
                }
                div{
                    /*color: #909399;*/
                    color: #606266;
                    display: inline-block;
                }
            }
        }
    }


</style>
