// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

export const apiServerAddress = noProxy ? 'http://127.0.0.1:9000' : '';
