import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import reqUrl from './modules/reqUrl';
import menuFramework from './modules/menuFramework';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        app,
        user,
        reqUrl,
        menuFramework
    }
});

export default store;
