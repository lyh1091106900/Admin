import { request } from '../utils';

export async function loadTable(params) {
	
	const id = params.productID || 0;
	const url = id ? `/api/restql/t_shop_item/${id}` : '/api/restql/t_shop_item';
    //console.log('loadTable',url);
	return request({
		url,
		method: 'get'
	});
};

export async function update(params) {
	const id = params.productID || 0;
	if (!id) {
		return;
	}

	delete params.productID;

	return request({
		url: `/api/restql/t_shop_item/${id}`,
		method: 'put',
		data: params
	});
};

export async function save(params) {
	return request({
		url: '/api/restql/t_shop_item',
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