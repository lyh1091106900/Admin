import { request } from '../utils'

export async function query(params) {
	console.log(query,params)
	return request({
		url: "/api/restql/t_shop_item",
		method: 'GET',
		data: params
	});
};

export async function remove(params) {
	const selectedRowKeys = params.selectedRowKeys || [];
	const ids = selectedRowKeys.join(',');
	
	return request({
		url: `/api/restql/t_shop_item/${ids}`,
		method: 'delete'
	});
};

export function update(params) {
	const id = params.id;
	delete params.id;

	return request({
		url: `/api/restql/t_shop_item/${id}`,
		method: 'put',
		data: params
	})
}

