import { loadTable, update, save, uploadImage, addTable, updateTable } from '../services/shopItemForm';

const initState = {
	productID: '',
	name_En: '',
	name_Km: '',
	introduce_En: '',
	introduce_Km: '',
	use_flag: 1,
	hot_flag: 1,
	price: '',
};

export default {
	namespace: 'shopItemForm',

	state: {
		...initState
	},

	effects: {
		*load({ payload }, { call, put }) {
			const data = yield call(loadTable, payload);
			//console.log('loadplayerForm',data)
			if (data && data.success) {
				yield put({ type: 'loadSuccess', payload: data });
			}
		},

		*save({ payload }, { call, put }) {
			let data = null, tableData = null;
			const callback = payload.callback;
			delete payload.callback;
			console.log("payload",payload);
			var timestamp = Date.parse(new Date());  
			const params = {
				productID: payload.productID,
				name_En: payload.name_En,
				name_Km: payload.name_Km,
				introduce_En: payload.introduce_En,
				introduce_Km: payload.introduce_Km,
				use_flag: payload.use_flag || 0,
				hot_flag: payload.hot_flag || 0,
				modify_time : timestamp, 
				price: payload.price,
			};

			if (!payload.isCreate) {
				params.productID = payload.productID;
				data = yield call(update, params);
				//tableData = yield call(updateTable,{tableName:payload.template,data:payload.cont});
			} else {
				params.creat_time=timestamp;
				data = yield call(save, params);
				//tableData = yield call(addTable,{tableName:payload.template,data:payload.cont});
			}

			yield put({ type: 'loadSuccess', payload: data });
			callback && callback(data);
		},

	},

	reducers: {
		resetState(state) {
			return { ...state, ...initState };
		},

		loadSuccess(state, action) {
			const data = action.payload && action.payload.data;
			//console.log('loadSuccess', data);
			if (data) {
			//	console.log({ ...state, ...data })
				return { ...state, ...data };
			}
			return state;
		}
	}
}