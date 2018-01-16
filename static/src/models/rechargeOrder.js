import { query, remove, update, removeTable } from '../services/rechargeOrder'

export default {

  namespace: 'rechargeOrder',

  state: {
    list: [],
    selectedRowKeys: [],
    loading: false,
    pagination: {
      current: 1, 
      pageSize: 10,
      total: 0
    },
  },

  effects: {
    *loadRechargeOrder({ payload }, { call, put }) {
     // console.log('loadPlayerQuery',payload)
      yield put({ type: 'showLoading' });
      payload.sortField = 'time';
      payload.sortOrder = 'desc';
      const data = yield call(query, payload);
      yield put({
        type: 'loadRechargeOrderSuccess',
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
      });
      yield put({ type: 'hideLoading' });
      yield put({ type: 'selectedRowKeys', payload: { selectedRowKeys: [] } });
    },

    *removeRechargeOrder({ payload }, { call, put }) {
    //  console.log('removePlayerQuery')
      yield put({ type: 'showLoading' });
      const data = yield call(remove, payload);
      //  console.log("delete payload",payload);
      if (data && data.success) {
        yield put({
          type: 'loadRechargeOrder',
          payload: {
            page: 1,
            pageSize: 10
          }
        });
      } else {
        yield put({ type: 'hideLoading' });
      }
    },

    *updateRechargeOrder({ payload }, { call, put }) {
     // console.log('updatePlayerQuery')
      yield put({ type: 'showLoading' });
      const page = payload.page;
      const pageSize = payload.pageSize;

      delete payload.page;
      delete payload.pageSize;

      const data = yield call(update, payload);
      

      if (data && data.success) {
        yield put({
          type: 'loadRechargeOrder',
          payload: {
            page: page,
            pageSize: pageSize
          }
        })
      } else {
        yield put({ type: 'hideLoading' });
      }
    }
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    selectedRowKeys(state, action) {
      return { ...state, selectedRowKeys: action.payload.selectedRowKeys };
    },
    loadRechargeOrderSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state, 
        list: actionData.data.record,
        selectedRowKeys: [],
        pagination: {
          current: action.payload.current,
          pageSize: action.payload.pageSize,
          total: actionData.data.totalRecord || 0
        }
      };
    }
  }
}
