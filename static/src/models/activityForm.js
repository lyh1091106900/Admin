import { loadTable, update, save, uploadImage, addTable, updateTable } from '../services/activityForm';

const initState = {
	acID: '',
	headline_En: '',
	headline_Km: '',
	theme_En: '',
	theme_Km: '',
	start_time: 0,
	end_time: 0,
	content_En: '',
	content_Km:'',
	picture_En:'',
	picture_Km:'',
	award:'',
	state_flag:0
};

export default {
	namespace: 'activityForm',

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
			//var timestamp = Date.parse(new Date());  
			const params = {
				headline_En: payload.headline_En,
				headline_Km: payload.headline_Km,
				theme_En: payload.theme_En,
				theme_Km: payload.theme_Km,
				start_time: payload.start_time ,
				end_time: payload.end_time ,
				content_En:payload.content_En,
				content_Km:payload.content_Km,
				picture_En:payload.picture_En,
				picture_Km:payload.picture_Km,
				award : payload.award, 
				state_flag: payload.state_flag || 0,
			};

			if (payload.acID) {
				params.acID = payload.acID;
				data = yield call(update, params);
				//tableData = yield call(updateTable,{tableName:payload.template,data:payload.cont});
			} else {
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