import { query, remove, update, removeTable } from '../services/exchangeItem'

export default {

  namespace: 'exchangeItem',

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
    *loadExchangeItem({ payload }, { call, put }) {
      console.log('loadExchangeItem',payload)
      yield put({ type: 'showLoading' });
      payload.sortField = 'creat_time';
      payload.sortOrder = 'desc';
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'loadExchangeItemSuccess',
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
       });
      yield put({ type: 'hideLoading' });
      yield put({ type: 'selectedRowKeys', payload: { selectedRowKeys: [] } });
    },

    *removeExchangeItem({ payload }, { call, put }) {
      console.log('removeExchangeItem')
      yield put({ type: 'showLoading' });
      const data = yield call(remove, payload);
        console.log("delete payload",payload);
      if (data && data.success) {
        yield put({
          type: 'loadExchangeItem',
          payload: {
            page: 1,
            pageSize: 10
          }
        });
      } else {
        yield put({ type: 'hideLoading' });
      }
    },

    *updateExchangeItem({ payload }, { call, put }) {
      console.log('updateExchangeItem',payload)
      yield put({ type: 'showLoading' });
      const page = payload.page;
      const pageSize = payload.pageSize;

      delete payload.page;
      delete payload.pageSize;

      const data = yield call(update, payload);
      console.log(data)

      if (data && data.success) {
        yield put({
          type: 'loadExchangeItem',
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
    loadExchangeItemSuccess(state, action) {
     // console.log('loadExchangeItemSuccess');
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
