<template>
  <div class="">
    <div class="dis_table wd100">
      <div class="dis_table_cell wd60 textright">
        <img class="pic-404__parent" src="@/assets/img/404_images/404.png" alt="404">
      </div>
      <div class="dis_table_cell textleft title-404">
        <div class="content-right">
          找不到此网页。
          <div class="content-describe">
            请检查您输入的网址是否正确，请点击以下按钮返回主页。
          </div>
          <el-button type="primary" @click="returnPage()" round>返回首页</el-button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'Page404',
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    watch: {},
    methods: {
      returnPage(){
        this.$router.push("/");
      }
    },
    computed: {},
    components: {}
  }
</script>

<style scoped>
  .dis_table{
    height: 100vh;
  }
  .pic-404__parent{
    width: 600px;
    height: 330px;
  }
  .title-404{
    animation-fill-mode: forwards;
    color: #1482f0;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .content-right{
    height: 330px;
  }
  .content-describe{
    color: grey;
    font-size: 13px;
    line-height: 21px;
    margin-bottom: 30px;
    margin-top: 30px;
  }
</style>
