/**
 * 登录用户信息数据仓库
 * @author siye
 *  */
export default {
  getters: {
    getAccountId: (state) => () => {
      return state.accountId;
    },
    getUser: (state) => () => {
      let user = wx.getStorageSync('user');
      return JSON.parse(user)
    }
  },
  state: {
    accountId: ''        // 客户Id，从客户资料出进入会有此参数
  },
  mutations: {
    setUser (state, res) {
      wx.setStorage({
        key: "user",
        data: JSON.stringify(res)
      });
    },
    setAccountId (state, res) {
      state.accountId = res;
    }
  }
}
