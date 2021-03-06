import { isUrl } from '../utils/utils';

const menuData = [
  // {
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   path: 'dashboard',
  //   children: [
  //     {
  //       name: '分析页',
  //       path: 'analysis',
  //     },
  //     {
  //       name: '监控页',
  //       path: 'monitor',
  //     },
  //     {
  //       name: '工作台',
  //       path: 'workplace',
  //       // hideInBreadcrumb: true,
  //       // hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   name: '表单页',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: '基础表单',
  //       path: 'basic-form',
  //     },
  //     {
  //       name: '分步表单',
  //       path: 'step-form',
  //     },
  //     {
  //       name: '高级表单',
  //       authority: 'admin',
  //       path: 'advanced-form',
  //     },
  //   ],
  // },
  // {
  //   name: '列表页',
  //   icon: 'table',
  //   path: 'list',
  //   children: [
  //     {
  //       name: '查询表格',
  //       path: 'table-list',
  //     },
  //     {
  //       name: '标准列表',
  //       path: 'basic-list',
  //     },
  //     {
  //       name: '卡片列表',
  //       path: 'card-list',
  //     },
  //     {
  //       name: '搜索列表',
  //       path: 'search',
  //       children: [
  //         {
  //           name: '搜索列表（文章）',
  //           path: 'articles',
  //         },
  //         {
  //           name: '搜索列表（项目）',
  //           path: 'projects',
  //         },
  //         {
  //           name: '搜索列表（应用）',
  //           path: 'applications',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: '详情页',
  //   icon: 'profile',
  //   path: 'profile',
  //   children: [
  //     {
  //       name: '基础详情页',
  //       path: 'basic',
  //     },
  //     {
  //       name: '高级详情页',
  //       path: 'advanced',
  //       authority: 'admin',
  //     },
  //   ],
  // },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //     {
  //       name: '触发异常',
  //       path: 'trigger',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
  {
    name: '销售管理',
    icon: 'dashboard',
    path: 'team',
    children: [
      {
        name: '直销团队',
        path: 'direct',
      },
      {
        name: '事业合伙人',
        path: 'partner',
      },
      {
        name: '财富团队',
        path: 'wealth',
      },
      {
        name: '渠道合作',
        path: 'channel',
      },
    ],
  },
  {
    name: '客户管理',
    icon: 'form',
    path: 'customer',
    children: [
      {
        name: '客户管理',
        path: 'info',
      },
      {
        name: '保单管理',
        path: 'documents',
      },
    ],
  },
  {
    name: '财务结算',
    icon: 'pay-circle-o',
    path: 'cwjs',
    children: [
      {
        name: '业绩酬金',
        path: 'yjyj',
      },
      {
        name: '产品佣金',
        path: 'cpyj',
      },
      {
        name: '酬金发放',
        path: 'cjff',
      },
      {
        name: '酬金发放日志',
        path: 'cjffrz',
      },
      {
        name: '酬金异常',
        path: 'cjyc',
      },
    ],
  },
  {
    name: '保险产品',
    icon: 'table',
    path: 'bxcp',
    children: [
      {
        name: '保险产品费率',
        path: 'bxcpfl',
      },
      {
        name: '展业佣金费率',
        path: 'cftdfl',
      },
      {
        name: '保单预约',
        path: 'bdyy',
      },
      {
        name: '保单托管',
        path: 'bdtg',
      },
      {
        name: '计划书',
        path: 'jhs',
      },
    ],
  },
  {
    name: '用户管理',
    icon: 'profile',
    path: 'userinfo',
    children: [
      {
        name: '用户查询',
        path: 'userlist',
      },
      {
        name: '小程序登录信息',
        path: 'wexin',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
