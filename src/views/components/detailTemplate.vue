<template>
    <div>
        <template :detail="detail">
            <template v-for="(basicItem,index) in detail.basicInfo">
                <div :key="index">
                    <label class="ft14 title-font-color">{{basicItem.title}}</label>
                    <el-row >
                        <template v-for="(item,index) in basicItem.item">
                            <template v-if="item.type!='remark'">
                                <el-col :key="index+'_1'" :span="2" class="title-font-color textright ft13"><label class="mb30">{{item.label}}</label></el-col>
                                <el-col :key="index+'_2'" :span="4" class="content-font-color ft13 mb30" v-if="detail.data[item.prop]">
                                    <span v-if="item.type=='amount'">{{detail.data[item.prop] | Nummat}}</span>
                                    <span v-else>{{detail.data[item.prop]}}</span>
                                </el-col>
                                <el-col :key="index+'_3'" :span="4" class="content-font-color ft13 mb30" v-else><span>未填写</span></el-col>
                                <div :key="'clear_'+index" v-if="index!==0&&index%3===(index+1)/4-1" class="clearboth"></div>
                            </template>
                            <template v-else>
                                <div :key="'clear_up_'+index" class="clearboth"></div>
                                <el-col :key="index+'_1'" :span="2" class="title-font-color textright ft13"><label class="mb30">{{item.label}}</label></el-col>
                                <el-col :key="index+'_2'" :span="22" class="content-font-color ft13 mb30" v-if="detail.data[item.prop]"><span>{{detail.data[item.prop]}}</span></el-col>
                                <el-col :key="index+'_3'" :span="22" class="content-font-color ft13 mb30" v-else><span>未填写</span></el-col>
                                <div :key="'clear_down_'+index" class="clearboth"></div>
                            </template>
                        </template>
                    </el-row>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    /**
     * 使用方法
     *   import detailTemplate from "@/views/components/detailTemplate"
     *   <detail-template :detail="detailData"></detail-template>
     */

    export default {
        name: "detailTemplate",
        props: {
            detail: Object,
            default() {
                return {
                    basicInfo : [
                        {
                            title : "基本信息",item : [
                                {label:"原单证编号",prop:"prop"},
                                {label:"开立日期",prop:"prop"}
                            ]
                        }
                    ],
                    data:{}
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


        },
        computed: {

        },
        components: {

        },
    }
</script>

<style scoped>
    
</style>
