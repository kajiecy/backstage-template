import * as filters from '@/filters/filter'
import Vue from 'vue'

export default {
    init(){
        registerFilter();
        registerDateFormate();
    },
}
function registerFilter() {
    //引入自定义过滤器
    Object.keys(filters).forEach(key=>{
        Vue.filter(key,filters[key])
    })
}
//用于时间格式化，dateObj.format('yyyy-MM-dd')
function registerDateFormate() {
    Date.prototype.format = function(format)
    {
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(),    //day
            "h+" : this.getHours(),   //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
            "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                    RegExp.$1.length===1 ? o[k] :
                            ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }
}


