module.exports = [
  {
    path: 'pages/index', // 页面路径，同时是 vue 文件相对于 src 的路径
    config: {
      navigationBarTitleText: '工作台'
    }
  }, {
    path: 'pages/center',
    config: {
      navigationBarTitleText: '个人中心'
    }
  }, {
    path: 'pages/account/account.list',
    config: {
      navigationBarTitleText: '客户列表'
    }
  }, {
    path: 'pages/account/account.item',
    config: {
      navigationBarTitleText: '客户详情'
    }
  }, {
    path: 'pages/account/account.address',
    config: {
      navigationBarTitleText: '地址'
    }
  }, {
    path: 'pages/opportunity/opportunity.list',
    config: {
      navigationBarTitleText: '商机列表'
    }
  }, {
    path: 'pages/opportunity/opportunity.item',
    config: {
      navigationBarTitleText: '商机详情'
    }
  }, {
    path: 'pages/opportunity/opportunity.address',
    config: {
      navigationBarTitleText: '地址'
    }
  }, {
    path: 'pages/opportunity/intention.product.list',
    config: {
      navigationBarTitleText: '意向产品'
    }
  }
]
