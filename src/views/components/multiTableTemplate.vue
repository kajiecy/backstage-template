<template>
    <div>
        <template :table="table">
            <el-table :ref="table.ref" :data="table.data" border stripe @selection-change="handleSelectionChange" @row-click="clickOneRow" @cell-mouse-enter="cellMouseEnter"  @cell-mouse-leave="cellMouseLeave"
                highlight-current-row style="width:100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
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
     *   import multiTableTemplate from "@/views/components/multiTableTemplate"
     *   <multi-table-template :table="tableData" :page-size='pageSize' :page-no="pageNo" v-model="multipleSelection"></multi-table-template>
     *   传入pageSize和pageNo方便计算序号，v-model带出选中的多行数据
     */
    export default {
        name: "multiTableTemplate",
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
                multipleSelection:[]
            }
        },
        created() {

        },
        mounted() {

        },
        watch: {

        },
        methods: {
            //当选择项发生变化时
            handleSelectionChange(selection){
                this.multipleSelection = selection;
                this.$emit('input',selection);
            },
            //当某一行被点击时
            clickOneRow(row){
                let flag = false;
                for(let index in this.multipleSelection){
                    if(this.multipleSelection[index]===row){
                        this.$refs[this.table.ref].toggleRowSelection(row,false);
                        flag = true;
                        break;
                    }
                }
                if (flag===false){
                    this.$refs[this.table.ref].toggleRowSelection(row);
                }
            },
            //当单元格 hover 进入时
            cellMouseEnter(row){
                this.$refs[this.table.ref].setCurrentRow(row);
            },
            //当单元格 hover 退出时
            cellMouseLeave(){
                this.$refs[this.table.ref].setCurrentRow();
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
