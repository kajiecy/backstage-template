
const user = {
    state: {
        //用户的登录信息
        loginInfo:{
            productList:[
                {
                    "productName": "选项1",
                    "productCode": "option1",
                },
                {
                    "productName": "选项2",
                    "productCode": "option2",
                },
                {
                    "productName": "选项3",
                    "productCode": "option3",
                }
            ]
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
