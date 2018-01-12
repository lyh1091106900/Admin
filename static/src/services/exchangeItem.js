import { request } from '../utils'

export async function query(params) {
	console.log(query,params)
	return request({
		url: "/api/restql/t_exchange_item",
		method: 'GET',
		data: params
	});
};

export async function remove(params) {
	const selectedRowKeys = params.selectedRowKeys || [];
	const ids = selectedRowKeys.join(',');
	
	return request({
		url: `/api/restql/t_exchange_item/${ids}`,
		method: 'delete'
	});
};

export function update(params) {
	const id = params.exchange_itemID;
	delete params.exchange_itemID;

	return request({
		url: `/api/restql/t_exchange_item/${id}`,
		method: 'put',
		data: params
	})
}

