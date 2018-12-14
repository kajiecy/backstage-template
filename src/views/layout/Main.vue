<template>
    <div class="layout-body">
        <div class="home-back" :class="$store.state.app.leftMenuOpenStatus"></div>
        <div class="home-whole-back"></div>
        <zd-menu-left></zd-menu-left>
        <div class="right-view">
            <zd-header></zd-header>
            <div class="layout-inner">
                <div class="layout-content" :class="$store.state.app.leftMenuOpenStatus">
                <!--<el-card class="layout-content box-card">-->
                    <zd-breadcrumb></zd-breadcrumb>
                    <router-view></router-view>
                <!--</el-card>-->
                </div>
                <zd-menu-right></zd-menu-right>
            </div>
        </div>
    </div>
</template>

<script>
    import ZdHeader from './ZdHeader';
    import ZdMenuLeft from './ZdMenuLeft';
    import ZdMenuRight from './ZdMenuRight';
    import ZdBreadcrumb from './ZdBreadcrumb';

    export default {
        name: "Main",
        data() {
            return {}
        },
        created() {

        },
        mounted() {
            this.appInit()
        },
        watch: {},
        methods: {
            appInit(){
                this.$post(this.$store.state.reqUrl.getSessionInfo,{
                    productCode:'',
                }).then(result=>{
                    console.log("结果为：",result)

                    this.$store.commit('setAsideMenuInfo',result.menus);
                    this.$store.commit('setLoginInfo',result);
                    // this.$store.commit("changeAsideMenuInfoOpenFlag",this.$route.name);
                    // sessionStorage.setItem('userI',JSON.stringify(result));
                    // this.$store.commit('giveuserInfo',result);
                })
            }
        },
        computed: {},
        components: {
            ZdHeader,
            ZdMenuLeft,
            ZdMenuRight,
            ZdBreadcrumb
        }
    }
</script>

<style scoped>


</style>
