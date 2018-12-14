/**
 * 示例 ($post 为vue 全局属性可以直接在页面中使用)
 this.$post(this.$store.state.reqUrl.urlName,{
        paramName1:value1,
        paramName2:value2,
    },[{isAlert:true}]).then(result=>{

    }).catch(error=>{

    }).final(()=>{

    })
 */
import axios from 'axios';
import {Loading} from 'element-ui';
import router from './../router'
axios.defaults.baseURL ='';
axios.defaults.withCredentials=true

//http request 拦截器
axios.interceptors.request.use(config => {
    //const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装post请求
 * @param url 请求路径 类型:string
 * @param data 参数 类型:obj
 * @param option (isAlert:标识是否需要在接口报错时自动弹出错误提示)
 * @returns {Promise}
 */
export function post(url, data = {}, option = {isAlert:false}) {
  return new Promise((resolve, reject) => {

    const loading = Loading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.0)'
    });
    axios.post(url, data)
      .then(response => {
        loading.close();
        if (response.data.respCode === '00' || response.data.respCode === '0' || response.data.result === '0') {
          resolve(response.data);
        } else if (response.data.result==="3") {
          router.push({name:"login",params:{overTimeFlag:true}});
        }
        else {
          if (option.isAlert!== false) {
            if (response.data.failMsg) {
              // layer(Vue).alert(response.data.failMsg, {title: '提示'});
                alert(response.data.failMsg);
            } else {
              // layer(Vue).alert(response.data.respMsg, {title: '提示'});
                alert(response.data.respMsg);
            }
          }
          reject(response.data)
        }
      }, err => {
        loading.close();
        reject(err)
      })
  })
}

