<template>
    <div>
        <template :table="table">
            <el-table :ref="table.ref" :data="table.data" border stripe @current-change="handleCurrentChange" @row-dblclick="handleRowDblclick"
                highlight-current-row style="width:100%">
                <el-table-column type="index" label="序号" width="60px" :index="(index)=>{return index+1+pageSize*(pageNo-1)}" v-if="table.hasIndex"></el-table-column>
                <template v-for="item in table.tr">
                    <el-table-column :label="item.label" :key="item.id" v-if="item.type==='amount'">
                        <template slot-scope="scope">
                            {{scope.row[item.prop] | Nummat}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="item.label" :key="item.id" v-else-if="item.type==='account'">
                        <template slot-scope="scope">
                            {{scope.row[item.prop] | hideMiddle}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="item.label" :key="item.id" v-else-if="item.type==='status'">
                        <template slot-scope="scope">
                            <template>
                                <span :style="table.listState[scope.row[item.prop]].style">{{scope.row[item.prop]}}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column :label="item.label" :key="item.id" :prop="item.prop" v-else>
                    </el-table-column>
                </template>
            </el-table>
        </template>
    </div>
</template>

<script>
    /**
     * 使用方法
     *   import tableTemplate from "@/views/components/tableTemplate"
     *   <table-template :table="tableData" :page-size='pageSize' :page-no="pageNo" v-model="item" @dbclick="doubleSetData"></table-template>
     *   传入pageSize和pageNo方便计算序号，v-model带出选中的单行数据，@dbclick双击单行带出整行数据方便后续操作（根据需要使用）
     */
    export default {
        name: "tableTemplate",
        props: {
            table: {
                type: Object,
                default() {
                    return {
                        hasIndex:false,//有无序号
                        ref:"",
                        tr:[{
                            id : '1',
                            label : 'label',
                            type : 'amount',
                            prop : 'prop',
                        }],
                        data:[],
                        listState:{}//状态的颜色变化
                    };
                },
            },
            // 每页显示条数
            pageSize: {
                type: Number,
                default: 10
            },
            // 当前页码
            pageNo: {
                type: Number,
                default: 1
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
            "table.data":{
                handler:function(newValue,oldValue){
                    if(newValue && newValue.length!=0){
                        this.$refs[this.table.ref].setCurrentRow(newValue[0]);
                    }
                },
                deep:true
            }
        },
        methods: {
            //当表格当前行发生变化时
            handleCurrentChange(currentRow){
                this.$emit('input',currentRow);
            },
            //当某一行被双击时
            handleRowDblclick(row){
                this.$emit('dbclick',row);
            }

        },
        computed: {

        },
        components: {

        },
    }
</script>

<style scoped>

</style>
