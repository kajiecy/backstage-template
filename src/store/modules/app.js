const app = {
    state: {
        themeColor:'#4251f6',//主题色的初始值，注意:修改此值时请同时修改 src/assets/css/_variable.scss中 $color-theme的值，使之保持一致。
        leftMenuOpenStatus:'left-menu-open',//左侧菜单的打卡状态['left-menu-open','left-menu-close']
        rightMenuOpenStatus:'right-menu-open',//右侧菜单的打开状态['right-menu-open','right-menu-close']
        xialaClass:'down',//详情页面下拉菜单的状态['down','up']
    },
    getters: {
        getThemeColor: ({themeColor}) => {
            return themeColor;
        },
        getLeftMenuOpenStatus:({leftMenuOpenStatus})=>{
            return leftMenuOpenStatus;
        },
        getRightMenuOpenStatus:({rightMenuOpenStatus})=>{
            return rightMenuOpenStatus;
        },
        getXialaClass:({xialaClass})=>{
            return xialaClass;
        },
    },
    mutations: {
        setThemeColor(state, themeColor) {
            state.themeColor = themeColor;
        },
        changeLeftMenuOpenStatus(state) {
            state.leftMenuOpenStatus = state.leftMenuOpenStatus==='left-menu-open'?'left-menu-close':'left-menu-open';
        },
        changeRightMenuOpenStatus(state) {
            state.rightMenuOpenStatus = state.rightMenuOpenStatus==='right-menu-open'?'right-menu-close':'right-menu-open';
        },
        changeXialaClass(state) {
            state.xialaClass = state.xialaClass==='down'?'up':'down';
        },
    }
};

export default app;

