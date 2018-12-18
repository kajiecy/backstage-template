<template>
    <div class="breadcrumb-body">
        <div class="breadcrumb dis-select">
            <a href="javascript:void(0)" @click="$router.push('/home')">
                <div class="color-theme breadcrumb-item breadcrumb-home">
                    <i class="iconfont icon-ditu_dingwei"></i>
                    首页
                </div>
            </a>

            <template v-for="(item,index) of getBreadcrumbList">
                <template v-if="!item.route">
                    <div class="breadcrumb-item" :key="index">
                        <span class="breadcrumb-flag">></span> {{item.name}}
                    </div>
                </template>
                <template v-else>

                        <div class="breadcrumb-item" :key="index">
                            <span class="breadcrumb-flag">></span>
                            <a class="color-theme" href="javascript:void(0)" @click="$router.push(item.route)" :key="index">{{item.name}}</a>
                        </div>

                </template>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ZdBreadcrumb",
        data() {
            return {}
        },
        created() {

        },
        mounted() {
            this.$store.commit("pushToBreadcrumbList",{name:'路径1', route:''});
            this.$store.commit("pushToBreadcrumbList",{name:'路径2', route:'aaa'});
            this.$store.commit("pushToBreadcrumbList",{name:'路径3', route:''});
        },
        watch: {},
        methods: {},
        computed: {
            getBreadcrumbList(){
                return this.$store.getters.getBreadcrumbList;
            },
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
    .breadcrumb-body{
        opacity: 100;
        color: #303133;
        background-color: white;
        position: relative;
        padding-top: 20px;
        z-index: 2;

        a{
            text-decoration: none;
        }
        .breadcrumb{
            padding: 0px 10px 20px 10px;
            .breadcrumb-item{
                display: inline-block;
                font-size: 14px;
                margin-right: 10px;
                .breadcrumb-flag{
                    display: inline-block;
                    margin-right: 10px;
                }
            }
            .breadcrumb-home{
                .iconfont{
                    display: inline-block;
                    margin-right: 5px;
                }
            }
        }
    }
</style>
