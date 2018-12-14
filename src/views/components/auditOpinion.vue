<template>
    <div :class="$store.state.app.xialaClass">
        <template :audit="audit">
            <label class="ft14 title-font-color">{{audit.title}}</label>
            <div class="opinion">
                <template v-for="(pitem,key) in audit.data">
                    <div :key="key">
                        <el-row>
                            <template v-for="(item,index) in audit.item">
                                <template v-if="item.type!='remark'">
                                    <el-col :key="index+'_1'" :span="2" class="title-font-color textright ft13"><label class="mb20">{{item.label}}</label></el-col>
                                    <el-col :key="index+'_2'" :span="4" class="content-font-color ft13 mb20" v-if="pitem[item.prop]">
                                        <span>{{pitem[item.prop]}}</span>
                                        <label v-if="key==0&&index==0">最终</label>
                                    </el-col>
                                    <el-col :key="index+'_3'" :span="4" class="content-font-color ft13 mb20" v-else><span>未填写</span></el-col>
                                    <div :key="'clear_'+index" v-if="index!==0&&(index+1)%3===0" class="clearboth"></div>
                                </template>
                                <template v-else>
                                    <div :key="'clear_up_'+index" class="clearboth"></div>
                                    <el-col :key="index+'_1'" :span="2" class="title-font-color textright ft13"><label class="mb20">{{item.label}}</label></el-col>
                                    <el-col :key="index+'_2'" :span="21" class="content-font-color ft13" v-if="pitem[item.prop]"><span>{{pitem[item.prop]}}{{pitem[item.prop]}}{{pitem[item.prop]}}{{pitem[item.prop]}}{{pitem[item.prop]}}</span></el-col>
                                    <el-col :key="index+'_3'" :span="21" class="content-font-color ft13" v-else><span>未填写</span></el-col>
                                    <div :key="'clear_down_'+index" class="clearboth"></div>
                                </template>
                            </template>
                        </el-row>
                    </div>
                    <div :key="'second_div'+key" class="cut-off" v-if="key!=audit.data.length-1"></div>
                </template>
                <i class="iconfont icon-xiala1 color-theme" @click="showMore()"></i>
            </div>
        </template>
    </div>
</template>

<script>
    /**
     * 使用方法
     *   import auditOpinion from "@/views/components/auditOpinion";
     *   <audit-opinion :audit="auditData"></audit-opinion>
     */

    export default {
        name: "auditOpinion",
        props: {
            audit: Object,
            default() {
                return {
                    title : "",
                    item : [
                        {label:"公司名称",prop:"handleRole"},
                        {label:"审核角色",prop:"handleRole"},
                        {label:"审核时间",prop:"handleUsername"},
                        {label:"审核人",prop:"handleUsername"},
                        {label:"审核结果",prop:"dotype"},
                        {label:"审核意见",type:"remark",prop:"message"},
                    ],
                    data : []
                }
            }
        },
        data() {
            return {
            }
        },
        created() {

        },
        mounted() {
            
        },
        watch: {

        },
        methods: {
            showMore(){
                if(this.$store.state.app.xialaClass == ""){

                }
                this.$store.commit('changeXialaClass');                
            }

        },
        computed: {

        },
        components: {

        },
    }
</script>

<style lang="scss" scoped>
    .opinion{
        border: 1px solid #d2d2d2;
        padding: 15px 0;
        margin-bottom: 30px;
        position: relative;
    }
    .cut-off{
        border-bottom: 1px solid rgb(210, 210, 210);
        width: 97%;
        margin: 15px auto;
    }
    .icon-xiala1{
        font-size: 34px;
        position: absolute;
        left: 50%;
        bottom: -19px;
        background-color: #ffffff;
    }
    .down {
        .icon-xiala1 {
            transform: rotate(0deg);
        }
    }
    .up {
        .icon-xiala1 {
            transform: rotate(180deg);
        }
    }
</style>