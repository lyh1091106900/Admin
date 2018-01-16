import { loadTable, update, save, uploadImage, addTable, updateTable } from '../services/carouselForm';

const initState = {
	meID: '',
	creat_time: 0,
	modify_time: 0,
	headline_En: '',
	headline_Km: '',
	state_flag: 0,
	frequency :0,
	cycles_time : 0,
	msg_En :'',
	msg_Km :'',
	start_time : 0,
	end_time : 0,
	
};

export default {
	namespace: 'carouselForm',

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
			let data = null,tableData=null;
			const callback = payload.callback;
			delete payload.callback;
			console.log("payload",payload);
			let timev = Date.parse(new Date()); 
			const params = {
				headline_En: payload.headline_En || "",
				headline_Km: payload.headline_Km || "",
				state_flag: payload.state_flag || 0,
				frequency: payload.frequency || 0,
				cycles_time :payload.cycles_time,
				msg_En: payload.msg_En || "",
				msg_Km: payload.msg_Km || "",
				start_time: payload.start_time,
				end_time :payload.end_time
			};

			if (payload.meID) {
				params.meID = payload.meID;
				params.modify_time =timev;
				data = yield call(update, params);
				
			} else {
				params.creat_time =timev;
				params.modify_time =timev;
				data = yield call(save, params);
			
			}

			yield put({ type: 'loadTableSuccess', payload: data });
			callback && callback(data);
		}

	},

	reducers: {
		resetState(state) {
			return { ...state, ...initState };
		},

		loadSuccess(state, action) {
			const data = action.payload && action.payload.data;
			console.log('loadSuccess',data);
			if (data) {
				console.log( { ...state, ...data})
				return { ...state, ...data};
			}
			return state;
		}
	}
}