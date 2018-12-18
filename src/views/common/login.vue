<template>
    <div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img class="silder-img" :src="login1"/>
                </div>
                <div class="swiper-slide">
                    <img class="silder-img" :src="login2"/>
                </div>
                <div class="swiper-slide">
                    <img class="silder-img" :src="login3"/>
                </div>
            </div>
        </div>
        <div class="loginBox">
            <p class="bigTitle typeface">登录页标题</p>
            <div class="page-container typeface">
                <h1 style="margin-top: 25px;">登录</h1>
                <input type="text" name="username" class="username" placeholder="请输入用户名" id="username" ref='name'>
                <input type="password" name="password" class="password" placeholder="请输入密码" id="pwd" ref="pwd">
                <p>
                    <router-link to="/forget">忘记密码？</router-link>
                    <span>
            <router-link to="/register">立即注册</router-link>
          </span>
                </p>
                <button type="submit" @click="login()">登录</button>
            </div>
            <p class="gBox">Copyright © 2012-2018 jszdyl.com 版权所有</p>
        </div>
    </div>
</template>

<script>
    import login1 from '@/assets/img/login_images/login1.jpg';
    import login2 from '@/assets/img/login_images/login2.jpg';
    import login3 from '@/assets/img/login_images/login3.jpg';

    export default {
        data() {
            return {
                a:true,
                login1:login1,
                login2:login2,
                login3:login3,
            }
        },
        computed: {

        },
        created() {
            this.keyupSubmit()
        },
        methods: {
            //监听回车事件
            keyupSubmit() {
                document.onkeyup = () => {
                    let _key = window.event.keyCode;
                    if (_key === 13) {
                        this.login()
                    }
                }
            },
            login() {
                // this.$post(this.$store.state.reqUrl.login,{
                //     username: this.$refs.name.value,
                //     password: this.$refs.pwd.value,
                //     code: ''
                // }).then(()=>{ //result
                //     // console.log("login结果为：",result)
                // })
                this.$router.push('/home');
            },

        },
        mounted() {
            new Swiper('.swiper-container',{
                        effect : 'fade',//淡入淡出
                        loop : true,//循环
                        autoplay:true,//自动播放（等同于以下设置）
                        allowTouchMove:false,//禁用触摸
                        /*autoplay:{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true,},*/
                    }
            );
        },

    };
</script>

<style scoped>

    .swiper-container{
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: -1;
    }
    .swiper-slide{
        height: 100%;
        width: 100%;
    }
    .silder-img{
        width: 100%;
        height: 113%;
    }
    .bigTitle {
        font-size: 50px;
        font-weight: 700;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        padding: 12% 0 0 0;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
    }

    .page-container {
        background: rgba(255, 255, 255, 0.7) !important;
        width: 390px;
        padding-top: 10px;
        border-radius: 5px;
        text-align: center;
        margin: 6% auto 0;
    }

    .page-container p {
        text-align: left;
        font-size: 1rem;
        height: 30px;
        line-height: 30px;
        margin: 10px 60px 0;
    }

    .page-container span {
        float: right;
    }

    h1 {
        font-size: 30px;
        font-weight: 700 !important;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        color: #fff;
    }

    input {
        width: 270px;
        height: 42px;
        margin-top: 25px;
        padding: 0 15px;
        background: #2d2d2d; /* browsers that don't support rgba */
        background: rgba(45, 45, 45, 0.15) !important;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset !important;
        -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset !important;
        font-family: "PT Sans", Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #fff !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: all 0.2s;
        -o-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -webkit-transition: all 0.2s;
    }

    input:-moz-placeholder {
        color: #fff;
    }

    input:-ms-input-placeholder {
        color: #fff;
    }

    input::-webkit-input-placeholder {
        color: #fff;
    }

    input:focus {
        outline: none;
        -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
    }

    button {
        cursor: pointer;
        width: 300px;
        height: 44px;
        margin-top: 10px;
        padding: 0;
        background: #ef4300;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        border: 1px solid #ff730e;
        -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        font-family: "PT Sans", Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: all 0.2s;
        -o-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -webkit-transition: all 0.2s;
        margin-bottom: 30px;
    }

    .gBox {
        position: fixed;
        width: 100%;
        bottom: 10px;
        color: #000;
        font-size: 12px;
        text-align: center;
    }

    button:hover {
        -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
    }

    button:active {
        -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
        0 2px 7px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1) inset,
        0 1px 4px 0 rgba(0, 0, 0, 0.1);
        border: 0 solid #ef4300;
    }

    /*字体不被选中*/
    .typeface {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
