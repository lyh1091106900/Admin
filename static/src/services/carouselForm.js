import { request } from '../utils';

export async function loadTable(params) {
	//console.log(params)
	const id = params.meID || 0;
	const url = id ? `/api/restql/t_message/${id}` : '/api/restql/t_message';

	return request({
		url,
		method: 'get'
	});
};

export async function update(params) {
	const id = params.meID || 0;
	if (!id) {
		return;
	}

	delete params.meID;

	return request({
		url: `/api/restql/t_message/${id}`,
		method: 'put',
		data: params
	});
};

export async function save(params) {
	return request({
		url: '/api/restql/t_message',
		method: 'post',
		data: params
	});
};
export async function saveAddOrder(params) {
	return request({
		url: '/api/restql/t_recharge',
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