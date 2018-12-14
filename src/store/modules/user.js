
const user = {
    state: {
        loginInfo:{
            productList:[]
        },
    },
    getters:{
        getLoginInfo: ({loginInfo}) => {
            return loginInfo;
        }
    },
    mutations: {
        setLoginInfo(state, loginInfo) {
            state.loginInfo = loginInfo;
        },
    }
};

export default user;
