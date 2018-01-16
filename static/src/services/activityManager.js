import { request } from '../utils'

export async function query(params) {
	console.log(query,params)
	return request({
		url: "/api/restql/t_activity",
		method: 'GET',
		data: params
	});
};

export async function remove(params) {
	const selectedRowKeys = params.selectedRowKeys || [];
	const ids = selectedRowKeys.join(',');
	
	return request({
		url: `/api/restql/t_activity/${ids}`,
		method: 'delete'
	});
};

export function update(params) {
	const id = params.acID;
	delete params.acID;

	return request({
		url: `/api/restql/t_activity/${id}`,
		method: 'put',
		data: params
	})
}

