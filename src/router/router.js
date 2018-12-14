import Main from '@/views/layout/Main.vue';


//存在于layout中的路由配置在其中
export const innerLayoutRouter = {
    path: '/',
    name: 'innerLayoutRouter',
    redirect: '/login',
    component: Main,
    children: [
        {path: 'home', name: 'test1',meta:{icon:'icon-test',title:'test1'}, component: () => import('@/views/testmodule/test1.vue')},
        {path: 'test2', name: 'test2',meta:{icon:'icon-test',title:'test2'}, component: () => import('@/views/testmodule/test2.vue')},
    ]
};

// 独立存在的页面写在这里
export const outerLayoutRouter = [
    {path: '/login', name: 'login',meta:{icon:'icon-test',title:'login'}, component: () => import('@/views/common/login.vue')},
];
export const undefindRouter = {
    path: '/404',
    name: '404',
    meta: {
        title: '404 没有找到界面'
    },
    component: () => import('@/views/common/404.vue')
};
export const nullRouter = {
    path: '*',
    name:'null',
    redirect: '/404'
};
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    innerLayoutRouter,
    ...outerLayoutRouter,
    undefindRouter,
    nullRouter
];
