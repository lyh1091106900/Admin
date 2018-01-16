import { request } from '../utils'

export async function query(params) {
	console.log('query',params)
	return request({
		url: "/api/restql/t_message",
		method: 'GET',
		data: params
	});
};

export async function remove(params) {
	const selectedRowKeys = params.selectedRowKeys || [];
	const ids = selectedRowKeys.join(',');
	
	return request({
		url: `/api/restql/t_message/${ids}`,
		method: 'delete'
	});
};

export function update(params) {
	const id = params.meID;
	delete params.meID;
    console.log('update',params);
	return request({
		url: `/api/restql/t_message/${id}`,
		method: 'put',
		data: params
	})
}

export async function removeTable(params) {
	const templateArr = params.templateArr || [];
	const res = templateArr.join(',');
	
	return request({
		url: `/api/table/${res}`,
		method: 'delete'
	});
};