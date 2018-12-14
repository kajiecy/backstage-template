<template>
    <div>
        <div class="top-buttons">
            <el-button type="primary" size="mini">返回</el-button>
        </div>
        <audit-opinion :audit="auditData"></audit-opinion>
        <detail-template :detail="detailData"></detail-template>
        <div style="height: 200px;border: 1px solid seagreen"></div>
        <div class="border-left-theme border-bottom-theme bw-3" style="width: 20px;height: 20px"></div>
    </div>
</template>

<script>
    import detailTemplate from '@/views/components/detailTemplate.vue';
    import auditOpinion from "@/views/components/auditOpinion.vue";
    export default {
        name: "test1",
        data() {
            return {
                detailData:{
                    basicInfo : [
                        {title : "基本信息",item : [
                                {label:"退货单号：",prop:"rgCode"},
								{label:"退货主题：",prop:"rgTitle"},
								{label:"统一社会信用代码：",prop:"rgCode"},
								{label:"退货主题：",prop:"rgTitle"},
								{label:"退货金额：",type:"amount",prop:"amount"},
								{label:"退货主题：",prop:"rgTitle"},
								{label:"退货主题：",prop:"rgTitle"},
								{label:"退货号：",prop:"rgCode"},
								{label:"退货原因：",type:"remark",prop:"rgRemarks"},
                            ]
                        },
                        {title : "收货信息",item : [
                                {label:"退货单号：",prop:"rgCode"},
                                {label:"退货主题： ",prop:"rgTitle"},

                            ]
                        }
                    ],
                    data:{}
                },

                auditData:{
                    title : "审核意见",
                    item : [
                        {label:"公司名称：",prop:"handleRole"},
                        {label:"审核角色：",prop:"handleRole"},
                        {label:"审核时间：",prop:"handleUsername"},
                        {label:"审核人：",prop:"handleUsername"},
                        {label:"审核结果：",prop:"dotype"},
                        {label:"审核意见：",type:"remark",prop:"message"},
                    ],
                    data : []
                }
            }
        },
        created() {

        },
        mounted() {
            this.$post('/scf/purchase/back/queryrReturnInfo', {
                id : '7ba8ce5b82d97fa5e050007f0100022b',
            }).then((result) => {
                this.data = result.data;
                this.detailData.data = result.data;
                this.detailData.data.rgRemarks = "大家快三点就撒谎杜师傅不都是开放不少地方";
                this.detailData.data.amount = "12365";
            });
            this.$post('/scf/purchase/back/queryAuditOpinion', {
                id : '7ba8ce5b82d97fa5e050007f0100022b',
            }).then((result) => {
                this.auditData.data = result.data;
                this.auditData.data[0].message = "你大师傅is阿凡达会暗访烦死了FHSOFHDSDF";
                //this.auditData.data[1] = this.auditData.data[0];
            });
        },
        watch: {},
        methods: {},
        computed: {},
        components: {
            detailTemplate,
            auditOpinion
        }
    }
</script>

<style lang="scss" scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }



</style>
