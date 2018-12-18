import Main from '@/views/layout/Main.vue';


//存在于layout中的路由配置在其中
export const innerLayoutRouter = {
    path: '/',
    name: 'innerLayoutRouter',
    redirect: '/home',
    component: Main,
    children: [
        {path: 'test1', name: 'test1',meta:{}, component: () => import('@/views/testmodule/test1.vue')},
        {path: 'home', name: 'home',meta:{}, component: () => import('@/views/testmodule/home.vue')},

        {path: 'menu11', name: 'menu11',meta:{}, component: () => import('@/views/testmodule/menu1.vue')},
        {path: 'menu12', name: 'menu12',meta:{}, component: () => import('@/views/testmodule/menu1.vue')},
        {path: 'menu13', name: 'menu13',meta:{}, component: () => import('@/views/testmodule/menu1.vue')},

        {path: 'menu21', name: 'menu21',meta:{}, component: () => import('@/views/testmodule/menu1.vue')},
        {path: 'menu22', name: 'menu22',meta:{}, component: () => import('@/views/testmodule/menu1.vue')},

        {path: 'menu31', name: 'menu31',meta:{}, component: () => import('@/views/testmodule/menu1.vue')},
        {path: 'menu32', name: 'menu32',meta:{}, component: () => import('@/views/testmodule/menu1.vue')},

    ]
};

// 独立存在的页面写在这里
export const outerLayoutRouter = [
    {path: '/login', name: 'login',meta:{}, component: () => import('@/views/common/login.vue')},
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
