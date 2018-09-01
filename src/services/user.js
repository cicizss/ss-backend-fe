import request from '../utils/request';

export async function query() {
  return request('/user/users');
}

export async function queryCurrent() {
  return request('/user/currentUser');
}
