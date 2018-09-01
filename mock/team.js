import { parse } from 'url';

// mock tableListDataSource
const tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    richeid: `600001${i}`,
    name: `张三${i}号`,
    realname:`张三${i}号`,
    certifyNo: `42012344859500445${i}`,
    tel: `1378845162${i}`,
    sex: i % 2 ? '男' : '女',
    state: Math.floor(Math.random() * 10) % 3,
    bankcardid:`42012344859500445${i}`,
    bankcardname: `张三${i}号`,
    pwd:'',
    email:'123Qqq.com',
    remark:'这是一段描述',
    addtime: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
  });
}

export function getTeam(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
