import { request } from '../utils'

export async function query(params) {
	console.log('playPaysInfo',query,params)
	return request({
		url: "/api/restql/t_pay_order",
		method: 'GET',
		data: params
	});
};

export async function remove(params) {
	const selectedRowKeys = params.selectedRowKeys || [];
	const ids = selectedRowKeys.join(',');
	
	return request({
		url: `/api/restql/t_pay_order/${ids}`,
		method: 'delete'
	});
};

export function update(params) {
	const id = params.id;
	delete params.id;

	return request({
		url: `/api/restql/t_pay_order/${id}`,
		method: 'put',
		data: params
	})
}

