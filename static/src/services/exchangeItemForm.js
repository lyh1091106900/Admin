import { request } from '../utils';

export async function loadTable(params) {
	
	const id = params.exchange_itemID || 0;
	const url = id ? `/api/restql/t_exchange_item/${id}` : '/api/restql/t_exchange_item';
    console.log('loadexchange',url);
	return request({
		url,
		method: 'get'
	});
};

export async function update(params) {
	const id = params.exchange_itemID || 0;
	if (!id) {
		return;
	}

	delete params.exchange_itemID;

	return request({
		url: `/api/restql/t_exchange_item/${id}`,
		method: 'put',
		data: params
	});
};

export async function save(params) {
	return request({
		url: '/api/restql/t_exchange_item',
		method: 'post',
		data: params
	});
};

export async function addTable(params) {
	return request({
		url: '/api/table',
		method: 'post',
		data: params
	});
};
export async function updateTable(params) {
	return request({
		url: '/api/table',
		method: 'put',
		data: params
	});
};