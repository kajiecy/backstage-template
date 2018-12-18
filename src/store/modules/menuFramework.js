const menuFramework = {
    state: {
        //菜单的主体信息
        asideMenuInfo: [
    {
        "id": 1,
        "menuitem": "菜单1",
        "icon": "iconfont icon-shouye",
        "route": null,
        'isActive':false,
        "childMenus": [
            {
                "id": 2,
                "menuitem": "菜单1-1",
                "icon": "fa fa-building-o",
                "route": "menu11",
                'isActive':false,
                "childMenus": null
            },
            {
                "id": 3,
                "menuitem": "菜单1-2",
                "icon": "fa fa-building-o",
                "route": "menu12",
                'isActive':false,
                "childMenus": null
            },
            {
                "id": 4,
                "menuitem": "菜单1-3",
                "icon": "fa fa-building-o",
                "route": "menu13",
                'isActive':false,
                "childMenus": null
            }
        ]
    },
    {
        "id": 5,
        "menuitem": "菜单2",
        "icon": "iconfont icon-kehuguanli",
        "route": null,
        'isActive':false,
        "childMenus": [
            {
                "id": 6,
                "menuitem": "菜单2-1",
                "icon": "fa fa-building-o",
                "route": "menu21",
                'isActive':false,
                "childMenus": null
            },
            {
                "id": 7,
                "menuitem": "菜单2-2",
                "icon": "fa fa-building-o",
                "route": "menu22",
                'isActive':false,
                "childMenus": null
            },
        ]

    },
    {
        "id": 8,
        "menuitem": "菜单3",
        "icon": "iconfont icon-kehuguanli",
        "route": null,
        'isActive':false,
        "childMenus": [
            {
                "id": 9,
                "menuitem": "菜单3-1",
                "icon": "fa fa-building-o",
                "route": "menu31",
                'isActive':false,
                "childMenus": null
            },
            {
                "id": 10,
                "menuitem": "菜单3-2",
                "icon": "fa fa-building-o",
                "route": "menu32",
                'isActive':false,
                "childMenus": null
            },
        ]
    }
],
        breadcrumbList: [],
        //二级菜单的选择标识(默认选择第一个)
        parentIndex: 0,
    },
    getters: {
        getAsideMenuInfo: state => {
            return state.asideMenuInfo;
        },
        getBreadcrumbList: state => {
            return state.breadcrumbList
        },
        getParentIndex: state => {
            return state.parentIndex
        },
    },
    mutations: {
        pushToBreadcrumbList(state,{id=null, name, route}){
            state.breadcrumbList.push({id: id, name: name, route: route})
        },
        //修改 一级菜单的active状态
        changeParentMenuActive(state,{routerId}){
            state.asideMenuInfo.forEach((item,index)=>{
                if(item.id===routerId){
                    item.isActive = true;
                    state.parentIndex = index;
                    if(item.childMenus&&item.childMenus.length>0){
                        changeChildMenuActive(state,{routerName:item.childMenus[0].route});
                    }
                }else {
                    item.isActive = false;
                }
            });
        },
        //修改 二级菜单 的 active状态
        changeChildMenuActive(state,{routerName}){
            changeChildMenuActive(state,{routerName});
        }

    },
    actions: {}
};

export default menuFramework

//修改 二级菜单 的 active状态
const changeChildMenuActive = function (state,{routerName}) {
    //将所有的2级菜单 isActive全部赋值为false 其中routerName 匹配的为true
    //赋值完成时记录一级菜单和二级菜单的 name 和 router 替换面包屑
    let parentMenuInfo = null,childMenuInfo = null;
    state.asideMenuInfo.forEach((item,index)=>{
        let _activeFlag = false;
        //一级菜单的循环
        if(item.childMenus&&item.childMenus.length>0){
            item.childMenus.forEach((_item)=>{
                if(_item.route===routerName){
                    //找到匹配 记录先 一级菜单和 二级菜单的 信息
                    _activeFlag = true;
                    _item.isActive = true;
                    state.parentIndex = index;
                    parentMenuInfo = {name:item.menuitem,route:item.route};
                    childMenuInfo = {name:_item.menuitem,route:_item.route};
                }else {
                    _item.isActive = false;
                }
            })
        }
        item.isActive = _activeFlag;
    })
    //重新赋值面包屑 home的话就清空
    if(routerName==='home'){
        state.breadcrumbList.splice(0,state.breadcrumbList.length)
    }else if(parentMenuInfo&&childMenuInfo){
        state.breadcrumbList.splice(0,state.breadcrumbList.length)
        state.breadcrumbList.push(parentMenuInfo)
        state.breadcrumbList.push(childMenuInfo)
    }
}
