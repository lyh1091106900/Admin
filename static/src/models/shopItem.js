import { query, remove, update, removeTable } from '../services/shopItem'

export default {

  namespace: 'shopItem',

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
    *loadShopItem({ payload }, { call, put }) {
      console.log('loadShopItem',payload)
      yield put({ type: 'showLoading' });
      payload.sortField = 'creat_time';
      payload.sortOrder = 'desc';
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'loadShopItemSuccess',
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
       });
      yield put({ type: 'hideLoading' });
      yield put({ type: 'selectedRowKeys', payload: { selectedRowKeys: [] } });
    },

    *removeShopItem({ payload }, { call, put }) {
      console.log('removeShopItem')
      yield put({ type: 'showLoading' });
      const data = yield call(remove, payload);
        console.log("delete payload",payload);
      if (data && data.success) {
        yield put({
          type: 'loadShopItem',
          payload: {
            page: 1,
            pageSize: 10
          }
        });
      } else {
        yield put({ type: 'hideLoading' });
      }
    },

    *updateShopItem({ payload }, { call, put }) {
      console.log('updateShopItem',payload)
      yield put({ type: 'showLoading' });
      const page = payload.page;
      const pageSize = payload.pageSize;

      delete payload.page;
      delete payload.pageSize;

      const data = yield call(update, payload);
      

      if (data && data.success) {
        yield put({
          type: 'loadShopItem',
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
    loadShopItemSuccess(state, action) {
      console.log('loadShopItemSuccess1');
      const actionData = action.payload.data;
      console.log('loadShopItemSuccess2',{
        ...state, 
        list: actionData.data.record,
        selectedRowKeys: [],
        pagination: {
          current: action.payload.current,
          pageSize: action.payload.pageSize,
          total: actionData.data.totalRecord || 0
        }
      });
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
