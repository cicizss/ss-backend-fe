import { queryTeam, createDirect } from '../services/api';

export default {
  namespace: 'team',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTeam, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    },
    *createDirect({ payload }, { call, put }) {
      const response = yield call(createDirect, payload);
      yield put({
        type: 'createDirect',
        payload: response.result,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    createDirect1(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
