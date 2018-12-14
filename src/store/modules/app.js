const app = {
    state: {
        themeColor:'#4251f6',
        leftMenuOpenStatus:'left-menu-close',//'left-menu-open','left-menu-close'
        rightMenuOpenStatus:'right-menu-open',//'right-menu-open','right-menu-close'
        xialaClass:'down',//'down','up'
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
