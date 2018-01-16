import {saveAddOrder, loadTable, update, save, uploadImage, addTable, updateTable } from '../services/playerForm';

const initState = {
	userid: '',
	name: '',
	gems: '',
	
};

export default {
	namespace: 'playerForm',

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
		//	console.log("payload",this.state.gems);
			const newgems =parseInt(payload.gems)+parseInt(payload.addGems);
			const params = {
				name: payload.name || "",
				userid : payload.userid || "",
				gems : newgems
			};

			const paramsAdd = {
				userid : payload.userid || "",
				increase_diamond : payload.addGems
			};

			
				params.userid = payload.userid;
				data = yield call(update, params);
			    //tableData = yield call(updateTable,{tableName:payload.template,data:payload.cont});
		        if (data && data.success) {
					paramsAdd.creat_time= Date.parse(new Date());  
					yield call(saveAddOrder,paramsAdd);
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
			console.log('loadSuccess',data);
			if (data) {
				console.log( { ...state, ...data})
				return { ...state, ...data};
			}
			return state;
		}
	}
}