import Vue from 'vue';

// const VueSticky = VueSticky.default // Global variable

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
    bind(el) { //, binding, vnode, oldVnode
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            // 获取到的值带px 正则匹配替换
            let styL, styT;

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            }

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX;
                const t = e.clientY - disY;

                // 移动当前元素
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;

                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
})
Vue.directive('affix', {
    inserted(el) {
        const scrollBody = document.querySelector('#router-body');
        scrollBody.onscroll= function(){el.style.top = scrollBody.scrollTop+"px"}

    }
})
// // 注册一个全局自定义指令 v-checkParam
// // 在需要校验的input框上加class="clickCheck",并且加上自定义指令
// // 示例代码：v-checkParam="{required:true,message1:'请输入手机号',regex:/^1[34578]\d{9}$/,message2:'手机号码有误，请重填'}"
// Vue.directive('checkParam', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el, binding, vNode) {
//     el.addEventListener('blur', function (event) {
//         // 首先去除已有样式
//         el.className = el.className.replace('input-error', '').trim()
//         if($(el).next(".tips").length != 0){
//             $(el).next(".tips").text("")
//         }else{
//             $(el).parent().next(".tips").text("")
//         }
//         // if (!event.keyCode) { // 加上这个判断就是在提交时，才会校验
//             // 判断是否必填
//         let isRequired = binding.value.required
//         let message1 = binding.value.message1
//         if (isRequired) {
//             if (!el.value || el.value === '') {
//                 el.className += ' input-error'
//                 if($(el).next(".tips").length != 0){
//                     $(el).next(".tips").text(message1)
//                 }else{
//                     $(el).parent().next(".tips").text(message1)
//                 }
//             }
//         }
//         // 判断正则
//         if(binding.value.regex){
//             let regex = binding.value.regex
//             let message2 = binding.value.message2
//             if(el.value && !regex.test(el.value)){
//                 el.className += ' input-error'
//                 $(el).next(".tips").text(message2)
//             }
//         }
//         // }
//     })
//   }
// })
//
// // 注册一个全局自定义指令 v-checkSelect
// // 在需要校验的select框上加class="clickCheck",并且加上自定义指令
// // 示例代码：v-checkSelect="{required:true,message1:'请选择供应商'}"
// Vue.directive('checkSelect', {
//     // 当被绑定的元素插入到 DOM 中时……
//     inserted: function (el, binding, vNode) {
//         el.addEventListener('change', function (event) {
//             // 首先去除已有样式
//             el.className = el.className.replace('input-error', '').trim()
//             $(el).next(".tips").text("")
//             // if (!event.keyCode) { // 加上这个判断就是在提交时，才会校验
//                 // 判断是否必填
//             let isRequired = binding.value.required
//             let message1 = binding.value.message1
//             if (isRequired) {
//                 if (!el.value || el.value === '') {
//                     el.className += ' input-error'
//                     $(el).next(".tips").text(message1)
//                 }
//             }
//             // }
//         })
//     }
// })
//
// Vue.directive('checkDate', {
//     // 当被绑定的元素插入到 DOM 中时……
//     inserted: function (el, binding, vNode) {
//         el.addEventListener('blur', function (event) {
//             // 首先去除已有样式
//             el.className = el.className.replace('input-error', '').trim()
//             $(el).next(".tips").text("")
//             // if (!event.keyCode) { // 加上这个判断就是在提交时，才会校验
//                 // 判断是否必填
//             let isRequired = binding.value.required
//             let message1 = binding.value.message1
//             if (isRequired) {
//                 if (!$(el).children().first().val() || $(el).children().first().val() === '') {
//                     el.className += ' input-error'
//                     $(el).next(".tips").text(message1)
//                 }
//             }
//             // }
//         })
//     }
// })
//
// // 注册一个全局自定义指令 v-checkSubmit
// // 在页面确定按钮或弹出框确定按钮上加上指令
// // 示例代码：v-checkSubmit:bjSub   bjSub为最终需要调用的函数方法名
// // 弹出框确定按钮上v-checkSubmit:bjSub;页面确定按钮上v-checkSubmit:subAdd="2"
// Vue.directive('checkSubmit', {
//   // 当被绑定的元素插入到 DOM 中时……
//     inserted: function (el, binding, vNode) {
//         el.addEventListener('click', function (event) {
//             let elements = null;
//             if(binding.value){
//                 elements = $(".well .clickCheck");
//             }else{
//                 elements = $(".in .clickCheck")
//             }
//             let evObj = document.createEvent('Event')
//             evObj.initEvent('blur', true, true)
//             let evSel = document.createEvent('Event')
//             evSel.initEvent('change', true, true)
//             for (let element of elements) {
//                 element.dispatchEvent(evObj)
//                 element.dispatchEvent(evSel)
//             }
//             let errorInputs = null;
//             if(binding.value){
//                 errorInputs = $(".well .input-error")
//             }else{
//                 errorInputs = $(".in .input-error")
//             }
//             if(errorInputs.length === 0){
//
//                 //vNode.context.submit(el.ref);
//                 let eventName = binding.arg
//                 eval("vNode.context."+eventName+"()")
//             }else {
//                 if(binding.value){
//                     $('html, body').animate({scrollTop: $(errorInputs[0]).offset().top-120}, 200)
//                 }
//             }
//         })
//     }
// })
export {Vue}
