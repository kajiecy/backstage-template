const menuFramework = {
    state: {
        //菜单的主体信息
        asideMenuInfo: [
    {
        "id": 105,
        "menuitem": "菜单1",
        "resUrl": null,
        "parentId": 0,
        "icon": "iconfont icon-shouye",
        "menulevel": 1,
        "route": "home",
        "orderindex": 99,
        "operauthid": null,
        "menudesc": null,
        "buttons": [ ],
        "childMenus": [
            {
                "id": 163,
                "menuitem": "菜单1-1",
                "icon": "fa fa-building-o",
                "route": "enterpriseInfo",
                "childMenus": null
            },
            {
                "id": 163,
                "menuitem": "菜单1-2",
                "icon": "fa fa-building-o",
                "route": "enterpriseInfo",
                "childMenus": null
            },
            {
                "id": 163,
                "menuitem": "菜单1-3",
                "icon": "fa fa-building-o",
                "route": "enterpriseInfo",
                "childMenus": null
            }
        ]
    },
    {
        "id": 38,
        "menuitem": "菜单2",
        "icon": "iconfont icon-kehuguanli",
        "route": null,
    },
    {
        "id": 38,
        "menuitem": "菜单3",
        "icon": "iconfont icon-kehuguanli",
        "route": null,
    },
    {
        "id": 38,
        "menuitem": "菜单4",
        "icon": "iconfont icon-kehuguanli",
        "route": null,
    },
    {
        "id": 38,
        "menuitem": "菜单5",
        "icon": "iconfont icon-kehuguanli",
        "route": null,
    }
],
        //二级菜单的选择标识(默认选择首页)
        parentIndex: 0,
        count: 0,
        currentRouterName: '',
        breadcrumbList: [],
        menuUnfold: true,
    },
    getters: {
        getAsideMenuInfo: state => {
            return state.asideMenuInfo;
        },
        getMenuUnfold: state => {
            return state.menuUnfold;
        },
        /**
         * 根据菜单id返回 此id下的childMenus
         * 用于获取二级后的菜单信息
         * @param state
         * @returns {function(*=): *}
         */
        getChildMenuInfoById: state => (id) => {
            let result = null;
            // 根据id返回 菜单先下的节点
            let searchMenuInfo = (menuInfo, searchId) => {
                for (let item of menuInfo) {
                    if (parseInt(item.id) === parseInt(searchId)) {
                        result = item.childMenus;
                    } else {
                        if (item.childMenus != null && item.childMenus.length > 0) {
                            searchMenuInfo(item.childMenus, searchId);
                        }
                    }
                }
            };
            searchMenuInfo(state.asideMenuInfo, id);
            return result
        },
        /**
         * 获取当前菜单下 的最末尾路由名称
         * @param state
         * @returns {function(*=): *}
         */
        getLastRouterById: state => (id) => {
            // 根据id返回 菜单先下的节点
            let searchMenuInfo = (menuInfo, searchId) => {
                if (menuInfo != null) {
                    for (let item of menuInfo) {
                        if (searchId != null) {
                            if (parseInt(item.id) === parseInt(searchId)) {
                                if (item.childMenus != null && item.childMenus != null) {
                                    return searchMenuInfo(item.childMenus);
                                }
                            }
                        } else {
                            if (item.route != null && (item.childMenus == null || item.childMenus.length === 0)) {
                                return item.route;
                            } else {
                                return searchMenuInfo(item.childMenus);
                            }
                        }
                    }
                }
            };
            state.count++;
            if (state.asideMenuInfo != null) {
                return searchMenuInfo(state.asideMenuInfo, id);
            } else {
                return null;
            }
        },
        getMenuButtonsById : state => (routerName) => {
            let buttons = [];
            let searchMenuInfo = (menuInfo, routerName) => {
                if (menuInfo != null) {
                    for (let item of menuInfo) {
                        if (item.route === routerName) {
                            buttons = item.buttons;
                        }else {
                            if (item.childMenus != null && item.childMenus.length > 0) {
                                searchMenuInfo(item.childMenus,routerName);
                            }
                        }
                    }
                }
            };
            searchMenuInfo(state.asideMenuInfo, routerName);
            return buttons;
        },
        getMenuRouterByName : state => (preRouterName) => {
            let routerName = '';
            let searchMenuInfo = (menuInfo, preRouterName) => {
                if (menuInfo != null) {
                    for (let item of menuInfo) {
                        if (item.route!=null&&item.route.includes(preRouterName)) {
                            routerName = item.route;
                        }else {
                            if (item.childMenus != null && item.childMenus.length > 0) {
                                searchMenuInfo(item.childMenus,preRouterName);
                            }
                        }
                    }
                }
            };
            searchMenuInfo(state.asideMenuInfo, preRouterName);
            return routerName;
        },
        getParentIndex: state => {
            return state.parentIndex
        },
        getBreadcrumbList: state => {
            return state.breadcrumbList
        },
        getCount: state => {
            return state.count
        },
    },
    mutations: {
        setRouterName(state, routerName) {
            state.currentRouterName = routerName;
        },
        setMenuUnfold(state, value) {
            state.menuUnfold = value;
        },
        initMenuObj(state) {
            state.asideMenuInfo.splice(0, state.asideMenuInfo.length);
            state.breadcrumbList.splice(0, state.breadcrumbList.length);
            state.parentIndex = 0;
            state.currentRouterName = "";
            state.count = 0;
            state.menuUnfold = true;
        },

        /**
         * 为菜单树信息赋值并给字段添加openflag属性
         * @param state 内部state
         * @param menuInfo 传入的menuInfo信息
         */
        setAsideMenuInfo(state, menuInfo) {
            // console.log("传参为：",menuInfo);
            //给每个 menu 添加 展开事件默认为false
            //递归为每个childMenus添加字段
            let setOpenFlag = (childMenus) => {
                //第一步先执行首要逻辑 声明openflag 以便可以mvvm
                //递归为每个childMenus添加字段
                for (let item of childMenus) {
                    item.openFlag = false;
                    if (item.childMenus != null && item.childMenus.length > 0) {
                        setOpenFlag(item.childMenus);
                    }
                }
            };
            setOpenFlag(menuInfo);
            state.asideMenuInfo = menuInfo;
            state.count++;
        },
        /**
         * 改变菜单树的Openflag的属性
         * 用于点击菜单树时控制 菜单的展开和收起
         * @param state
         * @param id 菜单id 或者 router name
         */
        changeAsideMenuInfoOpenFlag(state, id) {
            //拆分 router_name 用来适配 菜单下的编辑页面
            let router_length = 0;
            if (id != null) {
                router_length = id.toString().split("-").length;
                id = id.toString().split("-")[0];
            }

            //方法进入时 先确定在asideMenuInfo中存不存在id 或者 routerName 存在继续不存在 returan
            let menuHas = false;
            if (id === 'oldHome') {
                state.parentIndex = 0;
                state.asideMenuInfo.forEach((value, index) => {
                    state.asideMenuInfo[index].openFlag = index === 0;
                });
                state.count++;
            }
            else {
                const searchMenuHas = (childMenus, id) => {
                    for (let item of childMenus) {
                        if (item.id.toString() === id || item.route === id) {
                            menuHas = true;
                        } else {
                            if (item.childMenus != null && item.childMenus.length > 0) {
                                searchMenuHas(item.childMenus, id);
                            }
                        }
                    }
                };
                searchMenuHas(state.asideMenuInfo, id);
            }

            if (menuHas === true) {
                //此方法实现逻辑 将当前id 及 当前id下的childMenu 的openFlag 的状态改变
                //其他的属性改为false首页面的数据从vuex中取出
                let flagSum = null;
                let menuLv = 0;
                const searchMenuInfo = (childMenus, id) => {
                    let rf = {isFind: false, isActive: false, result: false};
                    for (let item of childMenus) {
                        if (item.id.toString() === id || item.route === id) {
                            // 找到后判断 childMenus 中有没有值有值 就 赋值为true 没值返回 不变
                            if (router_length === 1) {
                                item.openFlag = !item.openFlag;
                            } else {
                                item.openFlag = true;
                            }
                            flagSum = item.openFlag;
                            rf.isFind = true;
                            rf.isActive = true;
                            menuLv = item.menulevel;
                            // break;
                        } else {
                            if (item.childMenus != null && item.childMenus.length > 0) {
                                let childRf = searchMenuInfo(item.childMenus, id);
                                if (rf.isActive === false) {
                                    rf = childRf;
                                }
                                //上层赋值时不要无脑赋值
                                //如果当前事件是一次关闭事件&&下层执行过操作&&并且当openFlag状态是true 不改变
                                if (!(flagSum != null && flagSum === false && childRf.isActive === true && item.openFlag === true)) {
                                    item.openFlag = childRf.result;
                                }
                            } else {
                                item.openFlag = false;
                            }
                        }
                    }
                    let fooResult = false;
                    fooResult = childMenus.some(childMenu => childMenu.openFlag === true);
                    rf.result = fooResult;
                    return rf;
                };
                searchMenuInfo(state.asideMenuInfo, id);
                //循环更更新index
                let newIndex = state.parentIndex;
                let flag = state.asideMenuInfo.some((parentMenu, index) => {
                    if (parentMenu.openFlag === true) {
                        newIndex = index;
                    }
                    return parentMenu.openFlag === true;
                });
                state.parentIndex = flag ? newIndex : state.parentIndex;

                //nav状态标识 改变
                for (let index in state.asideMenuInfo) {
                    if (index == parseInt(state.parentIndex)) {
                        state.asideMenuInfo[index].openFlag = true;
                    }
                }
                //在此递归查找当前 路由下面 id信息 记录下 id
                let waitOpenIds = [];
                //根据router.name 来判断 查找整个树的使用分支用于菜单切换的回显
                //同时更新面包屑信息
                //清空数组
                state.breadcrumbList.splice(0, state.breadcrumbList.length);
                let searchTreeByRouter = (treeMenus, routerName) => {
                    let rf = {result: false};
                    for (let item of treeMenus) {
                        if (item.route === routerName) {
                            state.breadcrumbList.unshift({id: item.id, name: item.menuitem, route: item.route})
                            if (item.menulevel > menuLv || (item.menulevel === menuLv && item.childMenus == null)) {
                                waitOpenIds.push(item.id);
                                rf.result = true;
                                break;
                            }
                        } else {
                            if (item.childMenus != null && item.childMenus.length > 0) {
                                let childRf = searchTreeByRouter(item.childMenus, routerName);
                                if (rf.result === false) {
                                    rf = childRf;
                                }
                                if (childRf.result === true) {
                                    state.breadcrumbList.unshift({id: item.id, name: item.menuitem, route: item.route})
                                    if (item.menulevel > menuLv) {
                                        waitOpenIds.push(item.id)
                                    }
                                }
                            }
                        }
                    }
                    return rf;
                };
                // console.log("传入的参数为：",state.currentRouterName);
                searchTreeByRouter(state.asideMenuInfo, state.currentRouterName.split("-")[0]);
                if (waitOpenIds.length > 0) {
                    let changeRouterMenuOpen = (treeMenus, ids) => {
                        for (let item of treeMenus) {
                            let haveIds = ids.some(id => id === item.id);
                            if (haveIds === true) {
                                item.openFlag = true;
                            }
                            if (item.childMenus != null && item.childMenus.length > 0) {
                                changeRouterMenuOpen(item.childMenus, ids);
                            }
                        }
                    };
                    changeRouterMenuOpen(state.asideMenuInfo, waitOpenIds);
                }
                state.count++;
            }

        },
        setParentIndex(state, index) {
            state.parentIndex = index;
        },
        pushToBreadcrumbList(state,{id=null, name, route}){
            state.breadcrumbList.push({id: id, name: name, route: route})
        }
    },
    actions: {}
};

export default menuFramework
